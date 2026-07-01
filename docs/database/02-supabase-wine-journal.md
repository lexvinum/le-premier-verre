# Supabase — Wine Journal

Le fichier SQL à exécuter dans Supabase est :

supabase/sql/001_create_wine_journal.sql

## À faire dans Supabase

1. Ouvrir Supabase.
2. Aller dans SQL Editor.
3. Coller le contenu de supabase/sql/001_create_wine_journal.sql.
4. Cliquer Run.
5. Vérifier que la table public.wine_journal existe.

## Ce que la table permet

- une entrée unique par utilisateur + vin;
- favoris;
- goûté;
- à racheter;
- à offrir;
- à éviter;
- note sur 5;
- note personnelle;
- lieu;
- date de dégustation.

## Sécurité

La table utilise Row Level Security.

Chaque utilisateur peut seulement voir, créer, modifier et supprimer ses propres entrées.
