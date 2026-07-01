import Link from "next/link";

type MagazineFeatureProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  align?: "left" | "right";
};

export function MagazineFeature({
  eyebrow,
  title,
  description,
  href,
  align = "left",
}: MagazineFeatureProps) {
  return (
    <section className="lpv-container grid gap-6 py-16 md:grid-cols-2 md:py-28">
      <div
        className={
          align === "right"
            ? "order-2 rounded-[2.5rem] bg-[linear-gradient(135deg,#e7d8c1,#7a2636)] md:order-2"
            : "rounded-[2.5rem] bg-[linear-gradient(135deg,#ede4d5,#3f4b36)]"
        }
      />

      <div className="flex min-h-[520px] flex-col justify-center rounded-[2.5rem] border border-[var(--lpv-border)] bg-[var(--lpv-surface)] p-8 md:p-14">
        <p className="mb-8 text-xs uppercase tracking-[0.38em] text-[var(--lpv-muted)]">
          {eyebrow}
        </p>

        <h2 className="lpv-display max-w-2xl text-6xl leading-[0.88] md:text-8xl">
          {title}
        </h2>

        <p className="mt-8 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
          {description}
        </p>

        <Link
          href={href}
          className="mt-10 text-sm text-[var(--lpv-ink)] transition hover:text-[var(--lpv-wine)]"
        >
          Découvrir →
        </Link>
      </div>
    </section>
  );
}
