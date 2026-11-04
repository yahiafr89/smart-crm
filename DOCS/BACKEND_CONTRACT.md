# Contrat Front-end ↔ Backend — à valider avec Mohcine

**Statut : brouillon, non validé par le backend.**

## Supabase
- Authentification : Supabase Auth ; profils et rôles à confirmer avec Mohcine.
- Rôles attendus : Administrator (accès complet), Manager (prospects et commerciaux), Commercial (uniquement ses prospects et son dashboard).
- Vérifier le schéma réel des tables, clés étrangères, RPC dashboard, règles RLS et politiques de lecture/écriture.
- Les droits ne doivent jamais être garantis uniquement par le navigateur.

## n8n
- `POST /webhook/crm/lead-intake` : demande publique, sans JWT ; le corps frontal connu contient `first_name`, `last_name`, `company`, `email`, `phone`, `message`.
- Champ `consent` : besoin fonctionnel exprimé, mais non confirmé comme transmis par le code actuel ; à arbitrer et valider.
- Autres webhooks CRM (statut et assistant) : confirmer chemins, JWT, autorisations, CORS, format JSON et gestion des erreurs avant toute mise en production.
- L'URL ngrok de développement ne constitue pas une URL de production stable.

## Validation requise
- [ ] Schéma base et colonnes vérifiés avec Mohcine.
- [ ] Contrats de requêtes/réponses API et webhooks validés.
- [ ] Tests d'isolement RLS Commercial A / Commercial B effectués.
- [ ] Tests Manager / Administrator et refus d'accès non autorisés effectués.
- [ ] Validation serveur des champs, anti-spam, limitation de débit et gestion des doublons.
- [ ] Aucun secret backend dans les fichiers distribués au navigateur.
