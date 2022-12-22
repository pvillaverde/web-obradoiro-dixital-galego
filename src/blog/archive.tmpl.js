export const layout = "layouts/archive.njk";
export const title = "Arquivo";

export default function* ({ search, paginate }) {
   const posts = search.pages("type=post", "date=desc");

   for (
      const data of paginate(posts, { url, size: 10 })
   ) {
      // Show the first page in the menu
      /* if (data.pagination.page === 1) {
         data.menu = {
            visible: true,
            order: 1,
            url: "blog-archive"
         };
      } */

      yield data;
   }
}

function url(n) {
   if (n === 1) {
      return "/blog/archive/";
   }

   return `/blog/archive/${n}/`;
}
