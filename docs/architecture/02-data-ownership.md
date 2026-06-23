# Data Ownership — Le Premier Verre

## Principle

Each system has a clear role.

No duplicated source of truth.

---

## GitHub

Source of truth for:

- code
- architecture documentation
- technical decisions
- database schema
- infrastructure configuration

---

## Sanity

Source of truth for editable content:

- articles
- guides
- editorial pages
- vineyards
- producers
- good addresses
- legal/professional service pages
- homepage sections
- site settings
- visual editing content

---

## Supabase / PostgreSQL

Source of truth for application data:

- users
- cellar bottles
- favorites
- tasting notes
- wishlist
- user preferences
- AI history
- subscriptions metadata

---

## Clerk

Source of truth for authentication:

- login
- signup
- sessions
- identity provider
- user authentication state

---

## Stripe

Source of truth for payments:

- subscriptions
- invoices
- payment status
- premium plans

---

## Notion

Source of truth for operations:

- roadmap
- sprint planning
- content calendar
- launch plan
- marketing ideas
- bugs
- tasks
- strategic notes

---

## OpenAI

Execution layer for:

- wine recommendations
- OCR interpretation
- sommelier assistant
- tasting note generation
- food pairing suggestions

---

## Rule

If a piece of data belongs to the public editorial website, it goes in Sanity.

If it belongs to a logged-in user, it goes in Supabase.

If it belongs to business planning, it goes in Notion.

If it belongs to the application structure, it goes in GitHub.
