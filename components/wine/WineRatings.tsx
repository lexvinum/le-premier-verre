type Props = {
  body?: number;
  sweetness?: number;
  roundness?: number;
};

function ProfileLine({
  left,
  right,
  value,
}: {
  left: string;
  right: string;
  value?: number;
}) {
  if (typeof value !== "number") return null;

  const score = Math.max(1, Math.min(5, value));

  return (
    <div className="border-t border-[var(--lpv-line)] py-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-sm text-[var(--lpv-ink)]">{left}</span>
        <span className="text-sm text-[var(--lpv-ink)]">{right}</span>
      </div>

      <div className="relative h-[3px] bg-[var(--lpv-line)]">
        <span
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--lpv-ink)]"
          style={{ left: `${((score - 1) / 4) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function WineRatings({
  body,
  sweetness,
  roundness,
}: Props) {
  if (
    typeof body !== "number" &&
    typeof sweetness !== "number" &&
    typeof roundness !== "number"
  ) {
    return null;
  }

  return (
    <section className="border-b border-[var(--lpv-line)] py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-[0.38fr_0.62fr]">
        <div>
          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            Profil
          </p>

          <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-6xl">
            En bouche.
          </h2>
        </div>

        <div className="border-b border-[var(--lpv-line)]">
          <ProfileLine left="Léger" right="Puissant" value={body} />
          <ProfileLine left="Sec" right="Doux" value={sweetness} />
          <ProfileLine left="Vif" right="Rond" value={roundness} />
        </div>
      </div>
    </section>
  );
}
