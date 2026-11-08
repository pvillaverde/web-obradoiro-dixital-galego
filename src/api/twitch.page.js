import { getSocialLinks } from "./utils/social-networks.js";

export const url = "/api/twitch.json";

export default function ({ search }) {
   const regex = /https?:\/\/(?:www\.)?twitch\.tv\/([a-z0-9_]+)\/?/;
   const items = [];
   for (const item of search.pages("type=proxecto twitch", "title=asc")) {
      if (item.redes && item.redes.twitch) {
         const match = item.redes.twitch.match(regex);
         const twitchChannelLogin = match[1]; // galizangamer
         const itemInfo = {
            id: item.basename,
            title: item.title,
            twitch_login: twitchChannelLogin,
            ...getSocialLinks(item.redes),
         }
         items.push(itemInfo);
      }
   }

   return JSON.stringify(items, null, 2);
}
