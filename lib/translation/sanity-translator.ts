import { createHash } from "crypto";
import { generateText } from "ai";
import { openai } from "@/lib/ai/client";

export const TRANSLATABLE_TYPES = [
  "wine",
  "food",
  "producer",
  "region",
  "country",
  "appellation",
  "grape",
  "place",
  "article",
  "guide",
] as const;

export type TranslatableType = (typeof TRANSLATABLE_TYPES)[number];

type SanityDocument = Record<string, any>;

const SIMPLE_FIELDS: Record<TranslatableType, Array<[string, string]>> = {
  wine: [
    ["oneLiner", "oneLinerEn"],
    ["tastingKeywords", "tastingKeywordsEn"],
    ["perfectFor", "perfectForEn"],
    ["purchaseChannelDetails", "purchaseChannelDetailsEn"],
    ["seoTitle", "seoTitleEn"],
    ["seoDescription", "seoDescriptionEn"],
  ],

  food: [
    ["name", "nameEn"],
    ["oneLiner", "oneLinerEn"],
    ["description", "descriptionEn"],
    ["lpvAdvice", "lpvAdviceEn"],
    ["wineStyles", "wineStylesEn"],
    ["avoid", "avoidEn"],
    ["servingTip", "servingTipEn"],
    ["seoTitle", "seoTitleEn"],
    ["seoDescription", "seoDescriptionEn"],
  ],

  producer: [
    ["oneLiner", "oneLinerEn"],
    ["shortBio", "shortBioEn"],
    ["whyWeFollow", "whyWeFollowEn"],
    ["visitDetails", "visitDetailsEn"],
    ["seoTitle", "seoTitleEn"],
    ["seoDescription", "seoDescriptionEn"],
  ],

  region: [
    ["name", "nameEn"],
    ["introduction", "introductionEn"],
    ["locationText", "locationTextEn"],
    ["climate", "climateEn"],
    ["description", "descriptionEn"],
    ["soilTypes", "soilTypesEn"],
    ["mainWineStyles", "mainWineStylesEn"],
    ["seoTitle", "seoTitleEn"],
    ["seoDescription", "seoDescriptionEn"],
  ],

  country: [
    ["name", "nameEn"],
    ["description", "descriptionEn"],
    ["climate", "climateEn"],
    ["wineSurface", "wineSurfaceEn"],
    ["annualProduction", "annualProductionEn"],
    ["mainWineStyles", "mainWineStylesEn"],
    ["seoTitle", "seoTitleEn"],
    ["seoDescription", "seoDescriptionEn"],
  ],

  appellation: [
    ["climate", "climateEn"],
    ["soilTypes", "soilTypesEn"],
    ["authorizedWineStyles", "authorizedWineStylesEn"],
    ["foodPairingNotes", "foodPairingNotesEn"],
    ["seoTitle", "seoTitleEn"],
    ["seoDescription", "seoDescriptionEn"],
  ],

  grape: [
    ["oneLiner", "oneLinerEn"],
    ["aromas", "aromasEn"],
    ["simplePairings", "simplePairingsEn"],
    ["description", "descriptionEn"],
    ["flavors", "flavorsEn"],
    ["agingPotential", "agingPotentialEn"],
    ["seoTitle", "seoTitleEn"],
    ["seoDescription", "seoDescriptionEn"],
  ],

  place: [
    ["highlights", "highlightsEn"],
  ],

  article: [
    ["title", "titleEn"],
    ["excerpt", "excerptEn"],
    ["category", "categoryEn"],
    ["tags", "tagsEn"],
    ["seoTitle", "seoTitleEn"],
    ["seoDescription", "seoDescriptionEn"],
  ],

  guide: [
    ["title", "titleEn"],
    ["excerpt", "excerptEn"],
    ["estimatedReadingTime", "estimatedReadingTimeEn"],
    ["seoTitle", "seoTitleEn"],
    ["seoDescription", "seoDescriptionEn"],
  ],
};

const SPECIAL_SOURCE_FIELDS: Record<TranslatableType, string[]> = {
  wine: ["tastingNotes", "editorialNote"],
  food: [],
  producer: ["bio", "approach"],
  region: ["characteristics", "overview"],
  country: ["wineHistory"],
  appellation: ["productionRules"],
  grape: ["history", "tryNext"],
  place: ["description"],
  article: ["content"],
  guide: ["content"],
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function hasValue(value: any) {
  if (value === undefined || value === null || value === "") return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function extractPortableText(value: any): any {
  if (!Array.isArray(value)) return value;

  return value.map((item) => {
    if (!item || typeof item !== "object") return item;

    if (item._type !== "block") {
      // Les cartes/références intégrées sont structurelles, pas traduites.
      return {
        _key: item._key,
        _type: item._type,
      };
    }

    return {
      _key: item._key,
      _type: item._type,
      style: item.style,
      listItem: item.listItem,
      level: item.level,
      children: Array.isArray(item.children)
        ? item.children.map((child: any) => ({
            _key: child._key,
            _type: child._type,
            text: child.text,
            marks: child.marks,
          }))
        : [],
      markDefs: item.markDefs,
    };
  });
}

function sourcePayload(document: SanityDocument, type: TranslatableType) {
  const payload: Record<string, any> = {};

  for (const [source] of SIMPLE_FIELDS[type]) {
    if (hasValue(document[source])) {
      payload[source] = document[source];
    }
  }

  for (const field of SPECIAL_SOURCE_FIELDS[type]) {
    const value = document[field];

    if (!hasValue(value)) continue;

    if (
      field === "bio" ||
      field === "overview" ||
      field === "history" ||
      field === "wineHistory" ||
      field === "productionRules" ||
      field === "description" ||
      field === "content" ||
      field === "editorialNote"
    ) {
      payload[field] = extractPortableText(value);
    } else {
      payload[field] = value;
    }
  }

  return payload;
}

export function computeTranslationSourceHash(
  document: SanityDocument,
  type: TranslatableType
) {
  return createHash("sha256")
    .update(JSON.stringify(sourcePayload(document, type)))
    .digest("hex");
}

function rebuildPortableText(source: any, translated: any) {
  if (!Array.isArray(source) || !Array.isArray(translated)) {
    return translated;
  }

  const translatedByKey = new Map(
    translated
      .filter((item: any) => item?._key)
      .map((item: any) => [item._key, item])
  );

  return source.map((sourceItem: any) => {
    if (sourceItem?._type !== "block") {
      // Conserver intégralement cartes, références et objets embarqués.
      return clone(sourceItem);
    }

    const translatedItem: any = translatedByKey.get(sourceItem._key);

    if (!translatedItem) return clone(sourceItem);

    const translatedChildren = new Map(
      Array.isArray(translatedItem.children)
        ? translatedItem.children
            .filter((child: any) => child?._key)
            .map((child: any) => [child._key, child])
        : []
    );

    return {
      ...clone(sourceItem),
      children: Array.isArray(sourceItem.children)
        ? sourceItem.children.map((sourceChild: any) => {
            const translatedChild: any = translatedChildren.get(
              sourceChild._key
            );

            return translatedChild?.text !== undefined
              ? {
                  ...clone(sourceChild),
                  text: translatedChild.text,
                }
              : clone(sourceChild);
          })
        : sourceItem.children,
    };
  });
}

function rebuildObjectArray(
  source: any[],
  translated: any[],
  translatedFields: string[]
) {
  if (!Array.isArray(source) || !Array.isArray(translated)) {
    return translated;
  }

  const byKey = new Map(
    translated
      .filter((item: any) => item?._key)
      .map((item: any) => [item._key, item])
  );

  return source.map((sourceItem) => {
    const translatedItem: any = byKey.get(sourceItem?._key);

    if (!translatedItem) return clone(sourceItem);

    const result = clone(sourceItem);

    for (const field of translatedFields) {
      if (translatedItem[field] !== undefined) {
        result[field] = translatedItem[field];
      }
    }

    return result;
  });
}

function buildPatch(
  document: SanityDocument,
  type: TranslatableType,
  translated: Record<string, any>
) {
  const patch: Record<string, any> = {};

  for (const [source, target] of SIMPLE_FIELDS[type]) {
    if (
      hasValue(document[source]) &&
      translated[source] !== undefined
    ) {
      patch[target] = translated[source];
    }
  }

  if (type === "wine") {
    if (translated.tastingNotes !== undefined) {
      patch.tastingNotesEn = translated.tastingNotes;
    }

    if (translated.editorialNote !== undefined) {
      patch.editorialNoteEn = rebuildPortableText(
        document.editorialNote,
        translated.editorialNote
      );
    }
  }

  if (type === "producer") {
    if (translated.bio !== undefined) {
      patch.bioEn = rebuildPortableText(document.bio, translated.bio);
    }

    if (translated.approach !== undefined) {
      patch.approachEn = rebuildObjectArray(
        document.approach,
        translated.approach,
        ["title", "text"]
      );
    }
  }

  if (type === "region") {
    if (translated.characteristics !== undefined) {
      patch.characteristicsEn = rebuildObjectArray(
        document.characteristics,
        translated.characteristics,
        ["title", "text"]
      );
    }

    if (translated.overview !== undefined) {
      patch.overviewEn = rebuildPortableText(
        document.overview,
        translated.overview
      );
    }
  }

  if (type === "country" && translated.wineHistory !== undefined) {
    patch.wineHistoryEn = rebuildPortableText(
      document.wineHistory,
      translated.wineHistory
    );
  }

  if (type === "appellation" && translated.productionRules !== undefined) {
    patch.productionRulesEn = rebuildPortableText(
      document.productionRules,
      translated.productionRules
    );
  }

  if (type === "grape") {
    if (translated.history !== undefined) {
      patch.historyEn = rebuildPortableText(
        document.history,
        translated.history
      );
    }

    if (translated.tryNext !== undefined) {
      patch.tryNext = rebuildObjectArray(
        document.tryNext,
        translated.tryNext,
        ["reasonEn"]
      );
    }
  }

  if (type === "place" && translated.description !== undefined) {
    patch.descriptionEn = rebuildPortableText(
      document.description,
      translated.description
    );
  }

  if (type === "article" && translated.content !== undefined) {
    patch.contentEn = rebuildPortableText(
      document.content,
      translated.content
    );
  }

  if (type === "guide" && translated.content !== undefined) {
    patch.contentEn = rebuildPortableText(
      document.content,
      translated.content
    );
  }

  return patch;
}

export async function translateSanityDocument(
  document: SanityDocument,
  type: TranslatableType
) {
  const source = sourcePayload(document, type);

  if (Object.keys(source).length === 0) {
    return {};
  }

  const prompt = `
You are the English translator for Le Premier Verre, a Quebec wine discovery platform.

Translate the following French editorial content into natural Canadian English.

Editorial rules:
- Preserve the warm, precise, accessible editorial voice.
- Never make the tone corporate, promotional or generic.
- Keep wine terminology accurate.
- Preserve producer names, wine names, appellations, grape names and proper nouns unless they have a standard English form.
- "Cantons-de-l'Est" = "Eastern Townships".
- In Quebec usage: "déjeuner" = "breakfast", "dîner" = "lunch", "souper" = "dinner".
- Do not add facts.
- Do not remove facts.
- Preserve numbers, vintages, temperatures and units.
- Preserve JSON structure exactly.
- Preserve every _key and _type exactly.
- Preserve references, URLs, marks, markDefs and structural metadata exactly.
- For Portable Text, translate ONLY child.text values.
- For tryNext objects, keep all existing data and provide the English translation in reasonEn.
- Return ONLY valid JSON. No markdown and no explanation.

Document type: ${type}

French source:
${JSON.stringify(source)}
`.trim();

  const { text } = await generateText({
    model: openai("gpt-5-mini"),
    prompt,
  });

  let translated: Record<string, any>;

  try {
    translated = JSON.parse(
      text
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/, "")
        .replace(/\s*```$/, "")
    );
  } catch {
    throw new Error(
      `La traduction IA n'a pas retourné un JSON valide pour ${document._id}.`
    );
  }

  return buildPatch(document, type, translated);
}
