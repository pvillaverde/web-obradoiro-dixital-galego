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
/*    title: moisespombo
   url: https://twitch.tv/moisespombo
   img: /img/comunidade/moisespombo.webp
   description: Aquí vimos a falar de cousas! Cada programa unha diferente. HOXE FALAMOS DE "SAIDA". Lembra que podes enviar o teu audio ao telegram @Mpombo
   createdDate: 2020-02-10 15:44:01.194555
   active: false
   tags:
   - twitch */
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

export default {
   backend: {
      name: "git-gateway",
      branch: "main",
   },
   site_url:"https://obradoiro-dixital-galego.netlify.app/",
   logo_url: "/logo.png",
   media_folder: "src/img",
   public_folder: "/img",
   collections: [
      pages.toJSON(),
   ],
};
