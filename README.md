# sncf-app

-- En développement --

Application Web réalisé en HTML, CSS et JavaScript qui permet de consulter les horaires en gare grâce à l'API SNCF.

## Fonctionnalités

• Rechercher une gare par son nom
• Sélectionner une gare parmi différentes possiblités regroupées par ville
• Afficher les départs en gare et les arrivés en gare
• Informations sur le type de train, l'heure de départ/arrivée, le retard, la destination/provenance, les arrêts

## Lancer l'application

Pour le fonctionnement de l'application, une clé API est nécéssaire:
- Cliquez sur ce lien : https://numerique.sncf.com/startup/api/
- Demander une clé d'accès à l'API SNCF en cliquant sur **Commencer à utiliser l'API**
- Dans le fichier **api.js** à la ligne 12 ```export const API_KEY = "API_KEY";```, remplacez "API_KEY" par votre clé API\
Exemple :
```
export const API_KEY = "aaaa-bbbb-cccc-dddd";

```