#!/bin/bash

# Set the directory containing the Markdown files
dir="."

# Loop through all Markdown files in the directory
for file in $dir/*.md; do
   yq '.redes.twitch = .href' --front-matter process  -i $file
done