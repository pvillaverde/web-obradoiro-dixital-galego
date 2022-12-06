import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import inline from "lume/plugins/inline.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import esbuild from "lume/plugins/esbuild.ts";
import imagick from "lume/plugins/imagick.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import sitemap from "lume/plugins/sitemap.ts";
import netlifyCMS from "lume/plugins/netlify_cms.ts";
import metas from "lume/plugins/metas.ts";
import mdToc from "https://deno.land/x/lume_markdown_plugins@v0.1.0/toc/mod.ts";
import mdFootnote from "https://jspm.dev/markdown-it-footnote";
import ndIframe from "https://jspm.dev/markdown-it-iframe";
import mdVideo from "https://jspm.dev/markdown-it-video";
import checkActivity from "./checkActivity.ts";

/* import pagefind from "lume/plugins/pagefind.ts"; */

const markdown = {
   plugins: [mdToc, mdFootnote, [ndIframe, {
      width: 800,
      height: 600,
   }], [mdVideo, {
      youtube: { width: 800, height: 600 },
   }]],
   keepDefaultPlugins: true,
};

const site = lume({
   src: "./src",
   dest: "./_site",
   emptyDest: true,
   location: new URL("https://obradoiro-dixital-galego.netlify.app/"),
   prettyUrls: true, // Disable pretty urls
   server: {
      port: 3000,
      page404: "/404/",
      open: true,
   },
}, { markdown });


site
   .use(checkActivity())
   .ignore("CONTRIBUTING.md")
   .ignore("README.md")
   .ignore("velociraptor.json")
   .ignore("scripts")
   .copy("static", ".")
   .copy("_redirects")
   /* .use(pagefind({
      ui: {
        containerId: "search",
        showImages: false,
        showEmptyFilters: true,
        resetStyles: false,
      },
    })) */
   .use(netlifyCMS({ netlifyIdentity: true, }))
   .use(codeHighlight())
   .use(postcss())
   .use(lightningCss())
   .use(metas())
   .use(inline())
   .use(esbuild({
      extensions: [".js"],
   }))
   .use(resolveUrls())
   .use(imagick())
   .use(sitemap())
   .scopedUpdates(
      (path) => path.endsWith(".png") || path.endsWith(".jpg"),
   )
   .filter("slice", (arr, length) => arr.slice(0, length))
   .filter("channelTags", (allTags, channelTags) => allTags.filter((t: { id: string; }) => channelTags ? channelTags.some((ct: string) => ct == t.id) : false))
   .remoteFile("api/canles.tmpl.js", import.meta.resolve(`./src/api/canles.tmpl.js`))
   .process([".html"], (page) => {
      const doc = page.document!;
      const blocks = doc.querySelectorAll("lume-code");

      blocks.forEach((block, i) => {
         const pres = (block as unknown as HTMLElement).querySelectorAll(
            ":scope > pre",
         );

         const menu = doc.createElement("ul");
         menu.setAttribute("role", "tablist");
         menu.setAttribute("aria-label", "Code Tabs");
         menu.classList.add("lume-code-menu");

         pres.forEach((pre, j) => {
            const title = pre.querySelector("code")!.getAttribute("title")!;

            const li = doc.createElement("li");
            li.setAttribute("role", "presentation");

            const button = doc.createElement("button");
            button.setAttribute("role", "tab");
            button.setAttribute("aria-selected", j === 0 ? true : false);
            button.setAttribute("aria-controls", `panel-${i + 1}-${j + 1}`);
            button.setAttribute("id", `tab-${i + 1}-${j + 1}`);
            button.setAttribute("tabindex", j === 0 ? 0 : -1);
            button.innerText = title;
            button.classList.add("lume-code-tab");

            if (j > 0) {
               pre.setAttribute("hidden", "true");
            } else {
               button.classList.add("is-active");
            }

            pre.setAttribute("role", "tabpanel");
            pre.setAttribute("aria-labelledby", `tab-${i + 1}-${j + 1}`);
            pre.setAttribute("id", `panel-${i + 1}-${j + 1}`);
            pre.setAttribute("tabindex", "0");

            li.append(button);
            menu.appendChild(li);
         });

         (block as unknown as HTMLElement).prepend(menu as unknown as Node);
      });
   })
   .use(minifyHTML());

export default site;
