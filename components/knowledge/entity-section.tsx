import Link from "next/link";

export type EntityItem = {
  _id?: string;
  name: string;
  slug: string;
};

type EntitySectionProps = {
  title: string;
  items?: EntityItem[];
  basePath: string;
  emptyText?: string;
};

export function EntitySection({
  title,
  items,
  basePath,
  emptyText,
}: EntitySectionProps) {
  if (!items?.length) {
    if (!emptyText) return null;

    return (
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-serif">{title}</h2>
        <p className="text-sm text-neutral-500">{emptyText}</p>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-serif">{title}</h2>

      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item._id ?? item.slug}
            href={`${basePath}/${item.slug}`}
            className="rounded-xl border border-neutral-200 p-4 transition hover:bg-neutral-50"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
