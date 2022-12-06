#!/bin/bash

# Set the directory to search
dir="."

# Use the find command to list the files in the directory, sorted
files=$(find $dir -type f -print | sort)

# Check if any files were found
if [ -n "$files" ]; then
  # Files were found, use the tr command to convert the file names to lowercase
  lowercase=$(echo "$files" | tr '[:upper:]' '[:lower:]')

  # Use the uniq command to find non-unique values
  nonunique=$(echo "$lowercase" | uniq -d)

  # Check if there are any non-unique values
  if [ -n "$nonunique" ]; then
    # Non-unique values were found, print them
    echo "Found the following non-unique file names:"
    echo "$nonunique"
  else
    # No non-unique values were found, print a message
    echo "No non-unique file names were found in the specified directory."
  fi
else
  # No files were found, print a message
  echo "No files were found in the specified directory."
fi
