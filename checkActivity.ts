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
      const response = await fetch(rssURL);
      const xml = await response.text();
      const feed = await parseFeed(xml);
      const lastActiveDate = feed.entries[0].published || new Date("2020-01-01");
      return isLessThanMonth(lastActiveDate);
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

      const users = await (await fetch(`${requestOptions.baseURL}/users?login=${twitchChannelLogin}`, requestOptions)).json();
      const userId = users.data[0].id;
      const videos = await (await fetch(`${requestOptions.baseURL}/videos?user_id=${userId}&first=1`, requestOptions)).json();
      const lastActiveDate = new Date(videos.data[0].created_at);
      return isLessThanMonth(lastActiveDate);
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
      const regexYoutube = /https?:\/\/(?:www\.)?youtube\.com\/channel\/([A-Za-z0-9-_]{24})/;
      const regexTwitch = /https:\/\/(?:www\.)?twitch\.tv\/([a-z0-9_]+)\/?/;
      site.preprocess(['.md'], checkActivity);
      async function checkActivity(page: Page) {
         if (page.data.type != 'proxecto' || !page.data.redes) return;
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
      }
   };
}