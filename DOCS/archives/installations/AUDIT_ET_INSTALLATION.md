# Smart CRM — Stabilisation Front-end (4 novembre 2026)

## Installation unique
1. Faire une copie de sécurité ou un commit Git de la version actuelle.
2. Copier `JS/api/administration-page.js` dans le même chemin du projet, en remplaçant ce seul fichier.
3. Ouvrir le CRM dans Safari, tester avec les trois rôles et consulter la console en cas d’erreur.
4. Dans VS Code, à la racine du projet : `node QA/check-front-end.mjs` (Node.js requis).
5. Vérifier le résultat avant de publier : `git add . && git commit -m "Stabilisation frontend CRM" && git push origin main`.
6. Mettre à jour dans le Projet ChatGPT le fichier `JS/api/administration-page.js` après modification sur Mac.

## Audit fondé sur le code GitHub main examiné
- `JS/api/auth-page.js` : contrôle du profil et de l’accès à Administration côté interface. Cela ne remplace PAS les RLS.
- `JS/api/prospects-readonly.js` : pagination et filtres côté serveur, sans données de démonstration.
- `JS/api/prospect-status-control.js` : écriture via webhook ; la validation des transitions doit être répétée côté backend.
- `JS/api/assistant-panel.js` : actions IA en lecture seule ; la disponibilité réseau n’est pas vérifiable par audit statique.
- `JS/api/administration-page.js` : requête `users(full_name,email,role)` susceptible d’échouer selon le schéma et les permissions. Le correctif rend le diagnostic plus précis sans contourner les RLS.
- `JS/api/commerciaux-page.js` : consultation de `commercials(id,display_name)` soumise aux RLS.

## À transmettre à Mohcine
1. Vérifier existence et exposition de `public.users` (ou nom réel), colonnes `full_name,email,role`, autorisations SELECT et politiques RLS ; vérifier les logs Supabase et le code d’erreur PostgREST.
2. Vérifier CORS, disponibilité ngrok, méthode POST, webhook n8n `/webhook/crm/assistant`, en-têtes Authorization Bearer et `ngrok-skip-browser-warning` ; ne pas exposer de secrets.
3. Tester les rôles Administrator / Manager / Commercial avec comptes distincts et contrôler les réponses réellement retournées par la base et les webhooks.
4. Tester les transitions de statut CRM-02 côté serveur, sans se fier à la validation JavaScript.

## Limites de validation
Audit de code statique et syntaxe, pas de tests réels Safari/Supabase/n8n ni d’audit complet de sécurité. Les pages responsive, la navigation et le bilinguisme doivent être vérifiés manuellement. Ne pas considérer l’application prête à être vendue tant que ces contrôles et les tests backend ne sont pas passés.
