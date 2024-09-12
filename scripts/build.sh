#!/bin/bash

# change directory to project root
cd "$(dirname "$0")/.."

rm -rf dist

tsc -p tsconfig.build.json -m ESNext --outDir dist/esm
tsc -p tsconfig.build.json -m commonjs --outDir dist/cjs
