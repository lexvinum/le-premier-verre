type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q = "" } = await searchParams;

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-10 py-16 md:grid-cols-[0.68fr_0.32fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Bibliothèque
            </p>

            <h1 className="lpv-display mt-7 text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              Rechercher.
            </h1>
          </div>

          <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
            Explore les vins, les producteurs, les régions, les guides et les
            articles du Premier Verre.
          </p>
        </div>
      </section>

      <section className="lpv-container py-16 md:py-24">
        <form method="GET">
          <label
            htmlFor="search-page-input"
            className="lpv-kicker text-[var(--lpv-cocoa)]"
          >
            Que cherches-tu?
          </label>

          <div className="mt-7 flex flex-col gap-6 border-y border-[var(--lpv-line)] py-7 md:flex-row md:items-center">
            <input
              id="search-page-input"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Vin, producteur, région…"
              className="lpv-display min-w-0 flex-1 border-0 bg-transparent py-2 text-[clamp(3rem,6vw,6rem)] leading-[0.95] outline-none placeholder:text-[var(--lpv-muted)]/35"
            />

            <button type="submit" className="lpv-button lpv-button-dark">
              Rechercher
            </button>
          </div>
        </form>

        <div className="py-16">
          {q ? (
            <>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Recherche actuelle
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
                « {q} »
              </h2>

              <p className="mt-6 text-base leading-8 text-[var(--lpv-muted)]">
                Pour voir les résultats instantanément, utilise aussi la
                recherche du header ou le raccourci ⌘K.
              </p>
            </>
          ) : (
            <>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Commencer
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
                Toute la bibliothèque.
              </h2>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
