import { getSocialLinks } from "./utils/social-networks.js";

export const url = "/api/podcast.json";
export default function ({ search }) {
   const items = [];
   for (const item of search.pages("type=proxecto podcast", "title=asc")) {
      if (item.redes && item.redes.rss) {
         const itemInfo = {
            id: item.basename,
            title: item.title,
            rss: item.redes.rss_podcast ? item.redes.rss_podcast : item.redes.rss,
            ...getSocialLinks(item.redes),
         }
         items.push(itemInfo);
      }
   }

   return JSON.stringify(items, null, 2);
}
