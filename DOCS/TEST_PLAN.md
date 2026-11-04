# Plan de recette — Smart CRM

**Statut : scénarios à exécuter, pas de validation automatique.**

## Vérifications locales
- [ ] `node check-front-end.mjs` exécuté sans erreur.
- [ ] `npm ci` et tests Playwright avec environnement de test dédié.
- [ ] Distinguer les résultats PASS, FAIL et SKIP.
- [ ] Tester Safari et affichages mobile/tablette/desktop.

## Site public
- [ ] Pages Accueil / À propos / Services / Contact en FR et EN.
- [ ] Formulaires `index.html` et `contact.html` : validation, erreurs, succès réels.
- [ ] Intégration CRM-01 : prospect créé une seule fois, consentement vérifié si requis.

## CRM
- [ ] Connexion, déconnexion, expiration de session.
- [ ] Administrator / Manager / Commercial : visibilité ET contrôle serveur des droits.
- [ ] Commercial A ne peut pas accéder aux prospects de Commercial B, même via requête API directe.
- [ ] Liste, fiche, filtrage, modification de statut des prospects.
- [ ] Dashboard par rôle et cohérence des données Supabase.
- [ ] Administration et commerciaux : droits conformes aux règles du backend.
- [ ] Assistant IA : rendu sécurisé, gestion des erreurs et des données sensibles.

## Avant mise en production
- [ ] HTTPS, CSP/CORS, protection des secrets et validation backend.
- [ ] Revue finale avec Mohcine et compte rendu de tests daté.
