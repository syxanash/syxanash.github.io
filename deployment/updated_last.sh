#!/usr/bin/env bash

CURRENT_DATE=$(date +"%Y-%m-%d")

echo "{ \"date\": \"$CURRENT_DATE\" }" > src/resources/last-updated.json