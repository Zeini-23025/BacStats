# Application d'Analyse du BAC 2024

## Description

Ce projet est une application web basée sur React conçue pour visualiser et analyser les résultats de la session du BAC 2024. Elle offre une interface intuitive permettant aux utilisateurs d'explorer les statistiques et les résultats individuels, fournissant ainsi des aperçus sur les données de performance.

## Fonctionnalités

*   **Tableau de Bord Interactif :** Naviguez à travers différentes sections à l'aide d'une interface à onglets.
*   **Mode Sombre/Clair :** Basculez entre les thèmes sombre et clair pour une meilleure expérience utilisateur et accessibilité.
*   **Visualisation des Données :** Présente les données des résultats du BAC dans un format facilement digestible, incluant probablement des graphiques (implémenté dans `Statistics.js`).
*   **Fonctionnalité de Recherche :** Permet aux utilisateurs de rechercher des résultats spécifiques (implémenté dans `Home.js`).
*   **Conception Réactive :** Construit avec Material-UI pour assurer une mise en page cohérente et réactive sur divers appareils.
*   **Indicateur de Chargement :** Fournit un retour visuel pendant le chargement des données depuis le backend.

## Technologies Utilisées

*   **Frontend :**
    *   React.js
    *   Material-UI (`@mui/material`)
    *   React Hooks
    *   Context API
*   **Gestion des Données :**
    *   JSON

## Préparation des Données

Le fichier `convert_to_json.py` est un script Python utilisé pour convertir les données brutes des résultats du BAC (initialement au format CSV) en un fichier JSON (`results.json`). Ce fichier JSON est ensuite consommé par l'application React pour l'affichage et l'analyse.

## Structure du Projet

```
bac-analytics-app/
├── public/
│   ├── results.json        # Fichier de données JSON pour les résultats du BAC
│   └── ...                 # Autres ressources statiques (index.html, favicon, logos)
├── src/
│   ├── App.js              # Composant principal de l'application, gère le routage et le thème
│   ├── index.js            # Point d'entrée de l'application React
│   ├── components/
│   │   ├── Home.js         # Composant pour l'interface d'accueil/recherche
│   │   └── Statistics.js   # Composant pour l'affichage de l'analyse statistique
│   └── ...                 # Autres fichiers liés à React (CSS, tests, etc.)
├── .github/
│   └── workflows/
│       └── deploy.yml      # Configuration CI/CD pour GitHub Pages
├── package.json            # Métadonnées et dépendances du projet
├── package-lock.json       # Enregistre les versions exactes des dépendances
├── README.md               # Documentation du projet (ce fichier)
└── ...                     # Autres fichiers de configuration (.gitignore, etc.)
```

## Installation et Développement

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/Zeini-23025/BacStats.git
cd BacStats/bac-analytics-app

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm start
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## Déploiement

### Déploiement automatique avec GitHub Actions
L'application est configurée pour un déploiement automatique sur GitHub Pages à chaque push sur la branche `main` ou `master`.

### Déploiement manuel
```bash
# Construire et déployer sur GitHub Pages
npm run deploy
```

### URL de l'application déployée
L'application est accessible à l'adresse : [https://zeini-23025.github.io/BacStats](https://zeini-23025.github.io/BacStats)

## Scripts Disponibles

- `npm start` : Lance l'application en mode développement
- `npm run build` : Construit l'application pour la production
- `npm test` : Lance les tests
- `npm run deploy` : Déploie l'application sur GitHub Pages