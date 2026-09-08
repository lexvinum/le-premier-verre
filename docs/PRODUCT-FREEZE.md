# Le Premier Verre — Product Freeze

Objectif : valider le produit avant la refonte visuelle.

Légende :
- ⬜ Non commencé
- 🟡 À améliorer
- 🟢 Validé (gelé)
- 🔴 À refaire
- ⚪ Reporté

| # | Élément | Statut | Actions restantes |
|---|---------|--------|-------------------|
| 1 | Accueil | 🟢 | Structure gelée avant refonte visuelle |
| 2 | Répertoire | 🟡 | Ajouter recherche + filtres Couleur / Pays / Région; archiver `/repertoire` |
| 3 | Fiche vin | 🟡 | Retirer « Ajouter à ma cave »; ajouter Favoris; compléter les données essentielles; rendre le producteur cliquable |
| 4 | Producteurs | 🟡 | Utiliser les vraies images Sanity; ajouter un état vide; retirer le libellé fixe « Domaine » |
| 5 | Fiche producteur | 🟡 | Retirer le lien vers Vignobles; ajouter image et résumé; afficher philosophie/pratiques si disponibles; prévoir un état minimal quand le contenu manque; Publier un producteur test pour vérifier la fiche; retirer le lien Vignobles; ajouter image et contenu minimal |
| 6 | Bonnes adresses | 🟡 | Ajouter les images Sanity, un état vide et un court résumé; filtre par type seulement si utile |
| 7 | Fiche bonne adresse | 🟡 | Ajouter l’image, les coordonnées pratiques disponibles et un état minimal si la description manque |
|| 8 | Guides | 🟡 | Ajouter les images Sanity, un état vide et, si disponible, la catégorie ou la date |
| 9 | Fiche guide | 🟡 | Ajouter l’image principale et les métadonnées utiles; prévoir un rendu minimal si le contenu manque |
| 10 | Blogue | 🟡 | Remplacer les articles codés en dur par les articles Sanity |
| 11 | Fiche article | 🟢 | Aucune |
| 12 | Ce soir | 🟡 | Retirer les dépendances au Sommelier IA; transformer les cartes en raccourcis vers Guides, Vins et Producteurs |
| 13 | Recherche | 🟡 | Conserver la fenêtre globale; rediriger `/recherche`; remplacer les liens Vignobles par Producteurs |
| 14 | Favoris | 🟡 | Remplacer `/repertoire` par `/vins`; migrer Prisma → Sanity; supprimer l'ancien hook `useFavorites`; retirer les références « Lex Vinum » |
| 15 | Mon carnet | 🟢 | Remplacer le lien Sommelier; afficher le nom des vins; harmoniser les routes d'authentification |
| 16 | Connexion / inscription | 🟢 | Harmoniser tous les anciens liens `/sign-in` et `/sign-up`; définir les redirections Clerk |
|17 | Header | 🟢 | Aucune |
|18 | Footer | 🟢 | Aucune |
| 17 | Responsive | 🟡 | Effectuer le test visuel mobile/tablette des pages principales et consigner uniquement les problèmes bloquants; Smoke test réussi; validation visuelle mobile/tablette encore requise | 
| 18 | SEO | 🟡 | Mettre à jour les descriptions globales; ajouter sitemap.ts et robots.ts; ajouter des métadonnées aux pages principales |
| 19 | Performance | 🟢 | Build réussi; premiers chargements lents uniquement en développement; validation Lighthouse à faire avant lancement |