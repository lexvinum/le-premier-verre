import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  getJournal,
  getJournalStats,
  upsertJournalEntry,
} from "@/lib/journal";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Connexion requise." },
      { status: 401 }
    );
  }

  const [entries, stats] = await Promise.all([
    getJournal(userId),
    getJournalStats(userId),
  ]);

  return NextResponse.json({ entries, stats });
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Connexion requise." },
      { status: 401 }
    );
  }

  const body = await request.json();

  if (!body?.wineId) {
    return NextResponse.json(
      { error: "wineId est requis." },
      { status: 400 }
    );
  }

  const entry = await upsertJournalEntry({
    userId,
    wineId: String(body.wineId),
    favorite: Boolean(body.favorite),
    tasted: Boolean(body.tasted),
    buyAgain: Boolean(body.buyAgain),
    gift: Boolean(body.gift),
    avoid: Boolean(body.avoid),
    rating:
      body.rating === null || body.rating === undefined
        ? null
        : Number(body.rating),
    note: body.note ? String(body.note) : null,
    tastedAt: body.tastedAt ?? null,
    location: body.location ? String(body.location) : null,
  });

  return NextResponse.json({ entry });
}
