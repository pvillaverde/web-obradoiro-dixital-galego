export const url = "/api/blogue.json";
export default function ({ search }) {
   const items = [];
   for (const item of search.pages("type=proxecto blogue", "title=asc")) {
      if (item.data.redes && item.data.redes.rss) {
         const itemInfo = {
            title: item.data.title,
            rss: item.data.redes.rss,
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
