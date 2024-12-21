export const url = "/api/this_year.json";
export default function ({ search }) {
   const items = [];
   for (const item of search.pages("type=proxecto date>=2024-12-20", "date=asc")) {
      if (item.redes) {
         const itemInfo = {
            title: item.title,
            date: item.date,
            url: "https://obradoirodixitalgalego.gal" + item.url,
         }
         itemInfo.tags = item.tags;
         items.push(itemInfo);
      }
   }

   return JSON.stringify(items, null, 2);
}
