# Smart CRM — 7F : fiche prospect en lecture seule

## Installation
Copier les trois fichiers de `JS/api/` dans le dossier `JS/api/` existant. Ne pas remplacer les autres fichiers.

## Comportement
- Dans la liste des prospects, cliquer sur le prénom ouvre `prospects.html?id=<id>`.
- La fiche lit uniquement `public.prospects` via le client Supabase authentifié.
- La politique RLS existante reste responsable de l’autorisation. Un prospect inaccessible est présenté comme introuvable ou non accessible.
- Aucune modification, suppression ni changement de statut.
- `assigned_commercial_id` est présenté comme identifiant brut, sans jointure non vérifiée vers `commercials`.
- Les champs absents sont affichés `—` ; le texte est inséré avec `textContent` pour éviter l’injection HTML.

## Tests
1. Administrateur : ouvrir une fiche depuis la liste, revenir à la liste.
2. Vérifier FR/EN et les champs affichés.
3. Tester une URL `prospects.html?id=999999999999` et une URL `prospects.html?id=abc`.
4. Tester le compte commercial sur un prospect affecté et sur un identifiant non autorisé.
5. Tester la coupure réseau et le bouton Réessayer.

## Limites
L’historique des modifications n’est pas disponible dans la structure `public.prospects` fournie. Les dates de suivi existantes sont affichées, sans inventer une table d’audit. La sécurité RLS doit être vérifiée séparément côté Supabase.
