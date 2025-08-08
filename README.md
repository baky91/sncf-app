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

## Installation

### Prérequis

- Node.js
- npm

```bash
# Cloner le repository
git clone https://github.com/baky91/sncf-app.git
cd sncf-app
```

## Configuration

**Choisissez votre mode selon votre situation :**

- [Option A : Avec ma propre clé API SNCF](#-option-a--avec-ma-propre-clé-api-sncf)
- [Option B : Sans clé API (serveur proxy)](#-option-b--sans-clé-api-serveur-proxy)

### Option A : Avec ma propre clé API SNCF

#### Backend

1. **Obtenir une clé API SNCF**

   - Demandez une clé API sur : https://numerique.sncf.com/startup/api

2. **Configuration**

   ```bash
   cd backend
   cp .env.example .env
   ```

   Contenu de `backend/.env` :

   ```env
   SNCF_API_KEY=votre_cle_api_sncf_ici
   ```

3. **Installation et lancement**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   Serveur accessible sur http://localhost:3000

#### Frontend

1. **Configuration**

   ```bash
   # Sur un autre terminal
   cd frontend
   ```

    **(Facultatif)**

   ```env
   cp .env.example .env
   ```
   Contenu de `frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

2. **Installation et lancement**

   ```bash
   npm install
   npm run dev
   ```

   Application accessible sur http://localhost:5173

---

### Option B : Sans clé API (serveur proxy)

#### Frontend uniquement (backend non nécessaire)

1. **Configuration**

   ```bash
   cd frontend
   cp .env.example .env
   ```

   Contenu de `frontend/.env` :

   ```env
   VITE_API_BASE_URL=https://sncf-app-backend.vercel.app
   ```

2. **Installation et lancement**

   ```bash
   npm install
   npm run dev
   ```

   Application accessible sur http://localhost:5173

## Structure du projet

```
sncf-app/
├── frontend/                    # Application React (Vite)
│   ├── src/
│   │   ├── components/          # Composants réutilisables
│   │   ├── contexts/            # Contextes React
│   │   ├── hooks/               # Hooks personnalisés
│   │   ├── pages/               # Pages principales
│   │   ├── styles/              # Fichiers SASS
│   │   ├── utils/               # Fonctions utilitaires
│   │   ├── img/                 # Images
│   │   ├── App.jsx              # Composant principal
│   │   ├── main.jsx             # Point d'entrée
│   │   ├── cities.json          # Données des villes
│   │   └── utils.js             # Utilitaires globaux
│   ├── public/                  # Assets statiques
│   ├── .env.example             # Template des variables d'environnements
│   ├── package.json             # Dépendances frontend
│   └── index.html
├── backend/                     # Serveur Express API
│   ├── routes/                  # Routes API
│   ├── data/                    # Données des gares
│   ├── .env.example             # Template des variables d'environnements
│   ├── index.js                 # Serveur Express principal
│   └── package.json             # Dépendances backend
└── README.md                    # Documentation
```

## License

Ce projet est sous licence MIT.
