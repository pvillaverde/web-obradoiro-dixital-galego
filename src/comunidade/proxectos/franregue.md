---
layout: "layouts/proxecto.njk"
title: Franregue
img: /img/comunidade/franregue.webp
description: |-
   Streamer fran = new Streamer;

   List<Tema> temas = [Actualidade,Videoxogos,Música,Motos,Artes Marciais];

   List<Xojo> xojos= [MarioKart,DayZ,JumpKing,new Xojo];
   
   streamJallejo(fran,tema,xojo);
date: 2020-08-03 16:09:13.984208
active: false
type: proxecto
tags:
  - twitch
  - actualidade
  - arte
  - musica
  - novas
  - politica
  - videoxogos
redes:
  twitch: https://twitch.tv/franregue
  twitter: https://twitter.com/regueira_fran
  instagram: https://www.instagram.com/franregge3/
---
public List<Stream> getStreamJallejoList(Streamer streamer, List<Tema> temas, List<Xojo> xojos) {

   List<Stream> streamJallejoList = new ArrayList<>();

   for (Tema tema : temas) {

      for (Xojo xojo : xojos) {

         Stream stream = streamJallejo(streamer, tema, xojo);

         streamJallejoList.add(stream);

      }

   }

   return streamJallejoList;

   }

}