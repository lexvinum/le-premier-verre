type KnowledgeStat = {
  label: string;
  value: string | number;
};

type KnowledgeStatsProps = {
  stats: KnowledgeStat[];
};

export function KnowledgeStats({ stats }: KnowledgeStatsProps) {
  const visibleStats = stats.filter((stat) => stat.value !== undefined && stat.value !== null);

  if (!visibleStats.length) return null;

  return (
    <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {visibleStats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-neutral-200 p-6"
        >
          <p className="text-3xl font-serif">{stat.value}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}
