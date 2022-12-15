---
title: Nova páxina web!
author: Obradoiro Dixital Galego
img: /img/blog/logo_acodg_h_blue_n.png
tags:
  - novas
  - asociación
date: 2022-12-14T22:00:43.507Z
---
Estaaos d**e estrea e inauguramos** a nova web facendo un monton de probas

* Isto é unha 
* lista
* desordeada

1. E isto
2. unha
3. ordeada

# Isto e un titulo

### E este outro mais pequecho

[Esta é unha ligazón aa comunidade.](/comunidade/)

![Selfie](/img/blog/img_1441.webp "Esta ´e unha foto de selfie")

```javascript
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
```