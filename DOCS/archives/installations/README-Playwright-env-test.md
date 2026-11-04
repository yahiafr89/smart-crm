# Smart CRM — Exécuter le test Administrator avec .env.test

Ce correctif ne remplace aucun fichier existant et ne contient aucun identifiant.

## Installation

Décompressez le ZIP et copiez `run-auth-test.sh` à la racine du projet `AI-POWERED MODULAR CRM/`, au même niveau que `package.json` et `.env.test`.

## Prérequis

- Node.js 26 déjà installé.
- Playwright installé dans `node_modules/`.
- Live Server actif sur http://127.0.0.1:5500.
- `.env.test` local avec `CRM_TEST_BASE_URL`, `CRM_TEST_ADMIN_EMAIL`, `CRM_TEST_ADMIN_PASSWORD` et de véritables identifiants de TEST.

## Exécution

Dans le terminal VS Code à la racine du projet :

```sh
sh run-auth-test.sh
```

Le script utilise `node --env-file=.env.test` pour charger les variables d'environnement avant de lancer Playwright. Il ne modifie pas le test existant.

Ne partagez ni `.env.test`, ni des captures d'écran contenant des secrets. N'utilisez pas de comptes de production.

## Git (après validation)

```sh
git add run-auth-test.sh README-Playwright-env-test.md
git commit -m "Add secure Playwright test launcher"
git push origin main
```
