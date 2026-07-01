# Wine Journal

Chaque utilisateur possède un seul carnet.

Chaque bouteille peut exister une seule fois dans le carnet.

## Structure

user_id

wine_id

favorite (bool)

tasted (bool)

buy_again (bool)

gift (bool)

avoid (bool)

rating (0 à 5)

note (texte)

tasted_at (date)

location (texte)

created_at

updated_at

---

## Exemples

Laurie

Bouteille :
Coteau Rougemont Versant Rouge

❤️ Favori

🍷 Goûté

⭐ 4.5

📝 Excellent avec un tartare de bœuf.

📍 Rougemont

📅 2026-08-14

---

## Calculs

Le carnet permet automatiquement :

- nombre de bouteilles goûtées

- favoris

- bouteilles à racheter

- bouteilles à offrir

- moyenne des notes

- cépages favoris

- pays favoris

- régions favorites

- couleurs favorites

- prix moyen

- dernières dégustations

---

## Philosophie

Le carnet n'est PAS un inventaire.

Le carnet est la mémoire des bouteilles qui ont marqué l'utilisateur.

