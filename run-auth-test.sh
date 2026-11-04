#!/bin/sh
set -eu
cd "$(dirname "$0")"
if [ ! -f .env.test ]; then
  echo 'Erreur : .env.test introuvable à la racine du projet.' >&2
  exit 1
fi
if [ ! -f node_modules/@playwright/test/cli.js ]; then
  echo 'Erreur : Playwright absent. Exécutez npm install dans le projet.' >&2
  exit 1
fi
node --env-file=.env.test ./node_modules/@playwright/test/cli.js test tests/smart-crm-auth.spec.js --project=chromium "$@"
