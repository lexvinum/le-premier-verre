import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getJournal } from "@/lib/journal";

function formatPrice(price?: number | null) {
  if (price === null || price === undefined) return "—";
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(price);
}

function hasRealImageUrl(value?: string | null) {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return (
    /^https?:\/\//i.test(v) &&
    v.includes("/media/catalog/product/") &&
    !v.includes("placeholder") &&
    !v.includes("logo")
  );
}

function getWineImageSrc(image?: string | null) {
  if (!image || !hasRealImageUrl(image)) return null;
  return `/api/image?url=${encodeURIComponent(image)}`;
}

export default async function MesVinsPage() {
  const { userId } = await auth();

  const entries = userId ? await getJournal(userId) : [];
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
          image: true,
        },
      })
    : [];

  const wineBySlug = new Map(wines.map((wine) => [wine.slug, wine]));

  return (
    <main className="bg-[#efe6d7] text-[#263227]">
      <section className="px-8 py-24 md:px-14 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.42em] text-[#8f6242]">
            Mon carnet
          </p>

          <h1 className="lpv-display mt-6 max-w-5xl text-[clamp(5rem,10vw,11rem)] leading-[0.76] tracking-[-0.09em]">
            Mes vins.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#4b3a2c]">
            Les bouteilles que tu as gardées, goûtées, aimées, offertes ou
            marquées pour plus tard.
          </p>

          {!userId && (
            <Link
              href="/sign-in"
              className="mt-10 inline-flex rounded-full bg-[#3b2a20] px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#fff8ee]"
            >
              Se connecter
            </Link>
          )}

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {entries.map((entry) => {
              const wine = wineBySlug.get(entry.wineId);
              const imageSrc = getWineImageSrc(wine?.image);

              return (
                <Link
                  key={entry.id}
                  href={`/vins/${entry.wineId}`}
                  className="group overflow-hidden rounded-[34px] bg-[#f7f0e6] shadow-[0_22px_70px_rgba(51,41,29,.11)] transition duration-700 hover:-translate-y-1"
                >
                  <div className="relative flex h-[360px] items-center justify-center bg-[#eadcca]">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={wine?.name ?? entry.wineId}
                        className="h-full w-full object-contain p-8 transition duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="px-8 text-center">
                        <p className="lpv-display text-5xl leading-[.86] text-[#71735b]">
                          {wine?.name ?? entry.wineId}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-7">
                    <div className="flex flex-wrap gap-2">
                      {entry.favorite && <span className="rounded-full bg-[#d9b783] px-3 py-1 text-xs">Favori</span>}
                      {entry.tasted && <span className="rounded-full bg-[#eadcca] px-3 py-1 text-xs">Goûté</span>}
                      {entry.buyAgain && <span className="rounded-full bg-[#eadcca] px-3 py-1 text-xs">À racheter</span>}
                      {entry.gift && <span className="rounded-full bg-[#eadcca] px-3 py-1 text-xs">À offrir</span>}
                      {entry.avoid && <span className="rounded-full bg-[#eadcca] px-3 py-1 text-xs">À éviter</span>}
                    </div>

                    <h2 className="lpv-display mt-6 text-5xl leading-[.86] tracking-[-0.08em]">
                      {wine?.name ?? entry.wineId}
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-[#5f5447]">
                      {[wine?.producer, wine?.region, wine?.country, wine?.vintage]
                        .filter(Boolean)
                        .join(" · ") || "Fiche enregistrée dans ton carnet."}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-[#4b3a2c]/10 pt-5">
                      <span className="text-lg font-semibold text-[#8f6242]">
                        {formatPrice(wine?.price)}
                      </span>

                      {entry.rating ? (
                        <span className="text-[#8f6242]">
                          {"★".repeat(Math.round(entry.rating))}
                        </span>
                      ) : (
                        <span className="text-xs uppercase tracking-[0.22em] text-[#8f6242]">
                          Voir →
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {entries.length === 0 && (
            <div className="mt-14 rounded-[38px] bg-[#f7f0e6] p-10 text-[#4b3a2c] shadow-[0_22px_70px_rgba(51,41,29,.10)]">
              Aucune bouteille dans ton carnet pour l’instant.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
