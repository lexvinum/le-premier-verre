import Link from "next/link";

type KnowledgeCardProps = {
  href: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  image?: React.ReactNode;
};

export function KnowledgeCard({
  href,
  title,
  subtitle,
  description,
  image,
}: KnowledgeCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      {image && (
        <div className="aspect-[16/9] overflow-hidden">
          {image}
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold transition group-hover:text-neutral-900">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-2 text-sm uppercase tracking-[0.15em] text-neutral-500">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-600">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
