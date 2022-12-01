export const url = "/api/twitch.json";

export default function ({ search }) {
   const items = [];
   for (const item of search.pages("type=proxecto platform=twitch", "title=asc")) {
      items.push({
         title: item.data.title,
      });
   }

   return JSON.stringify(items, null, 2);
}
