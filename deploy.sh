#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m "Realease Version"
git push -f git@github.com:EduardMarrugo/compiler-projects master:gh-pages

cd -