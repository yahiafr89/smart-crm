# Smart CRM — CRM-02 : configuration n8n et activation du contrôle de statut

Source : configuration actuelle de la branche main du dépôt, et URL/headers transmis par Mohcine.

## Installer
1. Décompresser le ZIP à la racine de AI-POWERED MODULAR CRM (pas dans JS).
2. Remplacer JS/config/config.js par le fichier du ZIP (conserve Supabase et mode connected).
3. Remplacer JS/api/client.js par le fichier du ZIP (ajoute ngrok-skip-browser-warning: true).
4. Si le contrôle de statut n'est pas déjà affiché dans la fiche, lancer à la racine : python3 smartcrm-crm02/INSTALLER.py
5. Redémarrer/recharger Live Server, ouvrir prospects.html?id=<identifiant accessible>.

Le script INSTALLER.py est idempotent : il ajoute le contrôle à la fiche, installe prospect-status-control.js et corrige l'import manquant de postJson/webhookUrl dans prospects.js. Il ne modifie pas les autres pages.

## Test manuel minimal
- Connecté en Administrator : ouvrir une fiche dont le statut a une transition autorisée, sélectionner le statut, enregistrer, vérifier le nouveau statut après rechargement.
- Si bouton grisé : vérifier l'exécution du script et le statut (archived n'a pas de transition).
- Si erreur : vérifier URL ngrok active, chemin exact du webhook, réponse CORS/OPTIONS (Authorization, Content-Type, ngrok-skip-browser-warning) et permissions RLS.
- Ne pas désactiver RLS, ne pas placer de service_role ni secret n8n dans le navigateur.

## Git après validation
 git add JS/config/config.js JS/api/client.js JS/api/prospects.js JS/api/prospect-detail-readonly.js JS/api/prospect-status-control.js
 git commit -m "Enable CRM-02 status changes via authenticated n8n webhook"
 git push origin main

Ne pas committer smartcrm-crm02/INSTALLER.py : outil d'installation local facultatif.
