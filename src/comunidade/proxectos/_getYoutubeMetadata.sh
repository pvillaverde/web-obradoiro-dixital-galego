#!/bin/bash
dir="."
regexp="https?:\/\/(?:www\.)?youtube\.com\/channel\/([A-Za-z0-9-_]{24})"
# loop through the files in the directory
for file in *.md; do
   filename="${file%.*}"

   uuid=$(cat $file | grep youtube | grep -Eo '([a-zA-Z0-9_-]{24})')

   if [ -n "$uuid" ]; then
      response=$(curl -s \
      "https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${uuid}&key=${API_KEY}" \
      --header 'Accept: application/json' \
      --compressed | jq '.items[0] | {id: .id, title: .snippet.title, description: .snippet.description, thumbnail: .snippet.thumbnails.default.url}')
      title=$(echo $response | jq -r '.title')
      description=$(echo $response | jq -r '.description')
      imgURL=$(echo $response | jq -r '.thumbnail')
      imgURL=${imgURL//s88/s400}
      curl -s "$imgURL" -o ../../img/comunidade/$filename.png
      # print the response
      yq ".description = \"${description}\", .img = \"/img/comunidade/$filename.webp\"" --front-matter process  -i $file
   fi

done