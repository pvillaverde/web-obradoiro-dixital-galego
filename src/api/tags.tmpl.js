export const url = "/api/tags.json";
export default function ({ search, categorias }) {
   const items = [];
   for (const tag of categorias.tags) {
      const pagesByTag = search.pages(`type=proxecto ${tag.id}`, "title=asc");
      items.push({
         etiqueta: tag.id,
         total: pagesByTag.length,
         proxectos: pagesByTag.map(p => p.data.title)
      });
   }
   items.sort((a, b) => a.total - b.total);

   return JSON.stringify(items, null, 2);
}
