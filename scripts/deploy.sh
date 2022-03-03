#!/bin/bash

set -e
git checkout master
git remote set-url origin https://cozy-bot:$GITHUB_TOKEN@github.com/cozy/cozy-client.git
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc
env GH_TOKEN="$GITHUB_TOKEN" yarn lerna publish --yes
