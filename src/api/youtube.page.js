export const url = "/api/youtube.json";
export default function ({ search }) {
   const regex = /https?:\/\/(?:www\.)?youtube\.com\/channel\/([A-Za-z0-9-_]{24})/;
   const items = [];
   for (const item of search.pages("type=proxecto youtube", "title=asc")) {
      if (item.redes && item.redes.youtube) {
         const match = item.redes.youtube.match(regex);
         const channelId = match[1]; // UCdQohUqp3v3gU_r5X7p5VZQ
         const itemInfo = {
            id: item.basename,
            title: item.title,
            youtube_uuid: channelId,
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
