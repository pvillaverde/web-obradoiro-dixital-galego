import { Site, Page } from "https://deno.land/x/lume@v1.13.0/core.ts";
import { parseFeed } from "https://deno.land/x/rss@0.5.6/mod.ts";

export default function () {
   let requestOptions: {
      baseURL: string,
      headers: {
         'Client-ID': string,
         'Authorization': string,
      }
   };
   async function checkRSSActivity(rssURL: string) {
      try {
         const response = await fetch(rssURL);
         const xml = await response.text();
         const feed = await parseFeed(xml);
         if (feed.entries && feed.entries[0] && feed.entries[0].published) {
            const lastActiveDate = feed.entries[0].published;
            return isLessThanMonth(lastActiveDate);
         } else {
            return false;
         }
      } catch (error) {
         console.error(`Erro ao recuperar a información de RSS`, error);
         return false;
      }
   }
   async function checkYoutubeActivity(youtubeChannelUUID: string) {
      return await checkRSSActivity(`https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannelUUID}`);
   }

   async function checkTwitchActivity(twitchChannelLogin: string) {
      if (!requestOptions) {
         const clientId = Deno.env.get("TWITCH_CLIENT_ID") || "";
         const clientSecret = Deno.env.get("TWITCH_CLIENT_SECRET");
         const authResponse = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
            method: "POST",
         });
         const authData = await authResponse.json();
         requestOptions = {
            baseURL: 'https://api.twitch.tv/helix',
            headers: {
               'Client-ID': clientId,
               Authorization: `Bearer ${authData.access_token}`,
            }
         }
      }
      try {
         const users = await (await fetch(`${requestOptions.baseURL}/users?login=${twitchChannelLogin}`, requestOptions)).json();
         const userId = users.data[0].id;
         const videos = await (await fetch(`${requestOptions.baseURL}/videos?user_id=${userId}&first=1`, requestOptions)).json();
         if (videos.data && videos.data[0]) {
            const lastActiveDate = new Date(videos.data[0].created_at);
            return isLessThanMonth(lastActiveDate);
         } else { return false; }
      } catch (error) {
         console.error(`Erro ao recuperar a información de Twitch`, error);
         return false;
      }
   }

   function isLessThanMonth(date: Date) {
      const timestamp = date.getTime();
      const now = Date.now();
      const difference = now - timestamp;
      const months = difference / (1000 * 60 * 60 * 24 * 30);
      const isLessThanMonth = months < 1;
      return isLessThanMonth;
   }

   return (site: Site) => {
      const enableCheckActivity = Deno.env.get("CHECK_ACTIVITY");
      if (!enableCheckActivity) return false;
      const regexYoutube = /https?:\/\/(?:www\.)?youtube\.com\/channel\/([A-Za-z0-9-_]{24})/;
      const regexTwitch = /https:\/\/(?:www\.)?twitch\.tv\/([a-z0-9_]+)\/?/;
      site.addEventListener("beforeRender", async (event) => {
         if (!event.pages) return;
         const pages = event.pages.filter(p => p.data.type == 'proxecto').sort((a, b) => {
            if (!a.data.title || !b.data.title) return 0;
            return a.data.title.localeCompare(b.data.title, undefined, { sensitivity: 'accent', caseFirst: 'false' })
         });

         for (const [index, page] of pages.entries()) {
            if (page.src.ext === ".md") { // To filter pages by extension
               console.log(`${index+1}/${pages.length}`, `Comprobando actividade do proxecto ${page.data.title}:`, await checkActivity(page));
            }
         }
      });
      async function checkActivity(page: Page) {
         if (page.data.type != 'proxecto' || !page.data.redes) return;
         page.data.active = page.data.active || false;
         if (page.data.redes.rss) {
            page.data.active = page.data.active || await checkRSSActivity(page.data.redes.rss);
         }
         if (page.data.redes.youtube) {
            const match = page.data.redes.youtube.match(regexYoutube);
            const youtubeChannelUUID = match[1];
            page.data.active = page.data.active || await checkYoutubeActivity(youtubeChannelUUID);
         }
         if (page.data.redes.twitch) {
            const match = page.data.redes.twitch.match(regexTwitch);
            const twitchChannelLogin = match[1];
            page.data.active = page.data.active || await checkTwitchActivity(twitchChannelLogin);
         }
         return page.data.active;
      }
   };
}