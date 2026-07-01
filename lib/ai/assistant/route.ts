import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";

import { openai } from "@/lib/ai/client";
import { SOMMELIER_SYSTEM_PROMPT } from "@/lib/ai/prompts/sommelier";
import { getAssistantSearchContext } from "@/lib/ai/assistant/search-context";

export const runtime = "nodejs";

const AssistantRequestSchema = z.object({
  messages: z.array(z.any()).min(1),
});

function getLastUserMessage(messages: UIMessage[]) {
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

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = AssistantRequestSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json(
        { error: "Requête invalide pour le Sommelier IA." },
        { status: 400 }
      );
    }

    const messages = parsed.data.messages as UIMessage[];
    const userQuery = getLastUserMessage(messages);

    if (!userQuery) {
      return Response.json(
        { error: "Aucune question utilisateur détectée." },
        { status: 400 }
      );
    }

    const context = await getAssistantSearchContext(userQuery);

    const result = streamText({
      model: openai("gpt-4.1-mini"),
      system: `
${SOMMELIER_SYSTEM_PROMPT}

CONTEXTE DU SITE À UTILISER :
${context.contextText}

RAPPEL :
Tu dois répondre uniquement à partir du contexte ci-dessus.
Si le contexte est insuffisant, dis-le clairement.
      `.trim(),
      messages: await convertToModelMessages(messages),
      temperature: 0.4,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[assistant_error]", error);

    return Response.json(
      { error: "Erreur interne du Sommelier IA." },
      { status: 500 }
    );
  }
}