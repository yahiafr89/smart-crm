# Smart CRM — Étape 7E, lecture seule des prospects

## Installation
Copier les trois modules dans `JS/api/` : `auth-page.js`, `prospects.js`, `prospects-readonly.js`.
Ne pas remplacer les autres fichiers. Le HTML existant `prospects.html` et `JS/config/config.js` restent inchangés.

## Comportement
- La session Supabase Auth existante est réutilisée.
- Lecture de `public.prospects` exclusivement avec la clé publishable et la session utilisateur.
- La RLS en base décide des lignes accessibles ; aucun filtrage de rôle ou d'ID commercial n'est effectué dans le navigateur.
- Recherche par nom, société ou e-mail ; filtre statut ; pagination 20 lignes ; tri création récente.
- Aucune modification de données. Aucun affichage de données de démonstration.
- Les autres écrans CRM conservent leur état temporaire sécurisé de l'étape 7C.

## Vérifications manuelles
1. Se connecter avec l'administrateur, ouvrir Prospects et vérifier les données attendues.
2. Répéter avec Manager et les deux commerciaux ; comparer les identifiants des lignes visibles.
3. Vérifier recherche, statut, pagination, bascule FR/EN, déconnexion et accès direct sans session.
4. Tester une table vide, une erreur réseau et un compte sans prospect.
5. Faire confirmer par Mohcine que la politique RLS est appliquée aux quatre comptes ; la validation frontend ne prouve pas seule la sécurité backend.

## Limites
Le champ `assigned_commercial_id` référence `commercials.id`. Cette étape ne joint pas la table `commercials` et ne présente donc pas encore le nom du commercial affecté. La recherche `ilike` et le tri utilisent des requêtes PostgREST, à vérifier sur les données réelles. La recherche accepte les lettres, chiffres, espaces et certains signes simples.
