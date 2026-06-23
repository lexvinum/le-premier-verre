# Le Premier Verre — Architecture générale

## Vision

Le Premier Verre est une plateforme éditoriale et technologique consacrée au vin, avec une approche accessible, élégante et orientée Québec.

La plateforme évoluera en plusieurs volets :

1. Média éditorial
2. Répertoire de vignobles, producteurs et bonnes adresses
3. Carte interactive
4. Scan IA / OCR
5. Profils utilisateurs
6. Ma cave
7. Services professionnels et juridiques
8. Abonnements premium

## Stack technique

- Next.js : site et application
- Vercel : hébergement
- Sanity : CMS éditorial
- Supabase : base de données utilisateurs
- OpenAI : IA, recommandations, analyse de vin
- OCR : reconnaissance d’étiquettes et cartes des vins
- Mapbox ou Google Maps : carte interactive
- Stripe : abonnements premium
- Resend : courriels transactionnels

## Structure future

### Public

- Accueil
- À propos
- Articles
- Guides
- Vignobles
- Producteurs
- Bonnes adresses
- Carte interactive
- Services juridiques
- Contact

### Utilisateur connecté

- Mon profil
- Ma cave
- Mes bouteilles
- Mes favoris
- Mes dégustations
- Wishlist
- Paramètres

### Outils IA

- Scan d’étiquette
- Scan de carte des vins
- Sommelier IA
- Recommandations personnalisées
- Accords mets-vins

## Phases de développement

### Phase 1 — Fondations

- Rebranding complet
- Domaine
- Vercel
- GitHub
- Structure de projet
- Documentation
- Sanity CMS

### Phase 2 — Média

- Articles
- Pages éditoriales
- Vignobles
- Producteurs
- Bonnes adresses

### Phase 3 — Comptes utilisateurs

- Authentification
- Profil utilisateur
- Favoris
- Wishlist

### Phase 4 — Ma cave

- Ajout manuel de bouteilles
- Notes personnelles
- Historique de dégustation
- Recommandations simples

### Phase 5 — IA / OCR

- Scan d’étiquette
- Extraction des informations
- Reconnaissance du vin
- Ajout automatique à Ma cave
- Sommelier IA

### Phase 6 — Premium

- Abonnements
- Fonctionnalités avancées
- Alertes
- Suggestions personnalisées