# Smart CRM — AI-POWERED MODULAR CRM

Application CRM SaaS bilingue (français/anglais), composée d'un site public et d'une interface authentifiée.

## Équipe
- Front-end : Yahia — HTML, CSS, JavaScript.
- Backend : Mohcine — Supabase Auth, PostgreSQL/RLS, API, n8n.

## Pages
- Site public : `index.html`, `about.html`, `services.html`, `contact.html`.
- CRM : `login.html`, `dashboard.html`, `prospects.html`, `commerciaux.html`, `administration.html`.

## Repères techniques
- `CSS/style.css` : apparence.
- `JS/script.js` : logique historique, traductions, formulaires.
- `JS/api/` : intégrations Supabase/n8n et logique des pages connectées.
- `JS/config/config.js` : configuration côté navigateur, **aucun secret privé**.
- `tests/` : tests automatisés ; `check-front-end.mjs` : vérifications statiques.
- `DOCS/archives/` : anciennes notices et outils de démonstration, conservés par précaution.

## Démarrage et validation
Ouvrir le dossier dans VS Code ; utiliser Live Server pour l'interface.
Installer les dépendances avec `npm ci` puis lancer `node check-front-end.mjs`.
Les tests Playwright nécessitent les comptes et services de test appropriés ; un test ignoré n'est pas un test réussi.

## Sécurité et intégration
Les restrictions JavaScript de l'interface ne remplacent ni les règles RLS Supabase ni l'autorisation côté n8n.
Ne jamais placer de clé service_role ou de mot de passe dans le front-end.
Voir `DOCS/BACKEND_CONTRACT.md` et `DOCS/TEST_PLAN.md` avant de connecter les services de Mohcine.
