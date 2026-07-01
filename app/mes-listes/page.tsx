import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getJournal } from "@/lib/journal";

export default async function MesListesPage() {
  const { userId } = await auth();
  const entries = userId ? await getJournal(userId) : [];

  const lists = [
    ["Favoris", entries.filter((e) => e.favorite), "Les bouteilles que tu veux retrouver vite."],
    ["Goûtés", entries.filter((e) => e.tasted), "Les vins déjà passés par ta table."],
    ["À racheter", entries.filter((e) => e.buyAgain), "Les valeurs sûres à reprendre."],
    ["À offrir", entries.filter((e) => e.gift), "Les bouteilles qui feraient un bon cadeau."],
    ["À éviter", entries.filter((e) => e.avoid), "Les vins qui ne t’ont pas convaincue."],
  ];

  return (
    <main className="bg-[#2f2119] px-8 py-24 text-[#fff8ee] md:px-14 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.42em] text-[#caa06b]">
          Premium
        </p>

        <h1 className="lpv-display mt-6 max-w-5xl text-[clamp(5rem,10vw,11rem)] leading-[0.76] tracking-[-0.09em]">
          Mes listes.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d7c3b1]">
          Des listes qui se construisent automatiquement à partir de ton carnet.
        </p>

        {!userId && (
          <Link
            href="/sign-in"
            className="mt-10 inline-flex rounded-full bg-[#caa06b] px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#263227]"
          >
            Se connecter
          </Link>
        )}

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lists.map(([title, items, description]) => {
            const typedItems = items as Awaited<ReturnType<typeof getJournal>>;

            return (
              <article
                key={title as string}
                className="rounded-[34px] bg-[#3b2a20] p-8 shadow-[0_22px_70px_rgba(0,0,0,.20)]"
              >
                <p className="text-xs uppercase tracking-[0.32em] text-[#caa06b]">
                  Liste
                </p>

                <h2 className="lpv-display mt-8 text-6xl leading-[.84] tracking-[-0.08em]">
                  {title as string}
                </h2>

                <p className="mt-6 text-sm leading-7 text-[#d7c3b1]">
                  {description as string}
                </p>

                <p className="mt-8 lpv-display text-7xl leading-none text-[#caa06b]">
                  {typedItems.length}
                </p>

                {typedItems.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {typedItems.slice(0, 4).map((entry) => (
                      <Link
                        key={entry.id}
                        href={`/vins/${entry.wineId}`}
                        className="block rounded-full bg-[#2f2119] px-4 py-3 text-sm text-[#fff8ee] transition hover:bg-[#4a372b]"
                      >
                        {entry.wineId}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <Link
          href="/vins"
          className="mt-12 inline-flex rounded-full bg-[#caa06b] px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#263227]"
        >
          Ajouter des bouteilles
        </Link>
      </div>
    </main>
  );
}
