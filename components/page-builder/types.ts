export type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

export type BuilderCard = {
  eyebrow?: string;
  title?: string;
  description?: string;
  href?: string;
  tone?: "cream" | "olive" | "wine" | "photo";
};

export type BuilderWine = {
  _id: string;
  name?: string;
  vintage?: number;
  slug?: string;
  color?: string;
  producer?: { name?: string };
  region?: { name?: string };
  bottleImage?: SanityImage;
};

export type BuilderProducer = {
  _id: string;
  name?: string;
  slug?: string;
  shortBio?: string;
  region?: { name?: string };
  country?: { name?: string };
  photo?: SanityImage;
  heroImage?: SanityImage;
};

export type PageSection = {
  _key?: string;
  sectionType?:
    | "hero"
    | "imageMosaic"
    | "editorialGrid"
    | "quote"
    | "feature"
    | "sommelierCta"
    | "featuredWines"
    | "featuredProducers";
  eyebrow?: string;
  title?: string;
  description?: string;
  href?: string;
  buttonLabel?: string;
  tone?: "light" | "olive" | "wine" | "ink";
  image?: SanityImage;
  secondaryImage?: SanityImage;
  thirdImage?: SanityImage;
  editorialAsset?: {
    title?: string;
    alt?: string;
    image?: SanityImage;
  };
  cards?: BuilderCard[];
  wines?: BuilderWine[];
  producers?: BuilderProducer[];
};
