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
  tagsJson,
  publishedAt,
  _createdAt
}`;

export const guidesQuery = `*[_type == "guide" && published == true] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
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
  publishedAt,
  _createdAt
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
  logo,
  photo,
  country->{name, "slug": slug.current},
  region->{name, "slug": slug.current}
}`;

export const producerBySlugQuery = `*[_type == "producer" && slug.current == $slug && published == true][0] {
  _id,
  name,
  "slug": slug.current,
  logo,
  photo,
  bio,
  country->{name, "slug": slug.current},
  region->{name, "slug": slug.current},
  vineyard->{_id, name, "slug": slug.current, coverImage},
  website,
  instagram,
  facebook,
  wines[]->{_id, name, "slug": slug.current, vintage, color, bottleImage},
  articles[]->{_id, title, "slug": slug.current, excerpt, coverImage}
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
  tastingNotes
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
  "regions": *[_type == "region" && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description
  },
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
  country->{name, "slug": slug.current}
}`;

export const regionBySlugQuery = `*[_type == "region" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  country->{name, "slug": slug.current},
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
  description,
  color
}`;

export const grapeBySlugQuery = `*[_type == "grape" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  color,
  "appellations": *[_type == "appellation" && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    country->{name, "slug": slug.current},
    region->{name, "slug": slug.current}
  },
  "wines": *[_type == "wine" && published == true && references(^._id)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    vintage,
    color,
    bottleImage,
    producer->{name, "slug": slug.current}
  }
}`;
