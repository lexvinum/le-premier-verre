import { prisma } from "@/lib/prisma";
import type {
  WineJournalEntry,
  WineJournalInput,
  WineJournalStats,
} from "./types";

type RawJournalEntry = {
  id: string;
  user_id: string;
  wine_id: string;
  favorite: boolean;
  tasted: boolean;
  buy_again: boolean;
  gift: boolean;
  avoid: boolean;
  rating: number | null;
  note: string | null;
  tasted_at: Date | null;
  location: string | null;
  created_at: Date;
  updated_at: Date;
};

function mapEntry(row: RawJournalEntry): WineJournalEntry {
  return {
    id: row.id,
    userId: row.user_id,
    wineId: row.wine_id,
    favorite: row.favorite,
    tasted: row.tasted,
    buyAgain: row.buy_again,
    gift: row.gift,
    avoid: row.avoid,
    rating: row.rating === null ? null : Number(row.rating),
    note: row.note,
    tastedAt: row.tasted_at,
    location: row.location,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getJournal(userId: string): Promise<WineJournalEntry[]> {
  const rows = await prisma.$queryRaw<RawJournalEntry[]>`
    select *
    from wine_journal
    where user_id = ${userId}
    order by updated_at desc
  `;

  return rows.map(mapEntry);
}

export async function getWineJournalEntry(
  userId: string,
  wineId: string
): Promise<WineJournalEntry | null> {
  const rows = await prisma.$queryRaw<RawJournalEntry[]>`
    select *
    from wine_journal
    where user_id = ${userId}
      and wine_id = ${wineId}
    limit 1
  `;

  return rows[0] ? mapEntry(rows[0]) : null;
}

export async function upsertJournalEntry(
  input: WineJournalInput
): Promise<WineJournalEntry> {
  const tastedAt =
    input.tastedAt instanceof Date
      ? input.tastedAt
      : input.tastedAt
        ? new Date(input.tastedAt)
        : null;

  const rows = await prisma.$queryRaw<RawJournalEntry[]>`
    insert into wine_journal (
      user_id,
      wine_id,
      favorite,
      tasted,
      buy_again,
      gift,
      avoid,
      rating,
      note,
      tasted_at,
      location
    )
    values (
      ${input.userId},
      ${input.wineId},
      ${input.favorite ?? false},
      ${input.tasted ?? false},
      ${input.buyAgain ?? false},
      ${input.gift ?? false},
      ${input.avoid ?? false},
      ${input.rating ?? null},
      ${input.note ?? null},
      ${tastedAt},
      ${input.location ?? null}
    )
    on conflict (user_id, wine_id)
    do update set
      favorite = excluded.favorite,
      tasted = excluded.tasted,
      buy_again = excluded.buy_again,
      gift = excluded.gift,
      avoid = excluded.avoid,
      rating = excluded.rating,
      note = excluded.note,
      tasted_at = excluded.tasted_at,
      location = excluded.location
    returning *
  `;

  return mapEntry(rows[0]);
}

export async function deleteJournalEntry(userId: string, wineId: string) {
  await prisma.$executeRaw`
    delete from wine_journal
    where user_id = ${userId}
      and wine_id = ${wineId}
  `;
}

export async function getJournalStats(userId: string): Promise<WineJournalStats> {
  const rows = await prisma.$queryRaw<
    Array<{
      total: bigint;
      favorites: bigint;
      tasted: bigint;
      buy_again: bigint;
      gift: bigint;
      avoid: bigint;
    }>
  >`
    select
      count(*) as total,
      count(*) filter (where favorite = true) as favorites,
      count(*) filter (where tasted = true) as tasted,
      count(*) filter (where buy_again = true) as buy_again,
      count(*) filter (where gift = true) as gift,
      count(*) filter (where avoid = true) as avoid
    from wine_journal
    where user_id = ${userId}
  `;

  const row = rows[0];

  return {
    total: Number(row?.total ?? 0),
    favorites: Number(row?.favorites ?? 0),
    tasted: Number(row?.tasted ?? 0),
    buyAgain: Number(row?.buy_again ?? 0),
    gift: Number(row?.gift ?? 0),
    avoid: Number(row?.avoid ?? 0),
  };
}
