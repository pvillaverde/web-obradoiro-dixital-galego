import { getSocialLinks } from "./utils/social-networks.js";

export const url = "/api/blog.json";
export default function ({ search }) {
   const items = [];
   for (const item of search.pages("type=proxecto blogomillo", "title=asc")) {
      if (item.redes && item.redes.rss) {
         const itemInfo = {
            id: item.basename,
            title: item.title,
            rss: item.redes.rss_blog ? item.redes.rss_blog : item.redes.rss,
            ...getSocialLinks(item.redes),
         }
         items.push(itemInfo);
      }
   }

   return JSON.stringify(items, null, 2);
}
