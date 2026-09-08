import Link from "next/link";

const actions = [
  {
    image: "/images/lpv/IMG_9595.JPG",
    eyebrow: "À table",
    title: "Je cuisine",
    description: "Trouver le bon vin selon le repas, l’ambiance et ce que tu as déjà ouvert dans la cuisine.",
    href: "/sommelier?prompt=Je cuisine ce soir. Aide-moi à choisir un vin.",
  },
  {
    image: "/images/lpv/table-vin.jpg",
    eyebrow: "Recevoir",
    title: "Je reçois",
    description: "Des bouteilles qui plaisent facilement, sans tomber dans le vin trop attendu.",
    href: "/sommelier?prompt=Je reçois des invités. Quel vin devrais-je servir ?",
  },
  {
    image: "/images/lpv/bouteille.jpg",
    eyebrow: "Cadeau",
    title: "J’apporte une bouteille",
    description: "Une valeur sûre selon le budget, le contexte et le type de personne qui reçoit.",
    href: "/sommelier?prompt=Je cherche une bouteille à apporter en cadeau.",
  },
  {
    image: "/images/lpv/cave.jpg",
    eyebrow: "Découvrir",
    title: "Je veux être surpris",
    description: "Une bouteille moins évidente, plus curieuse, avec quelque chose à raconter.",
    href: "/vins",
  },
  {
    image: "/images/lpv/vignes.jpg",
    eyebrow: "Sortie",
    title: "Vignobles",
    description: "Préparer une journée lente, belle et bien arrosée, sans trop planifier.",
    href: "/carte",
  },
  {
    image: "/images/lpv/barriques.jpg",
    eyebrow: "Instinct",
    title: "Je ne sais pas",
    description: "Réponds à quelques questions simples et laisse le Sommelier choisir.",
    href: "/sommelier?prompt=Je ne sais pas quoi boire ce soir.",
  },
];

export default function Page() {
  return (
    <main className="bg-[#efe6d7] text-[#263227]">
      <section className="relative overflow-hidden px-8 py-20 md:px-14 md:py-28">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,#9e6b44_0_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.42em] text-[#71735b]">
                Ce soir
              </p>
              <h1 className="lpv-display mt-5 text-[clamp(5rem,11vw,12rem)] leading-[0.76] tracking-[-0.09em]">
                Qu’est-ce
                <br />
                qu’on fait ?
              </h1>
            </div>

            <div className="relative">
              <img
                src="/images/lpv/pexels-katerina-208341981-11710927.jpg"
                alt="Table du soir"
                className="h-[520px] w-full rounded-[38px] object-cover shadow-[0_28px_90px_rgba(51,41,29,.16)]"
              />
              <div className="absolute -bottom-8 -left-8 hidden max-w-xs rounded-[28px] bg-[#3b2a20] p-6 text-[#fff8ee] shadow-2xl md:block">
                <p className="text-xs uppercase tracking-[0.32em] text-[#d9b783]">
                  Le raccourci
                </p>
                <p className="mt-4 text-sm leading-6 text-[#f3eadf]">
                  Choisis le moment. On s’occupe de la bouteille.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {actions.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className="group overflow-hidden rounded-[34px] bg-[#f7f0e6] shadow-[0_22px_70px_rgba(51,41,29,.11)] transition duration-700 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(51,41,29,.18)]"
              >
                <div className="relative h-[320px] overflow-hidden">
                  <img
                    src={action.image}
                    alt={action.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(51,41,29,.45),transparent_55%)]" />
                  <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.32em] text-[#fff8ee]">
                    {action.eyebrow}
                  </p>
                </div>

                <div className="p-7">
                  <h2 className="lpv-display text-5xl leading-[0.86] tracking-[-0.08em]">
                    {action.title}
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-[#5f5447]">
                    {action.description}
                  </p>

                  <p className="mt-8 text-xs uppercase tracking-[0.28em] text-[#9e6b44]">
                    Commencer →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#3b3b2f] px-8 py-20 text-[#fff8ee] md:px-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <img
            src="/images/lpv/vendanges.jpg"
            alt="Vendanges"
            className="h-[520px] w-full rounded-[38px] object-cover opacity-90 shadow-[0_28px_90px_rgba(0,0,0,.18)]"
          />

          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[#d9b783]">
              Recommandation rapide
            </p>
            <h2 className="lpv-display mt-6 max-w-3xl text-6xl leading-[0.84] tracking-[-0.08em] md:text-8xl">
              Une bouteille pour l’humeur, pas juste pour le repas.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#f3eadf]">
              Le vin du soir dépend rarement d’une seule chose. Il dépend de la
              lumière, du niveau d’énergie, de la table, de la faim et de ce qui
              reste à raconter.
            </p>
            <Link
              href="/sommelier?prompt=Je veux une recommandation rapide pour ce soir."
              className="mt-10 inline-block rounded-full bg-[#d9b783] px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#263227]"
            >
              Me recommander un vin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
