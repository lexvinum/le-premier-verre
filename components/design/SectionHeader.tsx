type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-4xl">
        {eyebrow && (
          <p className="mb-5 text-xs uppercase tracking-[0.42em] text-[var(--lpv-muted)]">
            {eyebrow}
          </p>
        )}

        <h2 className="lpv-display text-6xl leading-[0.88] text-[var(--lpv-ink)] md:text-8xl">
          {title}
        </h2>
      </div>

      {description && (
        <p className="max-w-md text-sm leading-7 text-[var(--lpv-muted)] md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
