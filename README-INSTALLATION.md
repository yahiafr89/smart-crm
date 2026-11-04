# Smart CRM — CRM-02 : changement de statut

## Installation sur Mac
1. Décompresser le ZIP.
2. Déposer le dossier `smartcrm-crm02` **à la racine** du dossier `AI-POWERED MODULAR CRM` (au même niveau que `prospects.html`).
3. Dans le terminal VS Code ouvert à la racine du projet, lancer :

   `python3 smartcrm-crm02/INSTALLER.py`

Le script ajoute `JS/api/prospect-status-control.js` et modifie **sans remplacer par une ancienne version** `JS/api/prospect-detail-readonly.js` et `JS/api/prospects.js`. Il est réexécutable sans doublons.

## Configuration indispensable
Dans le fichier local `JS/config/config.js`, renseigner `n8nPublicBaseUrl` avec la **base HTTPS** actuelle de Mohcine, sans `/webhook/...` à la fin. Exemple fictif : `https://votre-domaine-n8n.example`. Ne jamais mettre de clé secrète dans le navigateur. Le webhook utilisé est `/webhook/crm-02-status-management`.

Vérifier avec Mohcine que ce webhook accepte un POST JSON `{ id, new_status }` et l'en-tête `Authorization: Bearer <jeton Supabase>`, et applique les permissions et transitions côté serveur. La réussite HTTP doit signifier que le changement est enregistré ; la fiche relit ensuite Supabase.

## Tests manuels indispensables
1. Connectez-vous avec un compte autorisé ; ouvrez `prospects.html`, puis un prospect.
2. Changez son statut, confirmez et vérifiez le nouveau statut après rechargement de la fiche.
3. Testez un commercial avec uniquement un prospect qui lui est affecté ; un identifiant non autorisé ne doit pas être accessible.
4. Vérifiez le libellé FR/EN. En cas d'échec, aucune modification locale fictive ne doit apparaître.

## Git
Après vérification :
```
git status
git add JS/api/prospect-status-control.js JS/api/prospect-detail-readonly.js JS/api/prospects.js
git commit -m "CRM-02: enable authenticated prospect status changes"
git push origin main
```
Si `JS/config/config.js` a changé, examinez-le avant de le committer : seules des URLs publiques peuvent y figurer.

## Synchronisation ChatGPT
Recharger dans le projet ChatGPT les fichiers `JS/api/prospect-status-control.js`, `JS/api/prospect-detail-readonly.js`, `JS/api/prospects.js` et `JS/config/config.js` si ce dernier a changé.
