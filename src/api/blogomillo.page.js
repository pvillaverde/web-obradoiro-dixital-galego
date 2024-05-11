export const url = "/api/blogomillo.json";
export default function ({ search }) {
   const items = [];
   for (const item of search.pages("type=proxecto blogomillo", "title=asc")) {
      if (item.redes && item.redes.rss) {
         const itemInfo = {
            id: item.basename,
            title: item.title,
            rss: item.redes.rss,
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
