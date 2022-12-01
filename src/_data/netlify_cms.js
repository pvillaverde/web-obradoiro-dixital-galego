import t from "https://deno.land/x/netlify_cms_config@v0.3.0/mod.ts";

// Defaults
t.defaultRequired = false;
t.defaults.object.collapsed();
t.defaults.list.collapsed().minimizeCollapsed();
t.defaults.markdown.minimal();

const metas = [
   t.string("Title").hint('Título da páxina concreta (ou xeral), sae na miniatura das ligazóns.'),
   t.string("Site").hint('Título do sitio web, sae na miniatura das ligazóns.'),
   t.string("Description").hint('Descripción do sitio web, sae na miniatura das ligazóns.'),
   t.list("keywords").collapsed(false).hint('Palabras chave para que os navegadores indexen o contido, separadas por comas'),
   t.image("Image").hint("Esta imaxe será a que sala nas miniaturas cando se enlaze a páxina"),
   t.boolean("Robots").default(true).hint("Permite os robots dos navegadores indexar a páxina e que apareza nos resultados de búsqueda"),
   t.string("twitter").hint("Se se especifica, permite facer a twitter coller os datos do sitio e enlazalos o perfil. Poñer só o '@usuario'"),
   t.string("title_suffix").hint("O sufixo que se porá no título da páxina despois da propia páxina."),
];

const textPages = [
   t.string("Title"),
   t.string("Url"),
   t.object("Metas", metas),
   t.markdown("Body"),
];

const pages = t.files("Xeral")
   .description("Aquí podes editar as páxinas indivuais")
   .sortableFields("title")
   .preview(false)
   .file("Portada", "/src/index.yml", [
      t.string("title").required(true),
      t.hidden("layout"),
      t.object("header", [
         t.string("Title"),
      ]),
      t.object("action", [
         t.markdown("title"),
         t.string("code"),
         t.string("button"),
         t.string("url"),
      ]),
      t.list("features", [
         t.string("Title"),
         t.image("Img"),
         t.markdown("Description"),
      ]),
      t.object("examples", [
         t.markdown("title"),
         t.string("more"),
         t.string("url"),
      ]),
      t.object("support", [
         t.string("Title"),
         t.object("contribute", [
            t.string("title"),
            t.markdown("description"),
         ]),
         t.list("sponsors", [
            t.string("name"),
            t.image("img"),
            t.string("url"),
         ]).collapsed(false),
      ]),
      t.object("testimonials", [
         t.string("Title"),
      ]),
      t.object("FAQ", [
         t.string("title"),
         t.markdown("description"),
         t.list("questions", [
            t.string("title"),
            t.markdown("answer"),
         ]).collapsed(false),
      ]),
   ])
   .file("Comunidade", "/src/comunidade/index.yml", [
      t.hidden("layout"),
      t.string("title").required(true),
      t.string("description").required(true),
   ])
   .file("Política de privacidade", "/src/politica-privacidade.md", textPages);

const globalData = t.files("Páxinas")
   .description("Aquí podes editar os axustes e datos comúns a toda a web")
   .sortableFields("title")
   .preview(false)
   .file("Metadatos", "/src/_data/metas.yml", metas)
   .file("Categorías/Etiquetas do contido", "/src/_data/categorias.yml", [
      t.list("Tags", [
         t.string("Id").required(true),
         t.string("Name").required(true),
         t.select("Color", ["lemonchiffon", "tomato", "violet", "gold", "lightskyblue", "lightgreen", "pink", "lightgray"]).required(true),
      ]).minimizeCollapsed(false)
   ]);

// Proxectos da comunidade
const comunidade = t.folder("Comunidade", "/src/comunidade/proxectos", [
   t.hidden("layout", "layouts/proxecto.njk").required(true),
   t.hidden("type", "proxecto").required(true),
   t.string("title").required(true),
   t.string("href").required(true),
   t.image("img"),
   t.markdown("description").required(true),
   t.datetime("date").required(true),
   t.boolean("active"),
   t.select("platform", ["twitch", "youtube", "podcast"]),
   t.relation("tags")
      .collection("xeral")
      .file('categorías')
      .searchFields(["tags.*.name"])
      .displayFields(["tags.*.name"])
      .valueField("tags.*.id")
      .multiple(true).required(true)
])
   .description("Aquí podes editar os proxectos que forman parte da comunidade")
   .sortableFields("title", "date")
   .viewFilter("Activas", "active", true)
   .viewFilter("Canles de Twitch", "platform", "twitch")
   .viewFilter("Canles de Youtube", "platform", "youtube")
   .viewFilter("Canles de Podcast", "platform", "podcast")
   .viewGroup("Plataforma", "platform", "twitch|youtube|podcast")
   .viewGroup("Activa", "active", "true")
   .preview(false)
   .mediaFolder("/src/img/comunidade")
   .publicFolder("/img/comunidade")
   .create(true).delete(true)
   .slug("{{title}}");

export default {
   backend: {
      name: "git-gateway",
      branch: "main",
   },
   publish_mode: "editorial_workflow",
   site_url: "https://obradoiro-dixital-galego.netlify.app/",
   logo_url: "/logo.png",
   media_folder: "src/img/comunidade",
   public_folder: "/img/comunidade",
   netlifyIdentity: true,
   slug: {
      encoding: "ascii",
      clean_accents: true
   },
   collections: [
      globalData.toJSON(),
      pages.toJSON(),
      comunidade.toJSON(),
   ],
};
