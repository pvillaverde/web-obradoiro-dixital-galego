export const url = "/api/all.json";
export default function ({ search }) {
   const regexTwitch = /https?:\/\/(?:www\.)?twitch\.tv\/([a-z0-9_]+)\/?/;
   const regexYoutube = /https?:\/\/(?:www\.)?youtube\.com\/channel\/([A-Za-z0-9-_]{24})/;
   const items = [];
   for (const item of search.pages("type=proxecto", "title=asc")) {
      if (item.data.redes) {
         const itemInfo = {
            title: item.data.title,
         }
         if (item.data.redes.rss) {
            itemInfo.rss = item.data.redes.rss;
         }
         if (item.data.redes.youtube) {
            const matchYoutube = item.data.redes.youtube.match(regexYoutube);
            try {
               itemInfo.youtube = matchYoutube[1]; // UCdQohUqp3v3gU_r5X7p5VZQ
            } catch (error) {
               console.log(`O proxecto ${itemInfo.title} non ten unha canle de youtube válida: ${item.data.redes.youtube}`);
            }
         }
         if (item.data.redes.twitch) {
            const matchTwitch = item.data.redes.twitch.match(regexTwitch);
            itemInfo.twitch = matchTwitch[1]; // galizangamer
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
