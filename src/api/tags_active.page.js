export const url = "/api/tags_active.json";
export default function ({ search, categorias }) {
   const items = [];
   for (const tag of categorias.tags) {
      const pagesByTag = search.pages(`type=proxecto active=true ${tag.id}`, "title=asc");
      items.push({
         etiqueta_id: tag.id,
         etiqueta_nome: tag.name,
         total: pagesByTag.length,
         proxectos: pagesByTag.map(p => p.title)
      });
   }
   items.sort((a, b) => a.total - b.total);

   return JSON.stringify(items, null, 2);
}
