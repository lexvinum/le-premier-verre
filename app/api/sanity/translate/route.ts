import { NextRequest, NextResponse } from "next/server";

import { writeClient } from "@/sanity/lib/write-client";
import {
  TRANSLATABLE_TYPES,
  type TranslatableType,
  computeTranslationSourceHash,
  translateSanityDocument,
} from "@/lib/translation/sanity-translator";

export const runtime = "nodejs";

type WebhookBody = {
  _id?: string;
};

function isTranslatableType(value: unknown): value is TranslatableType {
  return (
    typeof value === "string" &&
    (TRANSLATABLE_TYPES as readonly string[]).includes(value)
  );
}

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-lpv-translation-secret");

    if (
      !process.env.SANITY_TRANSLATION_WEBHOOK_SECRET ||
      secret !== process.env.SANITY_TRANSLATION_WEBHOOK_SECRET
    ) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as WebhookBody;

    if (!body._id || typeof body._id !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing document _id" },
        { status: 400 }
      );
    }

    const documentId = body._id.replace(/^drafts\./, "");

    const document = await writeClient.fetch<Record<string, any> | null>(
      `*[
        _id == $publishedId ||
        _id == $draftId
      ] | order(_updatedAt desc)[0]`,
      {
        publishedId: documentId,
        draftId: `drafts.${documentId}`,
      }
    );

    if (!document) {
      return NextResponse.json(
        { ok: false, error: "Document not found" },
        { status: 404 }
      );
    }

    if (!isTranslatableType(document._type)) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: "Document type is not translatable",
        type: document._type,
      });
    }

    const hash = computeTranslationSourceHash(
      document,
      document._type
    );

    if (document.translationSourceHash === hash) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: "French source has not changed",
        id: document._id,
        type: document._type,
      });
    }

    const patch = await translateSanityDocument(
      document,
      document._type
    );

    if (Object.keys(patch).length === 0) {
      await writeClient
        .patch(document._id)
        .set({ translationSourceHash: hash })
        .commit();

      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: "No translatable French content",
        id: document._id,
        type: document._type,
      });
    }

    await writeClient
      .patch(document._id)
      .set({
        ...patch,
        translationSourceHash: hash,
      })
      .commit();

    return NextResponse.json({
      ok: true,
      translated: true,
      id: document._id,
      type: document._type,
      fields: Object.keys(patch),
    });
  } catch (error) {
    console.error("Sanity translation webhook error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown translation error",
      },
      { status: 500 }
    );
  }
}
