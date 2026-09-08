# Le Premier Verre — Inventaire officiel des routes

Dernière mise à jour : 31 juillet 2026

## 1. Lancement d’octobre 2026

### Pages principales

| Route | Fonction | Navigation |
|---|---|---|
| `/` | Accueil | Menu principal |
| `/ce-soir` | Parcours selon le moment | Menu principal |
| `/vins` | Répertoire des bouteilles | Menu principal |
| `/vins/[slug]` | Fiche d’un vin | Liens internes |
| `/producteurs` | Répertoire des producteurs | Menu principal |
| `/producteurs/[slug]` | Fiche d’un producteur | Liens internes |
| `/bonnes-adresses` | Bars, restaurants, cavistes et lieux | Menu principal |
| `/bonnes-adresses/[slug]` | Fiche d’une adresse | Liens internes |
| `/guides` | Guides éditoriaux | Menu principal |
| `/guides/[slug]` | Fiche d’un guide | Liens internes |
| `/blog` | Articles | Menu principal |
| `/blog/[slug]` | Fiche d’un article | Liens internes |
| `/recherche` | Recherche globale | Header |
| `/favoris` | Favoris de l’utilisateur | Espace personnel |
| `/mon-carnet` | Notes et expériences de dégustation | Espace personnel |
| `/connexion/[[...sign-in]]` | Connexion | Espace personnel |
| `/inscription/[[...sign-up]]` | Création de compte | Espace personnel |
| `/newsletter` | Page d’inscription à l’infolettre | Footer |
| `/politique-confidentialite` | Politique de confidentialité | Footer |
| `/disponible-bientot` | Page d’attente temporaire | Temporaire |

### Pages de connaissance et de référencement

Ces pages sont publiques, mais ne figurent pas dans le menu principal.

| Route | Fonction |
|---|---|
| `/accords` | Accords mets et vins |
| `/pays` | Index des pays |
| `/pays/[slug]` | Fiche d’un pays |
| `/regions` | Index des régions |
| `/regions/[slug]` | Fiche d’une région |
| `/cepages` | Index des cépages |
| `/cepages/[slug]` | Fiche d’un cépage |
| `/appellations` | Index des appellations |
| `/appellations/[slug]` | Fiche d’une appellation |

### Pages dynamiques du CMS

| Route | Décision |
|---|---|
| `/[slug]` | Conserver si utilisée par le CMS |
| `/(pages)/[slug]` | Vérifier si elle génère réellement une route distincte |
| `/pages/[slug]` | Conserver temporairement, puis choisir une seule architecture CMS |

---

## 2. Novembre 2026

| Route | Fonction |
|---|---|
| `/boutique` | Boutique et guides payants |
| `/boutique/[slug]` | Fiche d’un produit |
| `/panier` | Panier |
| `/mes-listes` | Listes personnalisées |
| `/carte` | Carte simple ou expérience territoriale |

---

## 3. Janvier 2027

| Route | Fonction |
|---|---|
| `/ma-cave` | Cave personnelle avancée |
| `/mes-vins` | Gestion de la collection |
| `/premium` | Présentation et vente de l’abonnement |
| `/recommandation` | Recommandations personnalisées |
| `/sommelier` | Sommelier IA |

---

## 4. Année 2027 ou plus tard

| Route | Fonction |
|---|---|
| `/scan` | Scanner d’étiquette ou de carte |
| `/vignobles` | Ancienne structure distincte des producteurs |
| `/vignobles/[slug]` | Ancienne fiche vignoble |

Les données de vignoble utiles devront être intégrées aux fiches Producteurs et Bonnes adresses.

---

## 5. Routes internes et techniques

Ces routes ne doivent jamais apparaître dans la navigation publique.

| Route | Fonction |
|---|---|
| `/admin` | Administration |
| `/admin/login` | Connexion administrateur |
| `/admin-acces` | Accès administrateur |
| `/api/admin` | Interface technique |
| `/studio/[[...tool]]` | Sanity Studio |

Toutes les routes sous `/api/*` sont techniques et ne font pas partie de la navigation.

---

## 6. Routes à rediriger ou archiver

| Route | Décision recommandée |
|---|---|
| `/repertoire` | Rediriger vers `/vins` |
| `/repertoire/[slug]` | Rediriger vers `/vins/[slug]` |
| `/vignobles` | Retirer de la navigation et archiver après migration |
| `/vignobles/[slug]` | Migrer les données vers Producteurs ou Bonnes adresses |
| `/(pages)/[slug]` | Vérifier le doublon CMS |
| `/pages/[slug]` | Vérifier le doublon CMS |
| `components/lpv/MenuDrawer.tsx` | Composant inutilisé à archiver |
| `components/Sidebar.tsx` | Ancienne navigation Lex Vinum à archiver |

---

## 7. Navigation officielle d’octobre

### Menu principal

1. Accueil
2. Ce soir
3. Répertoire
4. Producteurs
5. Bonnes adresses
6. Guides
7. Blogue

### Header

- Recherche
- Favoris
- Mon carnet
- Compte

### Footer

- À propos
- Contact
- Infolettre
- Instagram
- Politique de confidentialité
- Conditions d’utilisation