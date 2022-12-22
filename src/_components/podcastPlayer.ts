import { parseFeed } from "https://deno.land/x/rss@0.5.6/mod.ts";

export default function ({ feedURL }: { feedURL: string }) {
   /* async function getPodcastFeed(feedURL: string) {
      try {
         const response = await fetch(feedURL);
         const xml = await response.text();
         const feed = await parseFeed(xml);
         return feed;
      } catch (_error) {
         // log error
      }
   }
   async function getPodcastPlayer(document: Document, feedURL: string) {
      const feed = await getPodcastFeed(feedURL);
      if (feed) {
         const player = document.getElementById('podcast-player');
         if (player) {
            player.innerHTML = JSON.stringify(feed);
         }
      }
   }
   getPodcastPlayer(document, feedURL); */
   return `<div id="podcast-player"><!--${feedURL}--></div>`;
}