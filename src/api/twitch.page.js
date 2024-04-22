export const url = "/api/twitch.json";

export default function ({ search }) {
   const regex = /https?:\/\/(?:www\.)?twitch\.tv\/([a-z0-9_]+)\/?/;
   const items = [];
   for (const item of search.pages("type=proxecto twitch", "title=asc")) {
      if (item.redes && item.redes.twitch) {
         const match = item.redes.twitch.match(regex);
         const twitchChannelLogin = match[1]; // galizangamer
         const itemInfo = {
            title: item.title,
            twitch: twitchChannelLogin,
         }
         if (item.redes.twitter) {
            itemInfo.twitter = "@" + item.redes.twitter.match(/twitter\.com\/([^/]+)/)[1];
         }
         if (item.redes.mastodon) {
            const [, domain, user] = item.redes.mastodon.match(/https:\/\/([^/]+)\/(.+)/);
            itemInfo.mastodon = `${user}@${domain}`;
         }
         items.push(itemInfo);
      }
   }

   return JSON.stringify(items, null, 2);
}
