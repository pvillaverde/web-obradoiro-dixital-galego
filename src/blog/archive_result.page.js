export const layout = "layouts/archive_result.njk";

export default function* ({ search }) {
   // Generate a page for each tag
   for (const tag of search.values("tags", "type=post")) {
      yield {
         url: `/blog/archive/${tag}/`,
         title: `Etiqueta “${tag}”`,
         type: "tag",
         search_query: `type=post '${tag}'`,
         tag,
      };
   }

   // Generate a page for each author
   for (const author of search.values("author", "type=post")) {
      yield {
         url: `/blog/author/${author}/`,
         title: `Artigos de ${author}`,
         type: "author",
         search_query: `type=post author='${author}'`,
         author,
      };
   }
}
