#!/usr/bin/env bash

CURRENT_DATE=$(date +"%Y-%m-%d")
BUILD_HASH=$(md5 -q -s $(date +"%s"))
BUILD_SIZE=$(du -hs build | awk '{print $1}')
WD_UPDATE_DATE=$(git log -1 --pretty="format:%ci" ./src/resources/remote-desktops.json | awk '{print $1}')

echo "{ \"date\": \"$CURRENT_DATE\", \"buildNumber\": \"$BUILD_HASH\", \"buildSize\": \"$BUILD_SIZE\", \"wdUpdate\": \"$WD_UPDATE_DATE\" }" > src/resources/last-updated.json