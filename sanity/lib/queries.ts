export const articlesQuery = `*[_type == "article" && published == true] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  coverImage,
  author,
  publishedAt,
  _createdAt
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug && published == true][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  coverImage,
  author,
  tags,
  tagsJson,
  publishedAt,
  _createdAt,
  relatedWines[]->{
    _id,
    name,
    "slug": slug.current,
    vintage,
    color,
    bottleImage,
    approxPrice,
    oneLiner,
    producer->{
      _id,
      name,
      "slug": slug.current
    }
  }
}`;

export const guidesQuery = `*[_type == "guide" && published == true] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  guideType,
  difficulty,
  estimatedReadingTime,
  publishedAt,
  _createdAt
}`;

export const guideBySlugQuery = `*[_type == "guide" && slug.current == $slug && published == true][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  coverImage,
  guideType,
  difficulty,
  estimatedReadingTime,
  publishedAt,
  _createdAt,
  relatedCountries[]->{_id, name, "slug": slug.current},
  relatedRegions[]->{_id, name, "slug": slug.current},
  relatedAppellations[]->{_id, name, "slug": slug.current},
  relatedGrapes[]->{_id, name, "slug": slug.current},
  relatedWines[]->{_id, name, "slug": slug.current, vintage, color, bottleImage},
  relatedProducers[]->{_id, name, "slug": slug.current, logo, photo},
  relatedPlaces[]->{_id, name, "slug": slug.current, type, city, coverImage}
}`;

export const vineyardsQuery = `*[_type == "vineyard" && published == true] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  excerpt,
  city,
  province,
  coverImage,
  hasRestaurant,
  hasAccommodation,
  hasTerrace,
  hasShop,
  hasGuidedTour,
  hasTasting
}`;

export const vineyardBySlugQuery = `*[_type == "vineyard" && slug.current == $slug && published == true][0] {
  _id,
  name,
  "slug": slug.current,
  logo,
  coverImage,
  gallery,
  excerpt,
  description,
  address,
  city,
  province,
  country->{name, "slug": slug.current},
  latitude,
  longitude,
  phone,
  email,
  website,
  instagram,
  facebook,
  bookingUrl,
  hasRestaurant,
  hasAccommodation,
  hasTerrace,
  hasShop,
  hasGuidedTour,
  hasTasting,
  allowsPets,
  openingHours,
  averagePrice,
  producers[]->{_id, name, "slug": slug.current, logo},
  wines[]->{_id, name, "slug": slug.current, vintage, color, bottleImage},
  articles[]->{_id, title, "slug": slug.current, excerpt, coverImage}
}`;

export const producersQuery = `*[_type == "producer" && published == true] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  municipality,
  logo,
  photo,
  heroImage,
  oneLiner,
  shortBio,
  country->{name, "slug": slug.current},
  region->{name, "slug": slug.current}
}`;

export const producerBySlugQuery = `*[_type == "producer" && slug.current == $slug && published == true][0] {
  _id,
  name,
  "slug": slug.current,

  municipality,
  country->{name, "slug": slug.current},
  region->{name, "slug": slug.current},
  appellation->{name, "slug": slug.current},

  logo,
  photo,
  heroImage,

  oneLiner,
  shortBio,
  bio,

  approach[]{
    _key,
    title,
    text
  },

  signatureGrapes[]->{
    _id,
    name,
    "slug": slug.current
  },

  whyWeFollow,

  openToVisitors,
  visitDetails,
  address,
  reservationRequired,
  website,

  foundedYear,
  founder,
  currentOwner,
  winemaker,
  philosophy,
  farmingPractices,
  certifications,
  signatureStyles,
  instagram,
  facebook,
  email,
  phone,

  "wines": *[
    _type == "wine" &&
    published == true &&
    references(^._id)
  ] | order(vintage desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    vintage,
    color,
    bottleImage,
    approxPrice
  },

  articles[]->{_id, title, "slug": slug.current, excerpt, coverImage},
  guides[]->{_id, title, "slug": slug.current, excerpt, coverImage}
}`;

export const winesQuery = `*[_type == "wine" && published == true] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  vintage,
  color,
  style,
  bottleImage,
  producer->{name, "slug": slug.current},
  vineyard->{name, "slug": slug.current},
  country->{name, "slug": slug.current},
  region->{name, "slug": slug.current},
  appellation->{name, "slug": slug.current}
}`;

export const wineBySlugQuery = `*[_type == "wine" && slug.current == $slug && published == true][0] {
  _id,
  name,
  "slug": slug.current,
  vintage,
  color,
  style,
  bottleImage,
  labelImage,
  producer->{_id, name, "slug": slug.current, logo},
  vineyard->{_id, name, "slug": slug.current, coverImage},
  country->{name, "slug": slug.current},
  region->{name, "slug": slug.current},
  appellation->{name, "slug": slug.current},
  grapes[]->{name, "slug": slug.current},
  saqPrice,
  domainPrice,
  availableAtSaq,
  availableAtDomain,
  servingTemperature,
  cellaringPotential,
  alcohol,
  sugar,
  acidity,
  body,
  tannins,
  isOrganic,
  isNatural,
  isBiodynamic,
  isVegan,
  foodPairings[]->{_id, name, "slug": slug.current, category, image},
  articles[]->{_id, title, "slug": slug.current, excerpt, coverImage},
  tastingNotes,

  approxPrice,
  purchaseChannel,
  purchaseChannelDetails,
  purchaseUrl,
  purchaseLastChecked,

  oneLiner,
  tastingKeywords,
  perfectFor,
  whyWeRecommend,

  sweetness,
  roundness,
  decant,

  certifications,
  aromas,
  flavors,
  texture,
  finish,
  intensity,
  complexity,
  oakInfluence,
  aging,
  soil,
  harvestMethod,
  bottleSize,
  sku,
  editorialNote,
  occasionTags,
  experienceLevel
}`;

export const placesQuery = `*[_type == "place" && published == true] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  type,
  city,
  region,
  coverImage
}`;

export const placeBySlugQuery = `*[_type == "place" && slug.current == $slug && published == true][0] {
  _id,
  name,
  "slug": slug.current,
  type,
  city,
  region,
  address,
  website,
  description,
  coverImage
}`;

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug && published == true][0] {
  _id,
  title,
  "slug": slug.current,
  pageType,
  heroTitle,
  heroText,
  coverImage,
  content,
  seoTitle,
  seoDescription
}`;

export const homeSettingsQuery = `*[_type == "siteSettings"][0] {
  heroEyebrow,
  heroTitle,
  heroText,
  primaryButtonLabel,
  primaryButtonHref,
  secondaryButtonLabel,
  secondaryButtonHref,
  introTitle,
  introText
}`;

import { client } from "@/sanity/lib/client";

export async function getArticles() {
  return client.fetch(articlesQuery);
}

export async function getArticle(slug: string) {
  return client.fetch(articleBySlugQuery, { slug });
}

export async function getRelatedArticles(category?: string, currentId?: string) {
  if (!category || !currentId) {
    return client.fetch(
      `*[_type == "article" && published == true][0...3] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        category,
        coverImage,
        publishedAt,
        _createdAt
      }`
    );
  }

  return client.fetch(
    `*[_type == "article" && published == true && category == $category && _id != $currentId][0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      coverImage,
      publishedAt,
      _createdAt
    }`,
    { category, currentId }
  );
}


export const countriesQuery = `*[_type == "country"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description
}`;

export const countryBySlugQuery = `*[_type == "country" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  "regionCount": count(*[_type == "region" && references(^._id)]),
  "appellationCount": count(*[_type == "appellation" && references(^._id)]),
  "producerCount": count(*[_type == "producer" && published == true && references(^._id)]),
  "vineyardCount": count(*[_type == "vineyard" && published == true && references(^._id)]),
  "wineCount": count(*[_type == "wine" && published == true && references(^._id)]),
  "regions": *[_type == "region" && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description
  },
  "appellationCount": count(*[_type == "appellation" && references(^._id)]),
  "producerCount": count(*[_type == "producer" && published == true && references(^._id)]),
  "vineyardCount": count(*[_type == "vineyard" && published == true && references(^._id)]),
  "wineCount": count(*[_type == "wine" && published == true && references(^._id)]),
  "appellations": *[_type == "appellation" && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  },
  "producers": *[_type == "producer" && published == true && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    logo
  },
  "vineyards": *[_type == "vineyard" && published == true && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    city,
    province,
    coverImage
  },
  "wines": *[_type == "wine" && published == true && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    vintage,
    color,
    bottleImage
  }
}`;

export const regionsQuery = `*[_type == "region"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  heroImage,
  country->{name, "slug": slug.current}
}`;

export const regionBySlugQuery = `*[_type == "region" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,

  country->{name, "slug": slug.current},
  parentRegion->{name, "slug": slug.current},

  heroImage,

  introduction,
  locationText,

  latitude,
  longitude,
  mapZoom,

  mapPolygon[]{
    _key,
    latitude,
    longitude
  },

  climate,

  signatureGrapes[]->{
    _id,
    name,
    "slug": slug.current
  },

  characteristics[]{
    _key,
    title,
    text
  },

  guides[]->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage
  },

  description,
  overview,
  soilTypes,
  mainWineStyles,

  "appellations": *[
    _type == "appellation" &&
    references(^._id)
  ] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  },

  "producers": *[
    _type == "producer" &&
    published == true &&
    region._ref == ^._id
  ] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    municipality,
    oneLiner,
    logo,
    photo,
    heroImage
  },

  "vineyards": *[
    _type == "vineyard" &&
    published == true &&
    references(^._id)
  ] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    city,
    province,
    coverImage
  },

  "wines": *[
    _type == "wine" &&
    published == true &&
    region._ref == ^._id
  ] | order(vintage desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    vintage,
    color,
    bottleImage,
    approxPrice,
    producer->{
      name,
      "slug": slug.current
    }
  }
}`;

export const appellationsQuery = `*[_type == "appellation"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  country->{name, "slug": slug.current},
  region->{name, "slug": slug.current},
  grapes[]->{name, "slug": slug.current}
}`;

export const appellationBySlugQuery = `*[_type == "appellation" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  country->{name, "slug": slug.current},
  region->{name, "slug": slug.current},
  grapes[]->{name, "slug": slug.current},
  "wines": *[_type == "wine" && published == true && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    vintage,
    color,
    bottleImage,
    producer->{name, "slug": slug.current}
  },
  "producers": *[_type == "producer" && published == true && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    logo
  }
}`;

export const grapesQuery = `*[_type == "grape"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  color,
  heroImage,
  oneLiner,
  body,
  acidity,
  tannins
}`;

export const grapeBySlugQuery = `*[_type == "grape" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  color,
  heroImage,
  oneLiner,
  aromas,
  body,
  acidity,
  tannins,
  servingTemperature,
  simplePairings,
  mainRegions[]->{
    _id,
    name,
    "slug": slug.current,
    heroImage,
    country->{name, "slug": slug.current}
  },
  tryNext[]{
    _key,
    reason,
    grape->{
      _id,
      name,
      "slug": slug.current,
      color,
      heroImage,
      oneLiner
    }
  },
  "wines": *[
    _type == "wine" &&
    published == true &&
    references(^._id)
  ] | order(vintage desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    vintage,
    color,
    bottleImage,
    approxPrice,
    producer->{name, "slug": slug.current}
  },
  seoTitle,
  seoDescription,
  published
}`;
