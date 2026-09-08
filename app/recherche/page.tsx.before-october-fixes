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
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-serif">Recherche</h1>

      <form className="mt-8">
        <input
          name="q"
          defaultValue={q}
          placeholder="Rechercher un vin, un cépage, un producteur..."
          className="w-full rounded-xl border border-neutral-300 px-5 py-4 text-lg outline-none focus:border-black"
        />
      </form>

      {q ? (
        <p className="mt-8 text-neutral-500">
          Recherche en cours pour <strong>{q}</strong>...
        </p>
      ) : (
        <p className="mt-8 text-neutral-500">
          Commencez à taper pour explorer le référentiel.
        </p>
      )}
    </main>
  );
}
