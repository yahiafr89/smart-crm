# Smart CRM — Pack Front-end d'intégration (2026-11-04)

## Installation rapide

1. Décompresser le ZIP dans **Téléchargements** sur Mac.
2. Ouvrir le **vrai projet Smart CRM** dans VS Code (racine contenant `login.html`).
3. Dans le terminal VS Code, exécuter :

```bash
python3 ~/Downloads/SMARTCRM_FRONTEND_INTEGRATION_COMPLETE/installer.py --check
python3 ~/Downloads/SMARTCRM_FRONTEND_INTEGRATION_COMPLETE/installer.py
```

Le script vérifie les points d'intégration **avant** de modifier quoi que ce soit, sauvegarde les originaux hors du dépôt dans `~/SmartCRM-Backups/`, et refuse de remplacer des fichiers préexistants différents.

Ne pas utiliser un ancien ZIP de nettoyage. Ne pas fusionner manuellement les fichiers JS.

## Ajouts

- Formulaire d'édition de fiche prospect (avec RLS Supabase comme autorité réelle).
- Gestion sécurisée des utilisateurs : invitation, changement de rôle, activation/désactivation **uniquement via endpoints backend**.
- Affectation de prospects et renommage de commerciaux **uniquement via endpoints backend**.
- Réinitialisation de mot de passe via Supabase Auth (nécessite URL de redirection autorisée).
- Styles supplémentaires isolés, sans changement visuel de login.html.
- Contrat technique complet pour Mohcine dans `docs/CONTRAT_BACKEND_MOHCINE.md`.

## Limitations importantes

Ce pack implémente les **interfaces et les appels front-end**, PAS les endpoints n8n, règles RLS ou opérations privilégiées. Ces dépendances sont décrites dans le contrat backend.

Aucune suppression du code existant; aucun changement de clés; aucune écriture dans Supabase par le script d'installation.

## Contrôles locaux

```bash
node check-front-end.mjs
# Requiert un serveur et des identifiants de test, si déjà configurés :
# ./run-auth-test.sh
```

### Vérifications visuelles

- `login.html` → mot de passe oublié, lien de réinitialisation (Supabase redirect allowlist requise).
- `prospects.html?id=...` → bouton **Modifier les informations**; si RLS refuse UPDATE, afficher erreur sans fausse confirmation.
- `commerciaux.html` → gestion des affectations pour manager et administrateur.
- `administration.html` → gestion des comptes pour administrateur uniquement.
- FR/EN et responsive sur les nouveaux formulaires.

## Synchronisation

Remplacer dans ChatGPT Project les versions des fichiers modifiés :
`JS/api/auth-page.js`, `JS/api/prospect-detail-readonly.js`, `JS/api/administration-page.js`, `JS/api/commerciaux-page.js`.

Ajouter les nouveaux fichiers :
`JS/api/frontend-operations.js`, `JS/api/prospect-editor.js`, `JS/api/account-recovery.js`, `JS/api/management-operations.js`, `JS/api/frontend-enhancements.css`, `docs/CONTRAT_BACKEND_MOHCINE.md`.
