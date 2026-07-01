type MetadataItem = {
  label: string;
  value?: string | number | null;
};

type KnowledgeMetadataProps = {
  items: MetadataItem[];
};

export function KnowledgeMetadata({
  items,
}: KnowledgeMetadataProps) {
  const visible = items.filter(
    (item) => item.value !== undefined && item.value !== null && item.value !== ""
  );

  if (!visible.length) return null;

  return (
    <section className="mb-12 rounded-2xl border border-neutral-200">
      {visible.map((item, index) => (
        <div
          key={item.label}
          className={`flex items-center justify-between px-6 py-4 ${
            index !== visible.length - 1 ? "border-b border-neutral-200" : ""
          }`}
        >
          <span className="text-sm uppercase tracking-[0.18em] text-neutral-500">
            {item.label}
          </span>

          <span className="font-medium text-neutral-900">
            {item.value}
          </span>
        </div>
      ))}
    </section>
  );
}
