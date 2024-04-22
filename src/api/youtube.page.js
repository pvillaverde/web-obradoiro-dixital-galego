export const url = "/api/youtube.json";
export default function ({ search }) {
   const regex = /https?:\/\/(?:www\.)?youtube\.com\/channel\/([A-Za-z0-9-_]{24})/;
   const items = [];
   for (const item of search.pages("type=proxecto youtube", "title=asc")) {
      if (item.data.redes && item.data.redes.youtube) {
         const match = item.data.redes.youtube.match(regex);
         const channelId = match[1]; // UCdQohUqp3v3gU_r5X7p5VZQ
         const itemInfo = {
            title: item.data.title,
            youtube: channelId,
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
