# Stripe Premium — Setup

## Variables à ajouter dans `.env.local`

STRIPE_SECRET_KEY=
STRIPE_PREMIUM_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000

## Supabase

Exécuter :

supabase/sql/002_create_memberships.sql

## Stripe

Créer un produit :
Le Premier Verre Premium

Prix recommandé :
9.99 CAD / mois

Copier le Price ID dans :

STRIPE_PREMIUM_PRICE_ID

## Webhook local

Événements utiles :
- checkout.session.completed
- customer.subscription.updated
- customer.subscription.deleted

Endpoint :
/api/stripe/webhook
