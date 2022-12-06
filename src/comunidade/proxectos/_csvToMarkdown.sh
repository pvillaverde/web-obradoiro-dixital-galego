#!/bin/bash
inputFile="_youtube.csv"

# Read the input file
while IFS=";" read -r youtubeLink channelName Date; do

   # Replace spaces and special characters with underscores
   slug=$(echo "$channelName" | tr -d '[:punct:]' | tr ' ' '_')

   # Remove accents and diacritics
   slug=$(echo "$slug" | iconv -f utf-8 -t ascii//TRANSLIT)
   # Check if the date is valid
   if date -d "$Date" &>/dev/null; then
      # If the date is valid, print it
      echo "The date is valid: $Date"
   else
      # If the date is not valid, set a default date
      Date="1970-01-01"
      echo "The date is not valid. Using default date: $Date"
   fi

   markdownFile="---
layout: 'layouts/proxecto.njk'
title: $(echo "$channelName" | tr -d '[:punct:]')
description: Canle de Youtube - Se é a túa e lle queres engadir unha descripción e etiquetas, ponte en contacto con nós.
img: /img/comunidade/galegotube.webp
date: $Date
platform: youtube
type: proxecto
tags:
  - youtube
redes:
  youtube: $youtubeLink
---
"
   echo -e "$markdownFile" >$slug.md

done <"$inputFile"
