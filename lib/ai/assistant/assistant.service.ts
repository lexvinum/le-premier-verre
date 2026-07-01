import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { auth } from "@clerk/nextjs/server";
import { openai } from "@/lib/ai/client";
import { prisma } from "@/lib/prisma";
import { getJournal, getJournalStats } from "@/lib/journal";
import { SOMMELIER_SYSTEM_PROMPT } from "@/lib/ai/prompts/sommelier";
import { getAssistantSearchContext } from "@/lib/ai/assistant/search-context";

export function getLastUserMessage(messages: UIMessage[]) {
  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");

  if (!lastUserMessage) return "";

  return lastUserMessage.parts
    .map((part) => {
      if (part.type === "text") return part.text;
      return "";
    })
    .join(" ")
    .trim();
}

async function getSommelierUserContext() {
  const { userId } = await auth();

  if (!userId) {
    return "Utilisateur non connecté. Ne prétends pas connaître ses goûts personnels.";
  }

  const [entries, stats] = await Promise.all([
    getJournal(userId),
    getJournalStats(userId),
  ]);

  const slugs = entries.map((entry) => entry.wineId);

  const wines = slugs.length
    ? await prisma.wine.findMany({
        where: { slug: { in: slugs } },
        select: {
          slug: true,
          name: true,
          producer: true,
          country: true,
          region: true,
          color: true,
          vintage: true,
          price: true,
          grape: true,
        },
      })
    : [];

  const wineBySlug = new Map(wines.map((wine) => [wine.slug, wine]));

  const favorites = entries
    .filter((entry) => entry.favorite)
    .slice(0, 8)
    .map((entry) => {
      const wine = wineBySlug.get(entry.wineId);
      return `- ${wine?.name ?? entry.wineId}${wine?.producer ? ` — ${wine.producer}` : ""}${entry.rating ? ` (${entry.rating}/5)` : ""}`;
    });

  const tasted = entries
    .filter((entry) => entry.tasted)
    .slice(0, 8)
    .map((entry) => {
      const wine = wineBySlug.get(entry.wineId);
      return `- ${wine?.name ?? entry.wineId}${wine?.color ? ` — ${wine.color}` : ""}${wine?.region ? `, ${wine.region}` : ""}${entry.rating ? ` (${entry.rating}/5)` : ""}`;
    });

  return `
Utilisateur connecté.

STATISTIQUES DU CARNET :
- Total : ${stats.total}
- Favoris : ${stats.favorites}
- Goûtés : ${stats.tasted}
- À racheter : ${stats.buyAgain}
- À offrir : ${stats.gift}
- À éviter : ${stats.avoid}

FAVORIS RÉCENTS :
${favorites.length ? favorites.join("\n") : "- Aucun favori encore."}

DÉGUSTATIONS RÉCENTES :
${tasted.length ? tasted.join("\n") : "- Aucune dégustation encore."}

UTILISATION :
Utilise ces informations pour personnaliser la réponse, sans inventer de goûts.
Si le carnet est vide, invite doucement l’utilisateur à ajouter quelques bouteilles.
`.trim();
}


export async function createSommelierStream(messages: UIMessage[]) {
  const userQuery = getLastUserMessage(messages);

  if (!userQuery) {
    throw new Error("No user message found");
  }

  const [context, userContext] = await Promise.all([
    getAssistantSearchContext(userQuery),
    getSommelierUserContext(),
  ]);

  return streamText({
    model: openai("gpt-4.1-mini"),
    system: `
${SOMMELIER_SYSTEM_PROMPT}

QUESTION UTILISATEUR :
${context.query}

CONTEXTE STRUCTURÉ DU SITE :
${context.contextText}

CONTEXTE PERSONNEL DU CARNET :
${userContext}

SOURCES DISPONIBLES :
${context.sources
  .map((source, index) => {
    return `${index + 1}. [${source.title}](${source.href}) — ${source.typeLabel}`;
  })
  .join("\n")}

CONSIGNE FINALE :
Réponds avec les sources ci-dessus lorsque tu recommandes une fiche, un article ou une page du site.
Utilise aussi le contexte personnel du carnet pour personnaliser le ton et les suggestions.
Quand tu cites une source du site, utilise un lien Markdown cliquable.
Si aucune source pertinente n'est disponible, réponds prudemment et dis que le site ne contient pas encore assez d'information pour recommander une fiche précise.
    `.trim(),
    messages: await convertToModelMessages(messages),
    temperature: 0.35,
    maxRetries: 1,
  });
}
