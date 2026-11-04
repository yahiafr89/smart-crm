# Smart CRM — Test Playwright Administrator (lecture seule)

## Installation
Copier `tests/smart-crm-auth.spec.js` dans le dossier `tests/` du projet. Aucun fichier existant n'est remplacé.

## Configuration locale
Créer **manuellement** `.env.test` à la racine du projet (ne jamais partager ni publier ce fichier) :

```dotenv
CRM_TEST_BASE_URL=http://127.0.0.1:5500
CRM_TEST_ADMIN_EMAIL=compte-administrator-de-test@example.invalid
CRM_TEST_ADMIN_PASSWORD=remplacer-par-le-mot-de-passe-du-compte-de-test
```

Utiliser un environnement Supabase de test et des comptes dédiés, jamais des identifiants de production. `.gitignore` doit exclure `.env.test`.

## Exécution
Démarrer Live Server sur le port 5500 puis lancer :

```bash
npx playwright test tests/smart-crm-auth.spec.js --project=chromium
```

Ce test se connecte, vérifie la redirection vers le dashboard, puis la liste des prospects en lecture seule. Il ne vérifie **pas encore** les RLS inter-commerciaux. Ne pas diffuser les captures, traces et rapports contenant des données clients.

## Git (après validation)
```bash
git add tests/smart-crm-auth.spec.js README-Playwright-auth.md
git commit -m "Add Playwright administrator authentication smoke test"
git push origin main
```

Synchroniser ces deux fichiers dans le Projet ChatGPT après installation. Ne jamais y charger `.env.test`.
