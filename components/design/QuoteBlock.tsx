type QuoteBlockProps = {
  quote: string;
  caption?: string;
};

export function QuoteBlock({ quote, caption }: QuoteBlockProps) {
  return (
    <section className="lpv-container py-16 md:py-28">
      <div className="rounded-[2.5rem] bg-[var(--lpv-ink)] p-8 text-white md:p-16">
        <p className="lpv-display max-w-5xl text-5xl leading-[0.98] md:text-8xl">
          “{quote}”
        </p>

        {caption && (
          <p className="mt-10 text-xs uppercase tracking-[0.34em] text-white/50">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
