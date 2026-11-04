# Smart CRM — Contrat backend pour les ajouts frontend

Ce document est **un contrat proposé**, pas une affirmation que les endpoints existent. L'interface conserve le comportement existant et affiche une erreur claire si l'endpoint n'est pas prêt.

## 1. Prérequis communs

- Tous les nouveaux POST sont des requêtes HTTPS vers `config.n8nPublicBaseUrl`.
- Headers: `Content-Type: application/json`, `Authorization: Bearer <Supabase access_token>`.
- Vérifier le JWT **côté serveur** auprès de Supabase, puis récupérer rôle/identité depuis les tables faisant autorité. Ne jamais faire confiance au rôle fourni par le navigateur.
- Contrôler RLS, propriétaire/affectation, transitions métier, unicité, limites de volume, journaliser auteur/date/action/cible/résultat.
- Ne jamais exposer `service_role`, clés n8n ou secrets SMTP dans le navigateur.
- Réponse JSON réussite : HTTP 2xx `{ "success": true, "data": { ... } }`.
- Réponse JSON échec : HTTP 400/401/403/404/409/429/500 `{ "success": false, "message": "..." }`.
- CORS : origins autorisées explicitement (local de test + futur domaine HTTPS) ; méthodes POST/OPTIONS et headers Authorization, Content-Type, ngrok-skip-browser-warning; ne pas utiliser une origine arbitraire pour les opérations privées.
- Prévoir un contrôle anti-CSRF si authentification par cookies est introduite ultérieurement (l'implémentation actuelle utilise Bearer JWT).

## 2. Endpoints nécessaires

### `POST /webhook/crm/admin/users` — administrator seulement

**Inviter** : `{ "operation":"invite", "email":"...", "full_name":"...", "role":"commercial|manager|administrator" }`. Créer invitation Supabase Auth et profil, éviter les doubles comptes, aucune transmission de mot de passe en clair.

**Changer un rôle** : `{ "operation":"change_role", "email":"...", "role":"commercial|manager|administrator" }`. Vérifier règles métier, conserver au moins un administrateur actif, éviter les modifications de son propre rôle à risque.

**Activer/désactiver** : `{ "operation":"set_active", "email":"...", "active":"true|false" }`. Le backend doit réellement couper les accès (y compris sessions existantes) selon sa stratégie et RLS.

### `POST /webhook/crm/commercials` — manager/administrator pour l'affectation

**Affecter** : `{ "operation":"assign_prospect", "prospect_id":"123", "commercial_id":"..." }`. Vérifier identifiants, appartenance/organisation, rôles et journaux. `commercial_id` est une chaîne pour rester compatible avec la représentation ID côté front ; conversion/validation serveur selon le schéma réel.

**Renommer** : `{ "operation":"update_commercial", "commercial_id":"...", "display_name":"..." }`. Administrator uniquement.

La création de commercial est assurée par **invitation administrateur** si le backend crée automatiquement la ligne `commercials` correspondante. Dans le cas contraire, fournir un mécanisme transactionnel côté serveur. Ne pas créer deux identités indépendantes.

## 3. Mise à jour d'un prospect

L'interface utilise actuellement l'adaptateur existant `updateProspect()` vers Supabase `.from('prospects').update(...)` avec le JWT utilisateur et un whitelist front :
`first_name`, `last_name`, `company`, `email`, `phone`, `notes`, `next_follow_up`.

Le backend doit CONFIRMER les colonnes et les politiques **UPDATE + SELECT** par rôle / propriétaire, et les règles métier. Sans cela, l'opération échouera fermée (message d'erreur, aucune sauvegarde locale factice). Si le schéma autorise seulement des écritures n8n/API, remplacer l'adaptateur dans `prospect-editor.js` par un endpoint backend sécurisé sans changer l'UI.

## 4. Récupération du mot de passe

Supabase Auth `resetPasswordForEmail` et `updateUser` ; ajouter l'URL exacte de `login.html` (développement ET production) dans l'allowlist de redirection Supabase. Configurer SMTP, quotas, expiration et e-mail de confirmation. Le mot de passe saisi n'est jamais envoyé à n8n.

## 5. Contrôles métier avant production

- Gestion du consentement/formulaire, protection anti-bot, rate limiting et doublons du webhook public.
- Webhooks existants `/webhook/crm/lead-intake`, `/webhook/crm-02-status-management`, `/webhook/crm/assistant` : vérifier authentification/quotas pour les endpoints privés, idempotence et messages d'erreur.
- Tests négatifs directs (API sans JWT, rôle commercial lisant/modifiant autre prospect, commercial appelant admin, manager modifiant le rôle d'un tiers, jeton invalide).
- Déploiement HTTPS permanent, journalisation, sauvegardes restaurables, surveillance des échecs, politiques de conservation des données.
