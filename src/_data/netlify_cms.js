import t from "https://deno.land/x/netlify_cms_config@v0.3.0/mod.ts";

// Defaults
t.defaultRequired = false;
t.defaults.object.collapsed();
t.defaults.list.collapsed().minimizeCollapsed();
t.defaults.markdown.minimal();

const metas = t.object("Metas", [
   t.string("Title"),
   t.string("Description"),
   t.image("Image"),
   t.boolean("Robots").default(true),
   t.string("twitter"),
]);

const textPages = [
   t.string("Title"),
   t.string("Url"),
   metas,
   t.markdown("Body"),
];

const pages = t.files("Xeral")
   .description("Aquí podes editar as páxinas indivuais")
   .sortableFields("title")
   .preview(false)
   .file("Portada", "/src/index.yml", [
      t.string("title").required(true),
      t.hidden("layout"),
      metas,
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
      t.object("FAQ", [
         t.string("title"),
         t.markdown("description"),
         t.list("questions", [
            t.string("title"),
            t.markdown("answer"),
         ]).collapsed(false),
      ]).collapsed(false),
   ])
   .file("Comunidade", "/src/comunidade/index.yml", [
      t.hidden("layout"),
      t.string("title").required(true),
      t.string("description").required(true),
   ])
   .file("Categorías", "/src/_data/categorias.yml", [
      t.list("Tags", [
         t.string("Id").required(true),
         t.string("Name").required(true),
         t.select("Color", ["lemonchiffon", "tomato", "violet", "gold", "lightskyblue", "lightgreen", "pink", "lightgray"]).required(true),
      ]).minimizeCollapsed(false)
   ])
   /* .file("Privacy policy", "/privacy.md", textPages)
   .file("Terms of service", "/terms.md", textPages)
   .file("Cookies", "/cookies.md", textPages) */;


// Updates
const comunidade = t.folder("Comunidade", "/src/comunidade/proxectos", [
   t.hidden("layout", "layouts/proxecto.njk").required(true),
   t.hidden("type", "proxecto").required(true),
   t.string("file").required(true),
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
   collections: [
      pages.toJSON(),
      comunidade.toJSON(),
   ],
};
