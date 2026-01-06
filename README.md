# Pokémon Portfolio

Petite app statique pour gérer ton portfolio de cartes Pokémon.

## Lancer localement
- Option 1 (dev server inclus):
  - Node est requis
  - `node serve.js`
  - Ouvrir http://127.0.0.1:3000

- Option 2 (si tu as http-server installé):
  - `npx http-server -p 3000`

## Déploiement (Vercel)
1. Créer un repo GitHub et pousser le code
2. Sur https://vercel.com -> Import Project -> choisir le repo
3. Framework: `Other`, Build Command: (vide), Output Directory: `.`
4. Déployer (Vercel gérera les fichiers statiques)

## Nettoyage de données locales
Si tu vois des images qui pointent vers `${...}`, ouvre la console du navigateur et exécute:
```js
window.clearPlaceholders()
```

---
Si tu veux, je peux créer le repo GitHub pour toi (tu devras autoriser), ou je te guide pour pousser le repo et connecter Vercel.