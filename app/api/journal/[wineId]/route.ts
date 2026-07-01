import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  deleteJournalEntry,
  getWineJournalEntry,
  upsertJournalEntry,
} from "@/lib/journal";

type RouteProps = {
  params: Promise<{
    wineId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  const { wineId } = await params;
  const entry = await getWineJournalEntry(userId, wineId);

  return NextResponse.json({ entry });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  const { wineId } = await params;
  const body = await request.json();
  const current = await getWineJournalEntry(userId, wineId);

  const entry = await upsertJournalEntry({
    userId,
    wineId,
    favorite: body.favorite ?? current?.favorite ?? false,
    tasted: body.tasted ?? current?.tasted ?? false,
    buyAgain: body.buyAgain ?? current?.buyAgain ?? false,
    gift: body.gift ?? current?.gift ?? false,
    avoid: body.avoid ?? current?.avoid ?? false,
    rating: body.rating ?? current?.rating ?? null,
    note: body.note ?? current?.note ?? null,
    tastedAt: body.tastedAt ?? current?.tastedAt ?? null,
    location: body.location ?? current?.location ?? null,
  });

  return NextResponse.json({ entry });
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  const { wineId } = await params;
  await deleteJournalEntry(userId, wineId);

  return NextResponse.json({ ok: true });
}
