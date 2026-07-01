import { type UIMessage } from "ai";
import { z } from "zod";

import { createSommelierStream } from "@/lib/ai/assistant/assistant.service";
import type { AssistantErrorResponse } from "@/lib/ai/assistant/assistant.types";

export const runtime = "nodejs";

const AssistantRequestSchema = z.object({
  messages: z.array(z.any()).min(1),
});

function errorResponse(
  error: string,
  code: AssistantErrorResponse["code"],
  status: number
) {
  return Response.json(
    {
      error,
      code,
    } satisfies AssistantErrorResponse,
    { status }
  );
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = AssistantRequestSchema.safeParse(json);

    if (!parsed.success) {
      return errorResponse(
        "Requête invalide pour le Sommelier IA.",
        "INVALID_REQUEST",
        400
      );
    }

    const messages = parsed.data.messages as UIMessage[];
    const result = await createSommelierStream(messages);

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[assistant_error]", error);

    return errorResponse(
      "Erreur interne du Sommelier IA.",
      "GENERATION_FAILED",
      500
    );
  }
}
