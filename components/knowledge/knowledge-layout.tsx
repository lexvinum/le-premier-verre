import { ReactNode } from "react";
import { KnowledgeBreadcrumb } from "./knowledge-breadcrumb";
import { KnowledgeHeader } from "./knowledge-header";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type KnowledgeLayoutProps = {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description?: string | null;
  children: ReactNode;
};

export function KnowledgeLayout({
  breadcrumb,
  eyebrow,
  title,
  description,
  children,
}: KnowledgeLayoutProps) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <KnowledgeBreadcrumb items={breadcrumb} />

      <KnowledgeHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      {children}
    </main>
  );
}
