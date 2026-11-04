# Smart CRM — Correctif de stabilisation avant intégration backend

## Fichiers à remplacer
- `JS/api/auth-page.js` : interdit aussi l'accès direct à `commerciaux.html` au rôle `commercial` ; le contrôle existant sur `administration.html` reste inchangé.
- `tests/smart-crm-auth.spec.js` : remplace l'ancien test devenu incompatible avec la nouvelle interface Prospects ; couvre les trois rôles, les URLs directes et un test RLS facultatif par fixture.
- `QA/check-front-end.mjs` : contrôle statique facultatif.

Ne remplacez **aucun autre fichier**. Ne copiez pas `node_modules`, `.env.test` ni les identifiants dans GitHub ou ChatGPT.

## Installation
1. Faire une sauvegarde/commit des modifications locales, puis décompresser l'archive à la racine du CRM, en conservant les dossiers.
2. Vérifier : `node --check JS/api/auth-page.js` puis `node QA/check-front-end.mjs`.
3. Dans `.env.test` local et ignoré par Git, définir les six variables : `CRM_TEST_ADMIN_EMAIL`, `CRM_TEST_ADMIN_PASSWORD`, `CRM_TEST_MANAGER_EMAIL`, `CRM_TEST_MANAGER_PASSWORD`, `CRM_TEST_COMMERCIAL_EMAIL`, `CRM_TEST_COMMERCIAL_PASSWORD`.
4. Démarrer Live Server sur `http://127.0.0.1:5500` (ou renseigner `CRM_TEST_BASE_URL`).
5. Exécuter : `npx playwright test tests/smart-crm-auth.spec.js --project=webkit --reporter=list`.
6. Pour vérifier l'accès interdit à un prospect, renseigner facultativement `CRM_TEST_OTHER_COMMERCIAL_PROSPECT_ID` avec un ID réel affecté à **un autre** commercial.

**Attention :** Playwright marque les tests sans identifiants/fixture comme `skipped` et non comme réussis. La lecture de la liste et l'accès à une page ne prouvent pas, à eux seuls, l'application des politiques RLS.

## Travaux indispensables côté Mohcine
- Vérifier RLS sur `prospects`, `users`, `commercials` et la fonction RPC Dashboard. Tester en JWT de chaque rôle : un commercial ne peut lire aucun prospect non affecté ; manager et admin selon la matrice convenue.
- Résoudre la lecture `users` pour l'interface Administration : vérifier table, colonnes (`full_name`, `email`, `role`), grants, policies et requête exécutée ; ne jamais désactiver RLS pour corriger l'affichage.
- Vérifier le webhook HTTPS `/webhook/crm/assistant` : n8n actif, CORS (origin, Authorization, Content-Type), méthode POST, JWT et contrat de réponse. Ne pas exposer de secrets n8n dans le navigateur.
- Vérifier le flux de changement de statut CRM-02 côté serveur : authentification, autorisation, transitions, validation et journalisation.
- Valider les parcours avec les trois comptes sur un environnement de test avant production.

## Limites
Cette livraison corrige des défauts **identifiés dans le code** ; elle n'affirme pas avoir réussi des tests end-to-end contre Supabase ou n8n. Ne pas considérer la sécurité certifiée avant exécution des tests avec les comptes de test et audit des politiques RLS.

## Synchronisation
Après modification sur Mac, remplacer les fichiers `JS/api/auth-page.js`, `tests/smart-crm-auth.spec.js`, `QA/check-front-end.mjs` dans le projet ChatGPT. Puis `git add .`, `git commit -m "Stabilisation acces et tests CRM"`, `git push origin main` après vérification qu'aucun secret n'est suivi.
