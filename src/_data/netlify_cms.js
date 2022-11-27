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

const pages = t.files("Páxinas")
   .description("Aquí podes editar as páxinas indivuais")
   .sortableFields("title")
   .preview(false)
   .file("Portada", "/src/index.yml", [
      t.string("Title"),
      t.hidden("Layout"),
      metas,
      t.object("Header", [
         t.string("Title"),
      ]),
      t.object("Action", [
         t.markdown("title"),
         t.string("code"),
         t.string("button"),
         t.string("url"),
      ]),

      t.list("Features", [
         t.string("Title"),
         t.image("Img"),
         t.markdown("Description"),
      ]),
      t.object("FAQ", [
         t.string("Title"),
         t.markdown("Description"),
         t.list("Questions", [
            t.string("Question"),
            t.markdown("Answer"),
         ]),
      ]),
   ])
   /* .file("Privacy policy", "/privacy.md", textPages)
   .file("Terms of service", "/terms.md", textPages)
   .file("Cookies", "/cookies.md", textPages) */;

// Global data
/* const comunidade = t.files("Proxectos da comunidad")
   .description("Aqui podes editar as canles da comunidade")
   .preview(false)
   .file("Comunidade", "/_data/comunidade.yml", [
      t.string("Copyright"),
      t.list("Links", [
         t.string("Text"),
         t.string("Href"),
      ]),
      t.object("Cookies", [
         t.markdown("Text"),
         t.string("Button"),
      ]),
   ])
   .mediaFolder("/src/img/comunidade")
   .publicFolder("/img/comunidade"); */
/* const data = t.files("Global data")
   .description("Edit global data shared by all pages")
   .preview(false)
   .file("Footer", "/_data/footer.yml", [
      t.string("Copyright"),
      t.list("Links", [
         t.string("Text"),
         t.string("Href"),
      ]),
      t.object("Cookies", [
         t.markdown("Text"),
         t.string("Button"),
      ]),
   ]); */

// Updates
/* const comunidade = t.folder("Comunidade", "comunidade", [
   t.string("Title"),
   t.string("Author"),
   t.datetime("Date"),
   t.markdown("Body"),
])
   .description("Aqui podes editar as canles da comunidade")
   .preview(false)
   .mediaFolder("/src/img/comunidade")
   .publicFolder("/img/comunidade")
   .create(true); */
const FAQ = t.folder("FAQ", "/src/FAQ", [
   t.hidden("type", "faq"),
   t.number("Nº de pregunta").name("number").required(true),
   t.string("Pregunta").name("title").required(true),
   t.markdown("Resposta").name("answer").required(true),
])
   .description("As preguntas e respostas máis frecuentes que saen na portada.")
   .preview(false).create(true).delete(true).slug("faq-{{number}}")
   .sortableFields("number", "title")

const comunidade = t.files("Comunidade")
   .description("Aquí podes editar os proxectos que forman parte da comunidade")
   .sortableFields("title", "date")
   .preview(false)
   .viewFilter("Filtrar", "Tags", "youtube")
   .file("Categorías", "/src/_data/categorias.yml", [
      t.list("Tags", [
         t.string("Id").required(true),
         t.string("Name").required(true),
         t.select("Color", ["lemonchiffon", "tomato", "violet", "gold", "lightskyblue", "lightgreen", "pink", "lightgray"]).required(true),
      ])
   ])
   .file("Proxectos", "/src/_data/comunidade.yml", [
      t.list("Proxectos", [
         t.string("Title").required(true),
         t.string("Url").required(true),
         t.image("Img"),
         t.markdown("Description").required(true),
         t.datetime("date").required(true),
         t.boolean("active"),
         t.relation("Tags")
            .collection("comunidade")
            .file('categorías')
            .searchFields(["tags.*.name"])
            .displayFields(["tags.*.name"])
            .valueField("tags.*.id")
            .multiple(true).required(true)
      ]).collapsed(true),
   ])

export default {
   backend: {
      name: "git-gateway",
      branch: "main",
   },
   site_url: "https://obradoiro-dixital-galego.netlify.app/",
   logo_url: "/logo.png",
   media_folder: "src/img/comunidade",
   public_folder: "/img/comunidade",
   collections: [
      pages.toJSON(),
      comunidade.toJSON(),
      FAQ.toJSON(),
   ],
};
