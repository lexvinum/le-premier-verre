import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { auth } from "@clerk/nextjs/server";
import { openai } from "@/lib/ai/client";
import { SOMMELIER_SYSTEM_PROMPT } from "@/lib/ai/prompts/sommelier";
import { getAssistantSearchContext } from "@/lib/ai/assistant/search-context";
import { client } from "@/sanity/lib/client";

type JournalEntry = {
  tastedAt: string;
  appreciation: "liked" | "average" | "disliked";
  note?: string;
  buyAgain: boolean;
  wine?: {
    _id: string;
    name?: string;
    vintage?: number;
    color?: string;
    country?: string;
    region?: string;
    producer?: {
      name?: string;
    };
  };
};

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

  const entries = await client.fetch<JournalEntry[]>(
    `*[
      _type == "wineJournalEntry" &&
      userId == $userId
    ] | order(tastedAt desc, createdAt desc)[0...12] {
      tastedAt,
      appreciation,
      note,
      buyAgain,
      wine->{
        _id,
        name,
        vintage,
        color,
        country,
        region,
        producer->{name}
      }
    }`,
    { userId }
  );

  const liked = entries.filter(
    (entry) => entry.appreciation === "liked"
  );

  const average = entries.filter(
    (entry) => entry.appreciation === "average"
  );

  const disliked = entries.filter(
    (entry) => entry.appreciation === "disliked"
  );

  const buyAgain = entries.filter((entry) => entry.buyAgain);

  const recentEntries = entries.slice(0, 8).map((entry) => {
    const wineName = entry.wine?.name ?? "Vin";
    const producer = entry.wine?.producer?.name
      ? ` — ${entry.wine.producer.name}`
      : "";

    const vintage = entry.wine?.vintage
      ? ` ${entry.wine.vintage}`
      : "";

    const details = [
      entry.wine?.color,
      entry.wine?.region,
      entry.wine?.country,
    ]
      .filter(Boolean)
      .join(", ");

    const appreciationLabel =
      entry.appreciation === "liked"
        ? "aimé"
        : entry.appreciation === "average"
          ? "moyen"
          : "pas aimé";

    const note = entry.note?.trim()
      ? ` Note : ${entry.note.trim()}`
      : "";

    const repurchase = entry.buyAgain
      ? " Rachèterais : oui."
      : " Rachèterais : non.";

    return `- ${wineName}${vintage}${producer}${details ? ` — ${details}` : ""} — ${appreciationLabel}.${note}${repurchase}`;
  });

  return `
Utilisateur connecté.

STATISTIQUES DU CARNET :
- Bouteilles enregistrées : ${entries.length}
- Aimées : ${liked.length}
- Moyennes : ${average.length}
- Pas aimées : ${disliked.length}
- À racheter : ${buyAgain.length}

DÉGUSTATIONS RÉCENTES :
${recentEntries.length ? recentEntries.join("\n") : "- Aucune dégustation encore."}

UTILISATION :
Utilise ces informations uniquement pour personnaliser les réponses lorsque c'est pertinent.
Privilégie les tendances réellement visibles dans le carnet.
Ne transforme pas une seule dégustation en préférence générale.
Tiens compte des vins aimés, moyens ou pas aimés, des notes libres et du choix de racheter ou non.
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
