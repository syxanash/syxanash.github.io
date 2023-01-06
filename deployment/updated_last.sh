#!/usr/bin/env bash

CURRENT_DATE=$(date +"%Y-%m-%d")
BUILD_HASH=$(md5 -q -s $(date +"%s"))
BUILD_SIZE=$(du -hs build | awk '{print $1}')

echo "{ \"date\": \"$CURRENT_DATE\", \"buildNumber\": \"$BUILD_HASH\", \"buildSize\": \"$BUILD_SIZE\" }" > src/resources/last-updated.json