#!/bin/bash

set -e
yarn lint
yarn build # before tests since packages rely on dist/ files to be available
yarn test --runInBand
yarn docs


set +e # The following command relies on exit 1
(git diff --exit-code -- docs && echo "Docs are up-to-date") || (echo "Docs are not up-to-date, please run yarn docs and repush" && false)
