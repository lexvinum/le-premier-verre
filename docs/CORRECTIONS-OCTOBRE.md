# Le Premier Verre — Corrections avant octobre 2026

## Lot 1 — Liens et fonctions reportées

- [x] Rediriger `/recherche` vers l’accueil.
- [x] Faire pointer les résultats `vineyard` vers `/producteurs`.
- [x] Remplacer `/sign-in` par `/connexion`.
- [x] Remplacer `/sign-up` par `/inscription`.
- [x] Remplacer les liens `/repertoire` par `/vins`.
- [x] Retirer les dernières références visibles à « Lex Vinum ».
- [x] Retirer les liens vers le Sommelier de la page Ce soir.
- [x] Retirer le lien Sommelier de Mon carnet.
- [x] Corriger les descriptions SEO globales.

## Lot 2 — Répertoire et fiches vin

- [x] Ajouter une recherche au répertoire `/vins`.
- [x] Ajouter les filtres Couleur, Pays et Région.
- [x] Ajouter les images Sanity aux cartes.
- [x] Archiver ou rediriger `/repertoire`.
- [x] Retirer le bouton inactif « Ajouter à ma cave ».
- [x] Ajouter Favoris sur la fiche vin.
- [x] Rendre le producteur cliquable.
- [x] Afficher prix, cépages, alcool, sucre, température et garde.
- [x] Afficher acidité, corps et tanins.
- [x] Afficher les accords lorsqu’ils existent.

## Lot 3 — Producteurs

- [x] Utiliser les images provenant de Sanity.
- [x] Ajouter un état vide sur l’index.
- [x] Retirer le libellé fixe « Domaine ».
- [x] Retirer les liens vers `/vignobles`.
- [x] Ajouter l’image principale sur la fiche.
- [x] Afficher le résumé, la philosophie et les pratiques lorsque disponibles.
- [ ] Publier un producteur test pour vérifier la fiche complète.

## Lot 4 — Bonnes adresses

- [x] Ajouter les images Sanity sur l’index.
- [x] Ajouter un état vide.
- [x] Ajouter un court résumé aux cartes.
- [x] Ajouter l’image principale sur la fiche.
- [x] Afficher les renseignements pratiques disponibles.
- [ ] Ajouter un lien externe vers une carte lorsque l’adresse est présente.

## Lot 5 — Guides et blogue

- [x] Ajouter les images Sanity aux guides.
- [x] Ajouter les états vides.
- [x] Ajouter l’image principale et les métadonnées aux fiches guides.
- [x] Remplacer les articles codés en dur dans `/blog` par les articles Sanity.
- [ ] Vérifier les liens, listes et images dans Portable Text.

## Lot 6 — Favoris et carnet

- [x] Migrer la page Favoris de Prisma vers Sanity.
- [x] Supprimer l’ancien hook `lib/useFavorites.ts`.
- [ ] Renommer les anciennes clés `lexvinum_*` au moment opportun.
- [x] Afficher le nom du vin plutôt que son identifiant dans Mon carnet.
- [x] Retirer les liens vers Mes vins et Mes listes s’ils sont reportés.

### Correctifs techniques complétés

- [x] Remplacer l’adaptateur Prisma Neon par l’adaptateur PostgreSQL.
- [x] Réactiver et reconnecter la base Supabase.
- [x] Créer la table `wine_journal`.
- [x] Vérifier l’ajout et la modification d’une entrée dans le carnet.

## Lot 7 — SEO et qualité globale

- [x] Ajouter `app/sitemap.ts`.
- [x] Ajouter `app/robots.ts`.
- [ ] Ajouter les métadonnées aux pages principales.
- [ ] Corriger l’import déprécié de `@sanity/image-url`.
- [ ] Effectuer le test responsive mobile et tablette après la refonte.
- [ ] Effectuer un audit Lighthouse après la refonte.
- [ ] Installer les clés Clerk de production avant le déploiement.

### Déjà complété

- [x] Corriger les descriptions SEO globales dans `app/layout.tsx`.
- [x] Configurer le titre global, Open Graph et l’URL de base.
