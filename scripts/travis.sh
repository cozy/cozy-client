#!/bin/bash

set -e

yarn lint
yarn build # before tests since packages rely on dist/ files to be available
yarn test --runInBand
yarn docs


set +e # The following command relies on exit 1
git diff --exit-code -- docs
docs_status=$?
set -e
if [[ $docs_status == 0 ]]; then
  echo "Docs are up-to-date"
else
  echo "Docs are not up-to-date, please run yarn docs and repush"
  exit 1
fi
set -e

cd packages/cozy-client
yarn typecheck
