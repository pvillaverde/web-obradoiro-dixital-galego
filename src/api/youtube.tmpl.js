export const url = "/api/youtube.json";
export default function ({ search }) {
   const items = [];
   for (const item of search.pages("type=proxecto youtube", "title=asc")) {
      const regex = /https?:\/\/(?:www\.)?youtube\.com\/channel\/([A-Za-z0-9-_]{24})/;
      if (item.data.redes && item.data.redes.youtube) {
         const match = item.data.redes.youtube.match(regex);
         const channelId = match[1]; // UCdQohUqp3v3gU_r5X7p5VZQ
         items.push({
            title: item.data.title,
            uuid: channelId,
         });
      }
   }

   return JSON.stringify(items, null, 2);
}
