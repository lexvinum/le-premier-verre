import Link from "next/link";

const pairings = [
  {
    occasion: "Souper de semaine",
    title: "Pâtes, pizza, plats simples",
    wine: "Rouge léger, blanc sec ou bulles accessibles",
    description:
      "Des accords faciles, pensés pour les repas rapides où le vin doit accompagner sans compliquer.",
    image: "/images/lpv/IMG_0045.JPG",
  },
  {
    occasion: "Recevoir",
    title: "Planche, apéro, grande tablée",
    wine: "Bulles, rosé gastronomique ou rouge souple",
    description:
      "Des bouteilles polyvalentes qui plaisent à plusieurs goûts et gardent la soirée fluide.",
    image: "/images/lpv/IMG_0040.JPG",
  },
  {
    occasion: "Poisson & fruits de mer",
    title: "Frais, salin, délicat",
    wine: "Blanc vif, muscadet, chablis ou vinho verde",
    description:
      "Des vins précis et lumineux pour accompagner les plats iodés sans les écraser.",
    image: "/images/lpv/IMG_0042.JPG",
  },
  {
    occasion: "Viande & grillades",
    title: "BBQ, braisé, steak",
    wine: "Rouge structuré, syrah, cabernet franc ou tempranillo",
    description:
      "Des accords plus profonds pour les plats savoureux, fumés ou longuement mijotés.",
    image: "/images/lpv/pexels-katerina-208341981-11710927.jpg",
  },
  {
    occasion: "Fromages",
    title: "Doux, crémeux, salé",
    wine: "Bulles, blanc aromatique ou rouge léger",
    description:
      "Des idées simples pour éviter les mauvais réflexes et trouver le bon équilibre.",
    image: "/images/lpv/table-vin.jpg",
  },
  {
    occasion: "Dessert",
    title: "Chocolat, fruits, pâtisserie",
    wine: "Vin doux, bulles demi-sec ou porto",
    description:
      "Des accords de fin de repas qui restent élégants, sans devenir trop lourds.",
    image: "/images/lpv/IMG_0041.JPG",
  },
];

export default function AccordsPage() {
  return (
    <main className="bg-[#efe6d7] text-[#263227]">
      <section className="relative overflow-hidden px-8 py-20 md:px-14 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(217,183,131,.30),transparent_32%),radial-gradient(circle_at_88%_38%,rgba(113,115,91,.14),transparent_34%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.42em] text-[#8f6242]">
              Accords
            </p>

            <h1 className="lpv-display max-w-5xl text-[clamp(5rem,10vw,11rem)] leading-[0.76] tracking-[-0.09em]">
              Qu’est-ce
              <br />
              qu’on mange?
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#4b3a2c]">
              Des idées d’accords simples, belles et pratiques pour choisir une
              bouteille selon le repas, l’occasion ou l’envie du moment.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sommelier"
                className="rounded-full bg-[#120f0d] px-7 py-3 text-xs uppercase tracking-[0.22em] text-[#fff8ee] transition duration-500 hover:bg-[#6f5c48]"
              >
                Demander au sommelier
              </Link>

              <Link
                href="/vins"
                className="rounded-full border border-[#4b3a2c]/25 px-7 py-3 text-xs uppercase tracking-[0.22em] text-[#263227] transition duration-500 hover:bg-[#263227] hover:text-[#fff8ee]"
              >
                Explorer les vins
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/lpv/IMG_0040.JPG"
              alt="Service du vin"
              className="h-[620px] w-full rounded-[42px] object-cover shadow-[0_28px_90px_rgba(51,41,29,.18)]"
            />

            <div className="absolute -bottom-8 -left-8 hidden max-w-sm rounded-[30px] bg-[#3b2a20] p-7 text-[#fff8ee] shadow-2xl md:block">
              <p className="text-xs uppercase tracking-[0.34em] text-[#d9b783]">
                Réflexe pratique
              </p>
              <p className="mt-4 lpv-display text-5xl leading-[.86]">
                Un plat.
                <br />
                Une envie.
                <br />
                Une bouteille.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-16 md:px-14 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.42em] text-[#8f6242]">
                Guides rapides
              </p>

              <h2 className="lpv-display text-[clamp(4rem,7vw,8rem)] leading-[0.82] tracking-[-0.08em]">
                Les accords essentiels.
              </h2>
            </div>

            <p className="max-w-2xl text-xl leading-relaxed text-[#4b3a2c]">
              Des raccourcis pour les soirs où l’on veut bien manger, bien boire,
              et ne pas transformer le choix du vin en devoir.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pairings.map((pairing) => (
              <article
                key={pairing.occasion}
                className="group overflow-hidden rounded-[34px] bg-[#f7f0e6] shadow-[0_22px_70px_rgba(51,41,29,.11)] transition duration-700 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(51,41,29,.18)]"
              >
                <div className="relative h-[260px] overflow-hidden">
                  <img
                    src={pairing.image}
                    alt={pairing.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(51,41,29,.48),transparent_58%)]" />
                  <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.32em] text-[#fff8ee]">
                    {pairing.occasion}
                  </p>
                </div>

                <div className="p-7">
                  <h3 className="lpv-display text-5xl leading-[0.85] tracking-[-0.08em]">
                    {pairing.title}
                  </h3>

                  <p className="mt-6 text-sm font-medium leading-6 text-[#263227]">
                    {pairing.wine}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-[#5f5447]">
                    {pairing.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#6f5c48] px-8 py-24 text-[#fff8ee] md:px-14 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.05fr_.95fr] md:items-center">
          <img
            src="/images/lpv/IMG_0041.JPG"
            alt="Bouteilles au frais"
            className="h-[560px] w-full rounded-[42px] object-cover opacity-95 shadow-[0_28px_90px_rgba(0,0,0,.18)]"
          />

          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[#d9b783]">
              Notes de table
            </p>
            <h2 className="lpv-display mt-6 max-w-3xl text-6xl leading-[0.84] tracking-[-0.08em] md:text-8xl">
              Le bon accord n’a pas besoin d’être parfait.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#f3eadf]">
              Il doit simplement rendre le repas plus agréable, garder la soirée
              fluide et donner envie de reprendre une gorgée.
            </p>
            <Link
              href="/sommelier?prompt=Je veux un accord mets et vin pour ce soir."
              className="mt-10 inline-block rounded-full bg-[#d9b783] px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#263227]"
            >
              Trouver un accord
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
