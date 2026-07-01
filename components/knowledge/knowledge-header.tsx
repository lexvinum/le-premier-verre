type KnowledgeHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string | null;
};

export function KnowledgeHeader({
  eyebrow,
  title,
  description,
}: KnowledgeHeaderProps) {
  return (
    <header className="mb-12 border-b border-neutral-200 pb-10">
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-neutral-500">
        {eyebrow}
      </p>

      <h1 className="mb-6 text-5xl font-serif tracking-tight">
        {title}
      </h1>

      {description && (
        <p className="max-w-3xl text-lg leading-8 text-neutral-700">
          {description}
        </p>
      )}
    </header>
  );
}
