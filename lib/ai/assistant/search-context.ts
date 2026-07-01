import type { SearchResult } from "@/types/search";
import { buildSearchHref, getSearchTypeLabel } from "@/lib/search/search-utils";
import type { AssistantContext, AssistantSource } from "@/lib/ai/assistant/assistant.types";

function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

function normalizeSource(item: SearchResult): AssistantSource {
  return {
    id: item._id,
    type: item._type,
    typeLabel: getSearchTypeLabel(item._type),
    title: item.title,
    href: buildSearchHref(item),
  };
}

function groupSourcesByType(sources: AssistantSource[]) {
  return sources.reduce<Record<string, AssistantSource[]>>((acc, source) => {
    const key = source.typeLabel;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(source);

    return acc;
  }, {});
}

function buildContextText(sources: AssistantSource[]) {
  if (sources.length === 0) {
    return "Aucun résultat pertinent n'a été trouvé dans les données du site.";
  }

  const groupedSources = groupSourcesByType(sources);

  return Object.entries(groupedSources)
    .map(([typeLabel, items]) => {
      const lines = items
        .map((item, index) => {
          return `${index + 1}. ${item.title} — ${item.href}`;
        })
        .join("\n");

      return `${typeLabel.toUpperCase()}\n${lines}`;
    })
    .join("\n\n---\n\n");
}

export async function getAssistantSearchContext(
  query: string
): Promise<AssistantContext> {
  if (query.trim().length < 2) {
    return {
      query,
      sources: [],
      contextText: "La question est trop courte pour générer un contexte fiable.",
    };
  }

  const response = await fetch(
    `${getBaseUrl()}/api/search?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Assistant search context failed");
  }

  const rawResults = (await response.json()) as SearchResult[];

  const sources = rawResults.slice(0, 10).map(normalizeSource);

  return {
    query,
    sources,
    contextText: buildContextText(sources),
  };
}
