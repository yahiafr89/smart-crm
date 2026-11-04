SMART CRM - CRM-02 - CORRECTIF DIRECT

Source: branche main du dépôt yahiafr89/smart-crm (4 novembre 2026).

1. Décompresser cette archive.
2. Copier le dossier JS dans la racine de votre projet Smart CRM et accepter de remplacer les deux fichiers existants. Le troisième fichier est ajouté.
3. Vérifier JS/config/config.js : n8nPublicBaseUrl doit être https://subway-goliath-reversing.ngrok-free.dev (déjà présent sur GitHub).
4. Dans Safari, recharger la page prospects.html?id=... (Cmd + Option + R).
5. Vérifier la section Changer le statut puis tester une transition autorisée.
6. Si erreur réseau: vérifier CORS et le webhook /webhook/crm-02-status-management avec Mohcine.

Fichiers: JS/api/prospect-detail-readonly.js (remplacer), JS/api/prospects.js (remplacer), JS/api/prospect-status-control.js (ajouter).
Aucun script Python. Aucun secret. Ne pas écraser JS/config/config.js ni JS/api/client.js.
