# Le Premier Verre — Domain Model

## Objectif

Le Premier Verre repose sur une base de connaissances structurée sur le vin.

Le but n'est pas seulement de publier des articles, mais de relier les vins, cépages, régions, producteurs, accords, recettes, contenus éducatifs et données utilisateurs afin de permettre :

- la recherche intelligente;
- les recommandations;
- la cave personnelle;
- les accords mets-vins;
- les parcours éducatifs;
- les contenus éditoriaux reliés automatiquement.

## Entités principales

### Wine

Représente une bouteille ou une cuvée.

Relations :
- appartient à un Producer;
- appartient à une Region;
- appartient à un Country;
- peut avoir plusieurs Grapes;
- peut avoir plusieurs FoodPairings;
- peut être lié à plusieurs Articles;
- peut être ajouté à une UserCellar;
- peut recevoir des TastingNotes.

Champs clés :
- name
- slug
- producer
- country
- region
- grapes
- vintage
- color
- style
- price
- alcohol
- acidity
- tannins
- body
- sweetness
- aromas
- servingTemperature
- agingPotential
- description
- image
- featured

### Producer

Représente un domaine, une maison, un vigneron ou une entreprise vinicole.

Relations :
- appartient à un Country;
- peut appartenir à une Region;
- possède plusieurs Wines;
- peut être lié à des Articles.

### Country

Représente un pays producteur de vin.

Relations :
- possède plusieurs Regions;
- possède plusieurs Producers;
- possède plusieurs Wines.

### Region

Représente une région viticole.

Relations :
- appartient à un Country;
- possède plusieurs Producers;
- possède plusieurs Wines;
- peut être associée à plusieurs Grapes.

### Grape

Représente un cépage.

Relations :
- peut être utilisé dans plusieurs Wines;
- peut être associé à plusieurs Regions;
- peut être lié à des FoodPairings;
- peut être lié à des Articles éducatifs.

### FoodPairing

Représente un accord mets-vins.

Relations :
- peut être associé à plusieurs Wines;
- peut être associé à plusieurs Grapes;
- peut être lié à une Recipe.

### Article

Représente un contenu éditorial.

Relations :
- peut être lié à des Wines;
- peut être lié à des Producers;
- peut être lié à des Regions;
- peut être lié à des Grapes;
- peut appartenir à une Collection.

### Recipe

Représente une recette ou un plat utilisé pour les recommandations.

Relations :
- peut être associée à plusieurs FoodPairings;
- peut être liée à des Wines;
- peut être liée à des Articles.

### Collection

Représente une sélection éditoriale.

Exemples :
- Vins pour débuter
- Petits prix
- Bulles d'été
- Rouges légers
- Cadeaux d'hôtesse
- Vins de garde

Relations :
- contient plusieurs Wines;
- peut contenir plusieurs Articles.

### TastingNote

Représente une note de dégustation.

Relations :
- appartient à un User;
- appartient à un Wine.

### UserCellar

Représente la cave personnelle d'un utilisateur.

Relations :
- appartient à un User;
- contient plusieurs CellarBottle.

### CellarBottle

Représente une bouteille détenue par un utilisateur.

Relations :
- appartient à un UserCellar;
- référence un Wine.

Champs clés :
- quantity
- purchaseDate
- purchasePrice
- location
- notes

## Principe architectural

Sanity doit contenir le contenu éditorial et la base de connaissances publique.

Prisma/PostgreSQL doit contenir les données transactionnelles et personnelles :
- utilisateurs;
- cave personnelle;
- favoris;
- historique;
- notes privées;
- préférences;
- recommandations personnalisées.

## Séparation des responsabilités

Sanity :
- articles;
- vins éditoriaux;
- cépages;
- pays;
- régions;
- producteurs;
- accords;
- collections;
- SEO;
- contenus éducatifs.

Base applicative :
- comptes utilisateurs;
- bouteilles personnelles;
- favoris;
- préférences;
- historique de dégustation;
- données privées;
- achats futurs.

## Vision long terme

Le Premier Verre doit être capable de supporter :

- des milliers de vins;
- une base éditoriale riche;
- des recommandations fondées sur des données structurées;
- un assistant IA spécialisé;
- une cave personnelle;
- une expérience mobile future;
- une intégration SAQ ou boutique;
- une recherche par plat, style, prix, région, occasion ou niveau de connaissance.

