import Link from "next/link";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type Guide = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
};

const guidesQuery = `*[_type == "guide" && published == true] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt
}`;

export default async function GuidesPage() {
  const guides = await client.fetch<Guide[]>(guidesQuery);

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-16 text-[#f4ede5]">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#9ab3a1]">
          Le Premier Verre
        </p>

        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Guides</h1>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide._id}
              href={`/guides/${guide.slug}`}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:border-[#6f8f7a]"
            >
              <h2 className="text-2xl font-semibold">{guide.title}</h2>
              {guide.excerpt ? (
                <p className="mt-4 text-sm leading-7 text-[#d5c0b3]">
                  {guide.excerpt}
                </p>
              ) : null}
              <p className="mt-6 text-sm text-[#d8eadf]">Lire →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}