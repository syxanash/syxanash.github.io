#!/usr/bin/env bash

CURRENT_DATE=$(date +"%Y-%m-%d")
BUILD_HASH=$(md5 -q -s $(date +"%s"))

echo "{ \"date\": \"$CURRENT_DATE\", \"buildNumber\": \"$BUILD_HASH\" }" > src/resources/last-updated.json