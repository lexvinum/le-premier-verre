import Link from "next/link";

const products = [
  {
    eyebrow: "Guide numérique",
    title: "Recevoir sans se compliquer",
    description: "Un mini-guide pour choisir les bonnes bouteilles selon le moment.",
    image: "/images/lpv/IMG_0048.JPG",
  },
  {
    eyebrow: "Coffret",
    title: "Les essentiels du Premier Verre",
    description: "Bulles, blanc frais, rouge léger : une base simple pour toutes les soirées.",
    image: "/images/lpv/bouteille.jpg",
  },
  {
    eyebrow: "Accessoire",
    title: "Carnet de dégustation",
    description: "Pour noter les bouteilles qu’on aime vraiment, sans vocabulaire compliqué.",
    image: "/images/lpv/cave.jpg",
  },
  {
    eyebrow: "Sélection",
    title: "Bouteilles à offrir",
    description: "Des idées élégantes pour hôtesse, anniversaire, merci ou souper improvisé.",
    image: "/images/lpv/IMG_0046.JPG",
  },
  {
    eyebrow: "Expérience",
    title: "Route des vins personnalisée",
    description: "Un itinéraire simple selon la région, le temps disponible et l’ambiance recherchée.",
    image: "/images/lpv/vendanges.jpg",
  },
  {
    eyebrow: "Carte cadeau",
    title: "Offrir Le Premier Verre",
    description: "Pour quelqu’un qui aime recevoir, découvrir et boire mieux.",
    image: "/images/lpv/IMG_0049.JPG",
  },
];

export default function BoutiquePage() {
  const featured = products[1];

  return (
    <main className="bg-[#2f2119] text-[#fff8ee]">
      <section className="relative overflow-hidden px-8 py-24 md:px-14 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#5a3828_0%,#432b21_35%,#2b1c17_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(202,160,107,.18),transparent_32%),radial-gradient(circle_at_82%_30%,rgba(255,248,238,.08),transparent_34%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[#caa06b]">
              Boutique
            </p>

            <h1 className="lpv-display mt-6 text-[clamp(5rem,10vw,11rem)] leading-[0.76] tracking-[-0.09em]">
              La cave privée
              <br />
              du Premier Verre.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d7c3b1]">
              Guides, coffrets, carnets et expériences pour recevoir avec plus
              de chaleur, choisir avec plus d’instinct et garder le vin simple.
            </p>
          </div>

          <div className="relative">
            <img
              src="/images/lpv/IMG_0044.JPG"
              alt="Boutique Le Premier Verre"
              className="h-[580px] w-full rounded-[42px] object-cover opacity-90 shadow-[0_28px_90px_rgba(0,0,0,.30)]"
            />
            <div className="absolute -bottom-8 -left-8 hidden max-w-xs rounded-[30px] bg-[#dcc8b1] p-6 text-[#263227] shadow-2xl md:block">
              <p className="text-xs uppercase tracking-[0.32em] text-[#8f6242]">
                Collection
              </p>
              <p className="mt-4 text-sm leading-6 text-[#4b3a2c]">
                Des objets et idées pour rendre chaque bouteille un peu plus
                mémorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 pb-24 md:px-14 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[46px] bg-[#dcc8b1] p-6 text-[#263227] shadow-[0_28px_90px_rgba(0,0,0,.24)] md:p-10">
            <div className="grid gap-6 md:grid-cols-[1.15fr_.85fr]">
              <div className="relative min-h-[620px] overflow-hidden rounded-[36px]">
                <img
                  src="/images/lpv/IMG_0047.JPG"
                  alt={featured.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(47,33,25,.84),rgba(47,33,25,.28),transparent)]" />

                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                  <p className="text-xs uppercase tracking-[0.36em] text-[#caa06b]">
                    Produit vedette
                  </p>

                  <h2 className="lpv-display mt-8 max-w-4xl text-6xl leading-[.82] tracking-[-0.08em] text-[#fff8ee] md:text-8xl">
                    {featured.title}
                  </h2>

                  <p className="mt-8 max-w-xl text-base leading-8 text-[#f3eadf]">
                    {featured.description}
                  </p>

                  <Link
                    href="/sommelier"
                    className="mt-10 inline-flex rounded-full bg-[#caa06b] px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#263227]"
                  >
                    M’inspirer →
                  </Link>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-[34px] bg-[#f3eadf] p-8">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#8f6242]">
                    Dans la collection
                  </p>

                  <p className="mt-8 lpv-display text-5xl leading-[.86] tracking-[-0.08em]">
                    Des objets pour les soupers qui s’étirent.
                  </p>

                  <p className="mt-6 text-sm leading-7 text-[#4b3a2c]">
                    Guides, carnets, coffrets, cartes cadeaux et idées à offrir,
                    pensés comme une petite cave de ressources utiles.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative overflow-hidden rounded-[32px]">
                    <img
                      src="/images/lpv/cave.jpg"
                      alt="Cave privée"
                      className="h-[300px] w-full object-cover"
                    />
                  </div>

                  <div className="relative overflow-hidden rounded-[32px]">
                    <img
                      src="/images/lpv/IMG_0049.JPG"
                      alt="Bouteille"
                      className="h-[300px] w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.title}
                className="group overflow-hidden rounded-[34px] bg-[#dcc8b1] text-[#263227] shadow-[0_22px_70px_rgba(0,0,0,.16)] transition duration-700 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(0,0,0,.26)]"
              >
                <div className="relative h-[300px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(47,40,31,.72),transparent_58%)]" />
                  <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.32em] text-[#caa06b]">
                    {product.eyebrow}
                  </p>
                </div>

                <div className="p-7">
                  <h2 className="lpv-display text-5xl leading-[.86] tracking-[-0.08em] text-[#263227]">
                    {product.title}
                  </h2>

                  <p className="mt-6 text-sm leading-7 text-[#4b3a2c]">
                    {product.description}
                  </p>

                  <Link
                    href="/sommelier"
                    className="mt-8 inline-flex rounded-full border border-[#8f6242]/35 px-5 py-3 text-xs uppercase tracking-[0.22em] text-[#8f6242] transition duration-500 hover:bg-[#8f6242] hover:text-[#fff8ee]"
                  >
                    M’inspirer
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-8 py-24 md:px-14 md:py-32">
        <img
          src="/images/lpv/IMG_0049.JPG"
          alt="Collection privée"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,33,25,.94),rgba(47,33,25,.58))]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.42em] text-[#caa06b]">
            À venir
          </p>
          <h2 className="lpv-display mt-6 max-w-5xl text-6xl leading-[.84] tracking-[-0.08em] md:text-9xl">
            Une boutique pour les gens qui aiment recevoir.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d7c3b1]">
            Pas un magasin froid. Une collection lente, utile et chaleureuse,
            pensée pour les soupers, les cadeaux et les bouteilles qu’on garde
            en mémoire.
          </p>
        </div>
      </section>
    </main>
  );
}
