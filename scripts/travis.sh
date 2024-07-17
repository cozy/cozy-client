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

set +e # The following command relies on exit 1
yarn types
[ $? -eq 0 ] || exit 1
git diff --exit-code
types_status=$?
set -e
if [[ $types_status == 0 ]]; then
  echo "Types are up to date"
else
  echo "Types are not up-to-date, please run cd packages/cozy-client && yarn typecheck and repush"
  exit 1
fi
set -e
