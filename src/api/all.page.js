export const url = "/api/all.json";
export default function ({ search }) {
   const items = [];
   for (const item of search.pages("type=proxecto", "title=asc")) {
      if (item.data.redes) {
         const itemInfo = {
            title: item.data.title,
            date: item.data.date,
            active: item.data.active,
            asociado: item.data.tags.some(t => t === "asociado"),
            podcast: item.data.tags.some(t => t === "podcast"),
            youtube: item.data.tags.some(t => t === "youtube"),
            twitch: item.data.tags.some(t => t === "twitch"),
         }
         itemInfo.tags = item.data.tags;
         items.push(itemInfo);
      }
   }

   return JSON.stringify(items, null, 2);
}
