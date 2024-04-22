export const url = "/blog/feed.json";

export default function (
   { metas, search },
   { md, url, date, htmlUrl },
) {
   const feed = {
      version: "https://jsonfeed.org/version/1",
      title: metas.site,
      home_page_url: url("", true),
      feed_url: url("feed.json", true),
      description: metas.description,
      items: [],
   };

   for (const post of search.pages("type=post", "date=desc", 10)) {
      console.log(post);
      feed.items.push({
         id: url(post.url, true),
         url: url(post.url, true),
         title: post.title,
         content_html: htmlUrl(md(post.content || post.excerpt), true),
         date_published: date(post.date, "ATOM"),
      });
   }

   return JSON.stringify(feed, null, 2);
}
