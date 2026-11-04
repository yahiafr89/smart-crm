# Correctif CRM-06 — affichage Markdown complet

## Installation
1. Décompresser l'archive à la racine de Smart CRM.
2. Remplacer **uniquement** `JS/api/assistant-panel.js`.
3. Recharger Safari avec Cmd + Option + R.
4. Exécuter les actions CRM-06 et vérifier paragraphes, listes, tableaux et défilement horizontal.
5. Ouvrir « Réponse brute intégrale (vérification) » pour comparer caractère par caractère avec le champ `answer` dans l'onglet Réseau (Network) du navigateur, notamment la ligne 6.
6. La console affiche `CRM-06 answer integrity`, incluant le nombre de caractères, le nombre de lignes, la sixième ligne et `rawMatchesNetwork: true` lorsque le contenu brut affiché est identique au champ `answer` reçu.

## Garanties et limites
- Le Markdown est transformé en éléments DOM créés avec `document.createElement` et `textContent` : aucun HTML non fiable n'est injecté.
- Tableaux, titres, paragraphes, listes, citations, blocs de code et emphase simples pris en charge.
- Le Markdown complexe (listes imbriquées, liens, cellules contenant des pipes dans du code) peut nécessiter une bibliothèque spécialisée ultérieurement.
- Aucun découpage ni hauteur maximale appliquée au champ `answer`; le bloc brut conserve exactement la chaîne reçue.
- `evidence` et métadonnées restent séparés dans un panneau dédié.
- La comparaison réelle avec le réseau doit être effectuée dans Safari avec une réponse de CRM-06 : aucun jeton ni compte de test n'est inclus.
- Aucun changement backend, Supabase, n8n, authentification, ni autre fichier CSS/JS.

## Synchronisation
Après modification sur Mac, mettre à jour `JS/api/assistant-panel.js` dans le Projet ChatGPT et publier le changement sur GitHub.
