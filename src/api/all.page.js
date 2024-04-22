export const url = "/api/all.json";
export default function ({ search }) {
   const items = [];
   for (const item of search.pages("type=proxecto", "title=asc")) {
      if (item.redes) {
         const itemInfo = {
            title: item.title,
            date: item.date,
            active: item.active,
            asociado: item.tags.some(t => t === "asociado"),
            podcast: item.tags.some(t => t === "podcast"),
            youtube: item.tags.some(t => t === "youtube"),
            twitch: item.tags.some(t => t === "twitch"),
         }
         itemInfo.tags = item.tags;
         items.push(itemInfo);
      }
   }

   return JSON.stringify(items, null, 2);
}
