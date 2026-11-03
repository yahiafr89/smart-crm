# Smart CRM — Correctif 7F : commercial affecté

## Installation
Copier les trois fichiers `JS/api/*.js` du ZIP dans `JS/api/` du projet, en remplaçant uniquement les deux fichiers déjà existants. Conserver `auth-page.js` et les autres fichiers inchangés.

## Fonctionnement
- Liste : colonne Commercial affecté / Assigned salesperson.
- Fiche : nom du commercial à la place de l’UUID.
- `prospects.assigned_commercial_id` → `commercials.id` → `commercials.display_name`.
- Requêtes de lecture avec la session Supabase existante et les politiques RLS existantes.
- Valeurs : Non affecté si aucun ID, Nom indisponible si le nom n’est pas accessible.
- La liste reste disponible si la requête des noms échoue.

## Vérifications
1. Administrator : vérifier la liste et la fiche, avec commercial affecté et non affecté.
2. Manager : vérifier les mêmes informations.
3. Commercial 1 : vérifier qu’il ne voit que ses prospects et son nom.
4. Commercial 1 : essayer une URL directe d’un prospect du Commercial 2 : aucun détail ne doit s’afficher.
5. Tester FR/EN, recherche, filtre, pagination et retour à la liste.

## Git
```
git add JS/api/commercial-labels.js JS/api/prospects-readonly.js JS/api/prospect-detail-readonly.js README-7F-commercial-affecte.md
git commit -m "Show assigned salesperson on prospects"
git push origin main
```

## Synchronisation ChatGPT
Mettre à jour les quatre fichiers listés ci-dessus dans les sources du Projet ChatGPT.
