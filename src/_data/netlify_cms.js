import t from "https://deno.land/x/netlify_cms_config@v0.3.1/mod.ts";

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

const pages = t.files("Páxinas")
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

const globalData = t.files("Axustes")
   .description("Aquí podes editar os axustes e datos comúns a toda a web")
   .sortableFields("title")
   .preview(false)
   .file("Metadatos", "/src/_data/metas.yml", metas)
   .file("Etiquetas", "/src/_data/categorias.yml", [
      t.list("Tags", [
         t.string("Id").required(true),
         t.string("Name").required(true),
         t.color("Color").required(true),
         /* t.select("Color", ["lemonchiffon", "tomato", "violet", "gold", "lightskyblue", "lightgreen", "pink", "lightgray"]).required(true), */
      ]).minimizeCollapsed(false)
   ]);

// Proxectos da comunidade
const comunidade = t.folder("Comunidade", "/src/comunidade/proxectos", [
   t.hidden("layout", "layouts/proxecto.njk").required(true),
   t.hidden("type", "proxecto").required(true),
   t.string("title").required(true).hint('Título do proxecto: Pode ser o nome da canle ou do farangullo.'),
   t.hidden("href").required(false).hint('Ligazón principal do proxecto. Pode ser unha canle de Twitch/Youtube ou un beacons/linktree'),
   t.image("img").hint('Imaxe do proxecto. Ten que ser cadrada, de ser posible 400x400.'),
   t.markdown("description").required(true).hint("Descripción breve do proxecto. Recomendamos máximo uns 160 caracteres."),
   t.datetime("date").required(true).timeFormat(false).dateFormat('yyyy-MM-DD'),
   /* t.boolean("active").hint('Se está activo o proxecto. Este dato refrescase automáticametne cando se actualiza a WEB'), */
   t.object("redes", [
      /* t.string("amazon").hint('Ligazón a páxina de amazon'), */
      /* t.string("codepen").hint('Ligazón a páxina de codepen'), */
      /* t.string("dropbox").hint('Ligazón a páxina de dropbox'), */
      /* t.string("etsy").hint('Ligazón a páxina de etsy'), */
      t.string("facebook").hint('Ligazón a páxina de facebook, por exemplo: https://www.facebook.com/GalegoTwitch'),
      t.string("github").hint('Ligazón a páxina de github, por exemplo: https://github.com/GalizaTTD'),
      /* t.string("goodreads").hint('Ligazón a páxina de goodreads'), */
      t.string("google-podcast").hint('Ligazón a páxina de Google Podcasts'),
      /* t.string("google").hint('Ligazón a páxina de Google'), */
      t.string("instagram").hint('Ligazón a canle de Instagram, por exemplo: https://www.instagram.com/twitchengalego/').pattern("https:\/\/(?:www\.)?instagram\.com\/([A-Za-z0-9_]+)\/?", "O formato non é correcto"),
      t.string("ivoox").hint('Ligazón a páxina de iVoox, por exemplo: https://www.ivoox.com/podcast-recuncho-gamer-podcast_sq_f11092284_1.html'),
      t.string("link").hint('Ligazón adicional a unha páxina web propia ou outra rede que non esté contemplada.'),
      /* t.string("linkedin").hint('Ligazón a páxina de Linkedin'), */
      t.string("mail").hint('Correo electrónico ao que enviar mails.'),
      t.string("mastodon").hint('Ligazón o usuario de Mastodon, por exemplo: https://mastodon.gal/@galizangamer'),
      t.string("patreon").hint('Ligazón a páxina de Patreon, por exemplo: https://www.patreon.com/galizangamer'),
      /* t.string("pinterest").hint('Ligazón a páxina de pinterest'), */
      t.string("rss").hint('Ligazón ao feed RSS de contido, por exemplo: https://www.ivoox.com/podcast-a-gruta-gizamaluke_fg_f1629621_filtro_1.xml'),
      /* t.string("skype").hint('Ligazón a páxina de skype'), */
      /* t.string("snapchat").hint('Ligazón a páxina de snapchat'), */
      /* t.string("soundcloud").hint('Ligazón a páxina de soundcloud'), */
      t.string("spotify").hint('Ligazón a canle de Spotify, por exemplo: https://open.spotify.com/user/tcciszh0d6inj0tw6w2c0rrd5'),
      t.string("telegram").hint('Ligazón a canle de Telegram, por exemplo: https://t.me/GalizanGamer').pattern("https:\/\/(?:www\.)?t\.me\/([A-Za-z0-9_]+)\/?", "O formato non é correcto"),
      t.string("tiktok").hint('Ligazón a canle de TikTok, por exemplo: https://www.tiktok.com/@a_lobeira_today').pattern("https:\/\/(?:www\.)?tiktok\.com\/@?([a-z0-9_]+)\/?", "O formato non é correcto"),
      /* t.string("tumblr").hint('Ligazón a páxina de tumblr'), */
      t.string("twitch").hint('Ligazón o usuario de Twitch, por exemplo: https://twitch.tv/acodega').pattern("https:\/\/(?:www\.)?twitch\.tv\/([A-Za-z0-9_]+)\/?", "O formato non é correcto"),
      t.string("twitter").hint('Ligazón o usuario de Twitter, por exemplo: https://twitter.com/AC_ODC').pattern("https:\/\/(?:www\.)?twitter\.com\/([A-Za-z0-9_]+)\/?", "O formato non é correcto"),
      /* t.string("vimeo").hint('Ligazón a páxina de vimeo'), */
      /* t.string("whatsapp").hint('Ligazón o whatsapp, por exemplo: https://wa.me/0034666555444'), */
      t.string("wordpress").hint('Ligazón a un blogue ou páxina de wordpress.'),
      t.string("youtube").hint('Ligazón a canle de Youtube coa UUID, por exemplo: https://www.youtube.com/channel/UClavUfgzYt5uSgtBJbPoXqA').pattern("https?:\/\/(?:www\.)?youtube\.com\/channel\/([A-Za-z0-9-_]{24})", "O formato non é correcto."),
   ]),
   t.relation("tags")
      .collection("axustes")
      .file('etiquetas')
      .searchFields(["tags.*.name"])
      .displayFields(["tags.*.name"])
      .valueField("tags.*.id")
      .multiple(true).required(true).hint("Etiquetas para clasificar o contido. Engadir as plataformas principais para que se poida filtrar por elas."),
   t.markdown("Body"),
])
   .description("Aquí podes editar os proxectos que forman parte da comunidade")
   .sortableFields("title", "date")
   .viewFilter("Activas", "active", true)
   .viewFilter("Canles de Twitch", "tags", "twitch")
   .viewFilter("Canles de Youtube", "tags", "youtube")
   .viewFilter("Canles de Podcast", "tags", "podcast")
   /* .viewGroup("Plataforma", "tags", "twitch|youtube|podcast")
   .viewGroup("Data", "date", "\\d{4}-\\d{2}") */
   .preview(false)
   .mediaFolder("/src/img/comunidade")
   .publicFolder("/img/comunidade")
   .create(true).delete(true)
   .slug("{{title}}");

// Proxectos da comunidade
const novas = t.folder("Novas", "/src/blog/posts", [
   t.string("title").required(true).hint('Título da nova.'),
   t.hidden("author").default("Obradoiro Dixital Galego").required(true).hint('Quén escribiu a nova? Por defecto "Obradoiro Dixital Galego".'),
   t.image("img").hint('Imaxe de portada da nova.'),
   t.string("imgalt").hint('Texto alternativo da imaxe de portada (para os lectores de pantalla)'),
   t.list("tags").collapsed(false).hint('Categorías para clasificar as novas'),
   t.datetime("date").required(true).timeFormat(false).dateFormat('yyyy-MM-DD'),
   t.markdown("Body").required(true).hint("O texto da nova. Podes engadir <!--more--> onde queiras que se corte o extracto da nova"),
])
   .description("Aquí podes editar as novas que se publican na web")
   .sortableFields("title", "date")
   .viewGroup("Data", "date", "\\d{4}-\\d{2}")
   .preview(false)
   .mediaFolder("/src/img/blog")
   .publicFolder("/img/blog")
   .create(true).delete(true)
   .slug("{{year}}-{{month}}-{{day}}_{{title}}");

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
   slug: {
      encoding: "ascii",
      clean_accents: true
   },
   collections: [
      globalData.toJSON(),
      pages.toJSON(),
      comunidade.toJSON(),
      novas.toJSON()
   ],
};
