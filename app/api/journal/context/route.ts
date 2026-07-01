import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getJournal, getJournalStats } from "@/lib/journal";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({
      signedIn: false,
      stats: null,
      wines: [],
    });
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

  const enriched = entries.slice(0, 40).map((entry) => {
    const wine = wineBySlug.get(entry.wineId);

    return {
      slug: entry.wineId,
      name: wine?.name ?? entry.wineId,
      producer: wine?.producer ?? null,
      country: wine?.country ?? null,
      region: wine?.region ?? null,
      color: wine?.color ?? null,
      vintage: wine?.vintage ?? null,
      price: wine?.price ?? null,
      grape: wine?.grape ?? null,
      favorite: entry.favorite,
      tasted: entry.tasted,
      buyAgain: entry.buyAgain,
      gift: entry.gift,
      avoid: entry.avoid,
      rating: entry.rating,
      note: entry.note,
    };
  });

  return NextResponse.json({
    signedIn: true,
    stats,
    wines: enriched,
  });
}
