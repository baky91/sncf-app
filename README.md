# sncf-app

Lien : https://sncf-app.vercel.app

Application web qui permet de consulter en temps réel les départs et arrivées des trains en gare. Elle utilise l'API de la SNCF pour récupérer les données et offre une interface responsive.
Pour l'interface, j'ai repris les couleurs de SNCF Connect et je me suis inspiré des panneaux d'affichage en gare (bleu pour les départs et vert pour les arrivées).

## Fonctionnalités

- Rechercher une gare par son nom avec autocomplétion
- Sélectionner une gare parmi différentes possibilités regroupées par ville
- Afficher les départs et les arrivées en gare
- Consulter les détails d'un trajet (tous les arrêts avec les heures d'arrivée)

## Technologies

### Frontend

- Vite + React
- React Router
- SASS (styles)

### Backend

- NodeJS + Express
- Axios (requêtes API)
- dotenv (gestion des variables d'environnement)
- Serveur proxy pour ne pas exposer la clé API et limiter les appels côté client

## 🚀 Installation et lancement

### Prérequis
- Node.js
- npm

### Installation

```bash
# Cloner le repository
git clone https://github.com/baky91/sncf-app.git
cd sncf-app

# Installer les dépendances
npm install
```

### Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📄 Licence

Ce projet est sous licence MIT.
