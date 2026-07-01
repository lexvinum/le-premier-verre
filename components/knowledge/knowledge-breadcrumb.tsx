import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type KnowledgeBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function KnowledgeBreadcrumb({ items }: KnowledgeBreadcrumbProps) {
  if (!items.length) return null;

  return (
    <nav className="mb-8 text-sm text-neutral-500" aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-neutral-900">
            Accueil
          </Link>
        </li>

        {items.map((item) => (
          <li key={`${item.label}-${item.href ?? "current"}`} className="flex items-center gap-2">
            <span>/</span>

            {item.href ? (
              <Link href={item.href} className="hover:text-neutral-900">
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
