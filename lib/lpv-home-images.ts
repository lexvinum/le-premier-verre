export type LpvImageGroup =
  | "hero"
  | "moments"
  | "collections"
  | "editorial"
  | "producers"
  | "food"
  | "bottles"
  | "vineyards"
  | "newsletter"
  | "textures";

export type LpvImage = {
  src: string;
  alt: string;
};

export const LPV_HOME_IMAGES: Record<LpvImageGroup, LpvImage[]> = {
  "hero": [
    {
      "src": "/images/lpv/hero/hero.jpg",
      "alt": "hero"
    }
  ],
  "moments": [
    {
      "src": "/images/lpv/moments/moment.jpg",
      "alt": "moments"
    }
  ],
  "collections": [
    {
      "src": "/images/lpv/collections/collection.jpg",
      "alt": "collections"
    }
  ],
  "editorial": [],
  "producers": [],
  "food": [],
  "bottles": [
    {
      "src": "/images/lpv/bottles/bottle.jpg",
      "alt": "bottles"
    }
  ],
  "vineyards": [],
  "newsletter": [
    {
      "src": "/images/lpv/newsletter/newsletter.jpg",
      "alt": "newsletter"
    }
  ],
  "textures": []
};
