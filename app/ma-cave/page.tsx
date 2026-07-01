import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getJournal, getJournalStats } from "@/lib/journal";

export default async function MaCavePage() {
  const { userId } = await auth();

  const entries = userId ? await getJournal(userId) : [];
  const stats = userId
    ? await getJournalStats(userId)
    : { total: 0, favorites: 0, tasted: 0, buyAgain: 0, gift: 0, avoid: 0 };

  return (
    <main className="bg-[#efe6d7] text-[#263227]">
      <section className="relative overflow-hidden px-8 py-24 md:px-14 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(217,183,131,.30),transparent_32%),radial-gradient(circle_at_88%_38%,rgba(113,115,91,.14),transparent_34%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[#8f6242]">
              Premium
            </p>

            <h1 className="lpv-display mt-6 text-[clamp(5rem,10vw,11rem)] leading-[0.76] tracking-[-0.09em]">
              Ma cave.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#4b3a2c]">
              Ton profil de goût, tes bouteilles gardées, tes envies et les
              premières traces de ta mémoire autour du vin.
            </p>

            {!userId && (
              <Link
                href="/sign-in"
                className="mt-10 inline-flex rounded-full bg-[#3b2a20] px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#fff8ee]"
              >
                Se connecter
              </Link>
            )}
          </div>

          <div className="relative">
            <img
              src="/images/lpv/IMG_0046.JPG"
              alt="Ma cave"
              className="h-[600px] w-full rounded-[42px] object-cover shadow-[0_28px_90px_rgba(51,41,29,.16)]"
            />
            <div className="absolute -bottom-8 -left-8 hidden max-w-xs rounded-[30px] bg-[#3b2a20] p-6 text-[#fff8ee] shadow-2xl md:block">
              <p className="text-xs uppercase tracking-[0.32em] text-[#caa06b]">
                {stats.total} bouteille{stats.total > 1 ? "s" : ""}
              </p>
              <p className="mt-4 text-sm leading-6 text-[#d7c3b1]">
                Ton espace personnel commence ici.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 pb-24 md:px-14 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-6">
            {[
              ["Total", stats.total],
              ["Favoris", stats.favorites],
              ["Goûtés", stats.tasted],
              ["À racheter", stats.buyAgain],
              ["À offrir", stats.gift],
              ["À éviter", stats.avoid],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[30px] bg-[#f7f0e6] p-6 shadow-[0_18px_55px_rgba(51,41,29,.10)]"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[#8f6242]">
                  {label}
                </p>
                <p className="mt-5 lpv-display text-6xl leading-none">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              ["Mon carnet", "Toutes les bouteilles gardées.", "/mon-carnet"],
              ["Mes vins", "Favoris, goûtés, à racheter.", "/mes-vins"],
              ["Scanner", "Ajouter une bouteille par photo.", "/scan"],
              ["Courrier", "Recevoir les coups de cœur.", "/newsletter"],
            ].map(([title, description, href]) => (
              <Link
                key={title}
                href={href}
                className="rounded-[34px] bg-[#f7f0e6] p-8 shadow-[0_22px_70px_rgba(51,41,29,.11)] transition duration-700 hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-[0.32em] text-[#8f6242]">
                  Ma cave
                </p>
                <h2 className="lpv-display mt-8 text-5xl leading-[.86]">
                  {title}
                </h2>
                <p className="mt-6 text-sm leading-7 text-[#5f5447]">
                  {description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-[42px] bg-[#3b2a20] p-8 text-[#fff8ee] shadow-[0_28px_90px_rgba(51,41,29,.18)]">
            <p className="text-xs uppercase tracking-[0.36em] text-[#caa06b]">
              Derniers ajouts
            </p>

            {entries.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {entries.slice(0, 6).map((entry) => (
                  <Link
                    key={entry.id}
                    href={`/vins/${entry.wineId}`}
                    className="rounded-[28px] bg-[#2f2119] p-6 transition hover:-translate-y-1"
                  >
                    <p className="text-xs uppercase tracking-[0.26em] text-[#caa06b]">
                      {entry.favorite ? "Favori" : entry.tasted ? "Goûté" : "Carnet"}
                    </p>
                    <h3 className="mt-5 lpv-display text-4xl leading-[.88]">
                      {entry.wineId}
                    </h3>
                    {entry.rating ? (
                      <p className="mt-5 text-[#caa06b]">
                        {"★".repeat(Math.round(entry.rating))}
                      </p>
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[30px] border border-[#caa06b]/20 bg-[#2f2119] p-8 text-[#d7c3b1]">
                Aucune bouteille ajoutée pour l’instant. Commence par explorer le répertoire.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
