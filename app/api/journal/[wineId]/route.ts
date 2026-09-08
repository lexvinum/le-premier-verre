import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

type RouteProps = {
  params: Promise<{
    wineId: string;
  }>;
};

type JournalEntry = {
  _id: string;
  tastedAt: string;
  appreciation: "liked" | "average" | "disliked";
  note?: string;
  buyAgain: boolean;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Connexion requise." },
      { status: 401 }
    );
  }

  const { wineId } = await params;

  const entry = await client.fetch<JournalEntry | null>(
    `*[
      _type == "wineJournalEntry" &&
      userId == $userId &&
      wine._ref == $wineId
    ][0]{
      _id,
      tastedAt,
      appreciation,
      note,
      buyAgain
    }`,
    { userId, wineId }
  );

  return NextResponse.json({ entry });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Connexion requise." },
      { status: 401 }
    );
  }

  const { wineId } = await params;
  const body = await request.json();

  const tastedAt = String(body.tastedAt || "").trim();
  const appreciation = String(body.appreciation || "").trim();
  const note = String(body.note || "").trim();
  const buyAgain = Boolean(body.buyAgain);

  if (!tastedAt) {
    return NextResponse.json(
      { error: "La date est requise." },
      { status: 400 }
    );
  }

  if (!["liked", "average", "disliked"].includes(appreciation)) {
    return NextResponse.json(
      { error: "L'appréciation est invalide." },
      { status: 400 }
    );
  }

  const existing = await client.fetch<{ _id: string } | null>(
    `*[
      _type == "wineJournalEntry" &&
      userId == $userId &&
      wine._ref == $wineId
    ][0]{ _id }`,
    { userId, wineId }
  );

  const now = new Date().toISOString();

  const entry = existing
    ? await writeClient
        .patch(existing._id)
        .set({
          tastedAt,
          appreciation,
          note: note || "",
          buyAgain,
          updatedAt: now,
        })
        .commit()
    : await writeClient.create({
        _type: "wineJournalEntry",
        userId,
        wine: {
          _type: "reference",
          _ref: wineId,
        },
        tastedAt,
        appreciation,
        note: note || "",
        buyAgain,
        createdAt: now,
        updatedAt: now,
      });

  return NextResponse.json({ entry });
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Connexion requise." },
      { status: 401 }
    );
  }

  const { wineId } = await params;

  const existing = await client.fetch<{ _id: string } | null>(
    `*[
      _type == "wineJournalEntry" &&
      userId == $userId &&
      wine._ref == $wineId
    ][0]{ _id }`,
    { userId, wineId }
  );

  if (existing) {
    await writeClient.delete(existing._id);
  }

  return NextResponse.json({ ok: true });
}
