# Le Premier Verre — Liste unique des bogues

Dernière mise à jour : 3 août 2026

## P0 — Bloquants

Problèmes empêchant une page ou une fonctionnalité de fonctionner.

| ID | Page | Problème | Reproduction | Statut |
|---|---|---|---|---|
| BUG-001 |  |  |  | À faire |

| ID | Page | Problème | Reproduction | Statut |
|---|---|---|---|---|
| BUG-001 | Favoris / Carnet | Certains utilisateurs non connectés sont redirigés vers `/sign-in`, mais la route officielle du site est `/connexion`. | Cliquer sur une action du carnet sans être connecté. | À corriger |

## P1 — Importants

Problèmes importants pour le lancement, sans bloquer complètement le site.

| ID | Page | Problème | Reproduction | Statut |
|---|---|---|---|---|
| BUG-101 |  |  |  | À faire |

| BUG-101 | `/premium` | Le bouton du scanner pointe vers `/scanner`, mais la route existante est `/scan`. | Ouvrir Premium et cliquer sur « Essayer le scanner ». | À faire |

| BUG-101 | `/recommandation` | La connexion PostgreSQL/Supabase échoue pendant le build : `tenant/user ... not found`. | Exécuter `npm run build` et observer la génération de `/recommandation`. | À vérifier |

| BUG-102 | `components/Sidebar.tsx` | Le lien « Ouvrir ma cave » pointe vers `/cellar`, mais aucune route `/cellar` n’existe. | Ouvrir l’ancienne sidebar et cliquer sur « Ouvrir ma cave ». | À vérifier |

| ID | Page | Problème | Reproduction | Statut |
|---|---|---|---|---|
| BUG-101 | `/recommandation` | Échec de connexion PostgreSQL/Supabase pendant le build. | Exécuter `npm run build`. | Reporté à janvier |
| BUG-102 | `/vins/[slug]` | Utilisation d’un type `any` dans une page publique du lancement. | Exécuter ESLint. | À corriger |
| BUG-103 | `WineHero` | Utilisation d’un type `any` dans le composant principal des fiches vin. | Exécuter ESLint. | À corriger |
| BUG-104 | Favoris | Le hook `useFavorites` initialise son état avec `setState` directement dans un effet. | Exécuter ESLint et tester les favoris. | À tester |
| BUG-105 | Images de vins | `SafeWineImage` réinitialise plusieurs états directement dans un effet. | Changer de fiche ou d’image de vin. | À tester |

## P2 — Expérience utilisateur

| BUG-201 | Global / Sanity | Utilisation de l’export par défaut déprécié de `@sanity/image-url`. | Exécuter `npm run build`. | À faire |

Problèmes visuels, responsive, accessibilité ou compréhension.

| ID | Page | Problème | Reproduction | Statut |
|---|---|---|---|---|
| BUG-201 |  |  |  | À faire |

## P3 — Plus tard

Améliorations non nécessaires au lancement d’octobre.

| ID | Page | Problème | Reproduction | Statut |
|---|---|---|---|---|
| BUG-301 |  |  |  | Plus tard |

## P3 — Plus tard

| ID | Page | Problème | Reproduction | Statut |
|---|---|---|---|---|
| BUG-301 | Scanner | Plusieurs types `any` dans l’API d’extraction. | Exécuter ESLint. | 2027 |
| BUG-302 | Stripe | Plusieurs types `any` dans le webhook. | Exécuter ESLint. | Novembre / janvier |
| BUG-303 | Panier | Initialisation du panier par `setState` dans un effet. | Ouvrir `/panier`. | Novembre |
| BUG-304 | Sommelier | Apostrophe non échappée dans `SommelierChat`. | Exécuter ESLint. | Janvier |
| BUG-305 | Ancienne Sidebar | Fermeture par `setState` dans un effet et lien `/cellar` invalide. | Monter l’ancienne sidebar. | Archiver |