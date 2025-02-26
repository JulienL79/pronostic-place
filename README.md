# Pronostic Place

Pronostic Place est une application web conçue pour gérer et consulter des pronostics et des résultats des jeux proposés par la Française des Jeux (FDJ), notamment Euromillions et Loto. Développée avec React pour le frontend et Node.js pour le backend, cette application offre une expérience intuitive pour consulter les résultats historiques et obtenir des prédictions basées sur des paramètres définis.

## Fonctionnalités principales

### 1. **Onglet Résultats**
- Permet de consulter les résultats des jeux depuis leur lancement.
- Inclut un filtre avancé pour affiner les résultats :
  - Date
- Affichage des résultats sous forme de tableau paginé.

### 2. **Onglet Pronostics**
- Génère des pronostics en fonction des paramètres définis par l'utilisateur.
- Paramètres personnalisables, tels que :
  - Bornage de la période globale
  - Bornage de la période récente

## Technologies utilisées

### Frontend
- **React** : Pour la création d'une interface utilisateur dynamique et réactive.
- **React Router** : Gestion de la navigation entre les onglets Résultats et Pronostics.
- **Axios** : Communication avec l'API backend.

### Backend
- **Node.js** : Serveur backend performant.
- **Express.js** : Framework pour gérer les routes et les API REST.
- **MongoDB** : Base de données pour stocker les résultats.