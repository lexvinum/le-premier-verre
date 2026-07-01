import { ReactNode } from "react";

type KnowledgeSectionProps = {
  title: string;
  children: ReactNode;
};

export function KnowledgeSection({
  title,
  children,
}: KnowledgeSectionProps) {
  return (
    <section className="mb-14">
      <h2 className="mb-5 text-3xl font-serif">
        {title}
      </h2>

      {children}
    </section>
  );
}
