import Link from "next/link";

type EditorialCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  tone?: "cream" | "olive" | "wine" | "photo";
};

const toneClasses = {
  cream: "bg-[rgba(251,247,239,0.82)] text-[var(--lpv-ink)]",
  olive: "bg-[var(--lpv-olive)] text-white",
  wine: "bg-[var(--lpv-wine)] text-white",
  photo:
    "bg-[linear-gradient(135deg,rgba(21,18,16,0.78),rgba(63,74,54,0.78)),url('/favicon.ico')] bg-cover bg-center text-white",
};

export function EditorialCard({
  eyebrow,
  title,
  description,
  href,
  tone = "cream",
}: EditorialCardProps) {
  return (
    <Link
      href={href}
      className={`group lpv-soft-border lpv-shadow relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[2.25rem] p-7 transition duration-700 hover:-translate-y-1 md:p-9 ${toneClasses[tone]}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />

      <div>
        <p className="mb-10 text-[10px] uppercase tracking-[0.42em] opacity-60">
          {eyebrow}
        </p>

        <h3 className="lpv-display max-w-xl text-[clamp(3.4rem,5vw,5.8rem)] leading-[0.82] tracking-[-0.07em]">
          {title}
        </h3>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <p className="max-w-sm text-sm leading-7 opacity-68">{description}</p>

        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-current/20 text-lg transition duration-700 group-hover:translate-x-1 group-hover:border-current/50">
          →
        </span>
      </div>
    </Link>
  );
}
