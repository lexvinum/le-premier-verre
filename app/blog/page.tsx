import Link from "next/link";

const posts = [
  {
    eyebrow: "Guide pratique",
    title: "Comment choisir un vin quand on ne sait pas quoi prendre",
    description: "Un guide simple pour partir du repas, du budget et du moment.",
    image: "/images/lpv/IMG_0044.JPG",
    featured: true,
  },
  {
    eyebrow: "Recevoir",
    title: "Les bouteilles qui sauvent une soirée",
    description: "Bulles, rouges légers, blancs frais : les valeurs sûres à garder en tête.",
    image: "/images/lpv/IMG_0041.JPG",
  },
  {
    eyebrow: "Accords",
    title: "Quoi boire avec des pâtes?",
    description: "Tomate, crème, pesto, fruits de mer : les bons réflexes.",
    image: "/images/lpv/IMG_0045.JPG",
  },
  {
    eyebrow: "Québec",
    title: "Pourquoi les vins d’ici méritent plus d’attention",
    description: "Fraîcheur, précision, proximité et belles surprises.",
    image: "/images/lpv/vignes.jpg",
  },
  {
    eyebrow: "Style",
    title: "Monter une mini cave à la maison",
    description: "Quelques bouteilles utiles sans tomber dans la collection compliquée.",
    image: "/images/lpv/cave.jpg",
  },
  {
    eyebrow: "Apéro",
    title: "Recevoir sans se compliquer",
    description: "Une formule simple : bulles, blanc frais, rouge léger, quelque chose à grignoter.",
    image: "/images/lpv/table-vin.jpg",
  },
];

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main className="bg-[#4a372b] text-[#f6efe7]">
      <section className="relative overflow-hidden px-8 py-24 md:px-14 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(150,95,58,.34),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(89,70,44,.26),transparent_38%),linear-gradient(180deg,#4a372b,#37271f)]" />
        <div className="absolute inset-0 opacity-[0.18] bg-[url('/images/lpv/IMG_9670.JPG')] bg-cover bg-center mix-blend-soft-light" />

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[#caa06b]">
              Blogue
            </p>

            <h1 className="lpv-display mt-6 text-[clamp(5rem,10vw,11rem)] leading-[0.76] tracking-[-0.09em]">
              Lire pour
              <br />
              mieux boire.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d7c3b1]">
              Des articles courts, beaux et utiles pour choisir plus facilement,
              recevoir avec confiance et découvrir le vin sans prétention.
            </p>
          </div>

          <div className="relative">
            <img
              src="/images/lpv/IMG_0043.JPG"
              alt="Salon de dégustation"
              className="h-[560px] w-full rounded-[42px] object-cover opacity-90 shadow-[0_28px_90px_rgba(0,0,0,.28)]"
            />
            <div className="absolute -bottom-8 -left-8 hidden max-w-xs rounded-[30px] bg-[#dcc8b1] p-6 text-[#2f281f] shadow-2xl md:block">
              <p className="text-xs uppercase tracking-[0.32em] text-[#8f6242]">
                Notes de table
              </p>
              <p className="mt-4 text-sm leading-6 text-[#4b3a2c]">
                Un journal feutré pour penser le vin autrement : par les moments,
                les repas et les saisons.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 pb-24 md:px-14 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/blog"
            className="group grid overflow-hidden rounded-[42px] bg-[#dcc8b1] text-[#263227] shadow-[0_28px_90px_rgba(0,0,0,.24)] md:grid-cols-[1.1fr_.9fr]"
          >
            <div className="relative min-h-[520px] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(47,40,31,.46),transparent_60%)]" />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.36em] text-[#8f6242]">
                Article à la une · {featured.eyebrow}
              </p>

              <h2 className="lpv-display mt-8 text-6xl leading-[.84] tracking-[-0.08em] md:text-8xl">
                {featured.title}
              </h2>

              <p className="mt-8 max-w-xl text-base leading-8 text-[#4b3a2c]">
                {featured.description}
              </p>

              <p className="mt-10 text-xs uppercase tracking-[0.28em] text-[#8f6242]">
                Lire →
              </p>
            </div>
          </Link>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.title}
                href="/blog"
                className="group overflow-hidden rounded-[34px] bg-[#2f2119] shadow-[0_22px_70px_rgba(0,0,0,.18)] transition duration-700 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(0,0,0,.28)]"
              >
                <div className="relative h-[300px] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(47,40,31,.68),transparent_58%)]" />
                  <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.32em] text-[#caa06b]">
                    {post.eyebrow}
                  </p>
                </div>

                <div className="p-7">
                  <h2 className="lpv-display text-5xl leading-[.86] tracking-[-0.08em] text-[#fff8ee]">
                    {post.title}
                  </h2>

                  <p className="mt-6 text-sm leading-7 text-[#d7c3b1]">
                    {post.description}
                  </p>

                  <p className="mt-8 text-xs uppercase tracking-[0.28em] text-[#caa06b]">
                    Lire →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_center,transparent_45%,rgba(26,18,13,.22)_100%)]" />
    </main>
  );
}
