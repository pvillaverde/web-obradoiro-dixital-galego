export const url = "/api/twitch.json";

export default function ({ search }) {
   const regex = /https?:\/\/(?:www\.)?twitch\.tv\/([a-z0-9_]+)\/?/;
   const items = [];
   for (const item of search.pages("type=proxecto twitch", "title=asc")) {
      if (item.data.redes && item.data.redes.twitch) {
         const match = item.data.redes.twitch.match(regex);
         const twitchChannelLogin = match[1]; // galizangamer
         const itemInfo = {
            title: item.data.title,
            twitch: twitchChannelLogin,
         }
         if (item.data.redes.twitter) {
            itemInfo.twitter = "@" + item.data.redes.twitter.match(/twitter\.com\/([^/]+)/)[1];
         }
         if (item.data.redes.mastodon) {
            const [, domain, user] = item.data.redes.mastodon.match(/https:\/\/([^/]+)\/(.+)/);
            itemInfo.mastodon = `${user}@${domain}`;
         }
         items.push(itemInfo);
      }
   }

   return JSON.stringify(items, null, 2);
}
