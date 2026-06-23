# Database Model — Le Premier Verre

## 1. Core Principles

The database must support:

- wine discovery;
- personal tasting notes;
- cellar tracking;
- AI recommendations;
- social sharing;
- future commerce or affiliate integrations.

The model should remain flexible enough to support both casual users and advanced wine lovers.

---

## 2. Main Entities

### User

Represents an application user.

Fields:

- id
- email
- name
- username
- avatarUrl
- preferredLanguage
- createdAt
- updatedAt

Relationships:

- has many tasting notes
- has many cellar items
- has many collections
- has many ratings

---

### Wine

Represents a wine bottle or cuvée.

Fields:

- id
- name
- vintage
- type
- color
- country
- region
- appellation
- grapeVarieties
- producerId
- description
- imageUrl
- createdAt
- updatedAt

Relationships:

- belongs to one producer
- has many tasting notes
- has many ratings
- has many cellar items

---

### Producer

Represents a winery, estate, or wine producer.

Fields:

- id
- name
- country
- region
- website
- description
- imageUrl
- createdAt
- updatedAt

Relationships:

- has many wines

---

### TastingNote

Represents a user's tasting experience.

Fields:

- id
- userId
- wineId
- rating
- appearance
- nose
- palate
- finish
- overallImpression
- tastingDate
- location
- isPublic
- createdAt
- updatedAt

Relationships:

- belongs to one user
- belongs to one wine

---

### CellarItem

Represents a bottle owned by a user.

Fields:

- id
- userId
- wineId
- quantity
- purchasePrice
- purchaseDate
- purchaseLocation
- storageLocation
- drinkFrom
- drinkUntil
- notes
- createdAt
- updatedAt

Relationships:

- belongs to one user
- belongs to one wine

---

### Collection

Represents a user-created list of wines.

Fields:

- id
- userId
- title
- description
- isPublic
- createdAt
- updatedAt

Relationships:

- belongs to one user
- has many wines through CollectionWine

---

### CollectionWine

Join table between Collection and Wine.

Fields:

- id
- collectionId
- wineId
- position
- createdAt

---

### Rating

Represents a simplified wine rating.

Fields:

- id
- userId
- wineId
- score
- createdAt
- updatedAt

Relationships:

- belongs to one user
- belongs to one wine

---

### Photo

Represents images uploaded by users.

Fields:

- id
- userId
- wineId
- tastingNoteId
- url
- caption
- createdAt

Relationships:

- belongs to one user
- optionally belongs to one wine
- optionally belongs to one tasting note

---

### Friendship

Represents user-to-user connections.

Fields:

- id
- requesterId
- receiverId
- status
- createdAt
- updatedAt

Statuses:

- pending
- accepted
- rejected
- blocked

---

### AIRecommendation

Stores AI-generated recommendations.

Fields:

- id
- userId
- input
- output
- context
- createdAt

Relationships:

- belongs to one user

---

## 3. Suggested Enums

### WineType

- STILL
- SPARKLING
- FORTIFIED
- DESSERT

### WineColor

- RED
- WHITE
- ROSE
- ORANGE

### PreferredLanguage

- FR
- EN

### FriendshipStatus

- PENDING
- ACCEPTED
- REJECTED
- BLOCKED

---

## 4. MVP Database Scope

For the first version, the minimum required models are:

- User
- Wine
- Producer
- TastingNote
- CellarItem
- Rating

The following can be added later:

- Collection
- CollectionWine
- Photo
- Friendship
- AIRecommendation

---

## 5. Future Considerations

The database should eventually support:

- barcode scanning;
- label recognition;
- food pairing recommendations;
- wine price tracking;
- merchant integrations;
- cellar value estimation;
- public profiles;
- expert reviews;
- AI sommelier conversations.
