# Smart CRM — Correctif CRM-01 (formulaire public)

## Installation
Décompresser à la racine du dépôt et remplacer uniquement `JS/script.js`.
Ce fichier a été dérivé du blob GitHub main `259ffce9e2f5b148d6941be4af581968eda24000`.
Si `main` a changé depuis cette version, ne pas écraser sans comparer.

## Fonctionnement
- Utilise `JS/config/config.js` et `JS/api/prospects.js` déjà présents.
- Envoie POST `/webhook/crm/lead-intake` via `submitPublicLead`.
- Conserve les validations, les messages FR/EN et les champs actuels.
- Garde le délai maximal de 15 secondes.
- Une erreur réseau, HTTP, JSON ou `success:false` ne déclenche pas de confirmation.
- Aucune écriture dans la base ou gestion de rôle n'est ajoutée côté navigateur.

## Vérification requise avec Mohcine
- Confirmer la disponibilité de `n8nPublicBaseUrl` dans `JS/config/config.js`.
- Vérifier CORS pour l'origine du site, et la réponse JSON HTTP 2xx du webhook.
- Faire un envoi réel et vérifier une seule insertion dans Supabase.
- Vérifier le comportement lors d'un timeout (éviter les doublons à la relance).
- Le champ `consent` n'est pas transmis : vérifier le contrat métier si obligatoire.

## Synchronisation
Remplacer `JS/script.js` dans le projet ChatGPT après modification locale.
Puis commit/push sur GitHub après validation.
