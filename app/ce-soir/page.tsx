import Link from "next/link";

const moments = [
  {
    number: "01",
    eyebrow: "À table",
    title: "Je cuisine.",
    description:
      "Trouver une bouteille selon le plat, la sauce, la saison ou simplement ce qu’il reste dans le frigo.",
    href: "/sommelier?prompt=Je cuisine ce soir. Aide-moi à choisir un vin.",
  },
  {
    number: "02",
    eyebrow: "Recevoir",
    title: "Je reçois.",
    description:
      "Une bouteille rassembleuse qui accompagne la table sans prendre toute la place.",
    href: "/sommelier?prompt=Je reçois des invités. Quel vin devrais-je servir ?",
  },
  {
    number: "03",
    eyebrow: "Apporter",
    title: "J’arrive avec une bouteille.",
    description:
      "Trouver une valeur sûre selon le budget, l’occasion et les personnes autour de la table.",
    href: "/sommelier?prompt=Je cherche une bouteille à apporter en cadeau.",
  },
  {
    number: "04",
    eyebrow: "Découvrir",
    title: "Je veux être surpris.",
    description:
      "Sortir de ses habitudes avec une bouteille moins évidente et quelque chose à raconter.",
    href: "/vins",
  },
  {
    number: "05",
    eyebrow: "Sortir",
    title: "Je veux aller quelque part.",
    description:
      "Un bar à vin, un restaurant, un caviste ou une adresse à garder pour plus tard.",
    href: "/bonnes-adresses",
  },
  {
    number: "06",
    eyebrow: "Instinct",
    title: "Je ne sais pas.",
    description:
      "Quelques questions simples pour trouver la bouteille qui correspond au moment.",
    href: "/sommelier?prompt=Je ne sais pas quoi boire ce soir.",
  },
];

export default function CeSoirPage() {
  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-12 py-16 md:grid-cols-[0.68fr_0.32fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Ce soir
            </p>

            <h1 className="lpv-display mt-7 max-w-6xl text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              Qu’est-ce
              <br />
              qu’on ouvre?
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
              Commence par le moment. Le repas, les gens, l’envie ou le budget
              viennent ensuite.
            </p>

            <Link
              href="/sommelier"
              className="lpv-text-link mt-8"
            >
              Demander au sommelier <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="lpv-container py-16 md:py-24">
        <div className="border-b border-[var(--lpv-line)] pb-6">
          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            Choisir le moment
          </p>

          <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
            Par où commencer.
          </h2>
        </div>

        <div>
          {moments.map((moment) => (
            <Link
              key={moment.number}
              href={moment.href}
              className="group grid gap-5 border-b border-[var(--lpv-line)] py-8 transition-opacity hover:opacity-60 md:grid-cols-[70px_0.9fr_1.1fr_30px] md:items-center md:py-10"
            >
              <span className="text-[0.62rem] tracking-[0.18em] text-[var(--lpv-muted)]">
                {moment.number}
              </span>

              <div>
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  {moment.eyebrow}
                </p>

                <h3 className="lpv-display mt-4 text-[clamp(3rem,5vw,5.5rem)] leading-[0.88]">
                  {moment.title}
                </h3>
              </div>

              <p className="max-w-xl text-sm leading-7 text-[var(--lpv-muted)]">
                {moment.description}
              </p>

              <span className="text-xl transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--lpv-line)] bg-[var(--lpv-paper-light)]">
        <div className="lpv-container grid gap-12 py-16 md:grid-cols-[0.38fr_0.62fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Recommandation rapide
            </p>

            <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
              Une bouteille
              <br />
              pour l’humeur.
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-lg leading-8 text-[var(--lpv-muted)]">
              Le vin du soir dépend rarement d’une seule chose. Il dépend de la
              faim, de l’énergie, de la lumière et de ce qu’il reste à raconter.
            </p>

            <Link
              href="/sommelier?prompt=Je veux une recommandation rapide pour ce soir."
              className="lpv-button lpv-button-dark mt-9"
            >
              Me recommander un vin
            </Link>
          </div>
        </div>
      </section>

      <section className="lpv-container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-3">
          <Link
            href="/vins"
            className="group border-t border-[var(--lpv-line)] pt-6"
          >
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Répertoire
            </p>

            <h2 className="lpv-display mt-6 text-4xl leading-[0.92] md:text-5xl">
              Voir toutes
              <br />
              les bouteilles.
            </h2>

            <span className="lpv-text-link mt-8">
              Explorer <span>→</span>
            </span>
          </Link>

          <Link
            href="/guides"
            className="group border-t border-[var(--lpv-line)] pt-6"
          >
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Comprendre
            </p>

            <h2 className="lpv-display mt-6 text-4xl leading-[0.92] md:text-5xl">
              Lire sans
              <br />
              trop compliquer.
            </h2>

            <span className="lpv-text-link mt-8">
              Voir les guides <span>→</span>
            </span>
          </Link>

          <Link
            href="/bonnes-adresses"
            className="group border-t border-[var(--lpv-line)] pt-6"
          >
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Sortir
            </p>

            <h2 className="lpv-display mt-6 text-4xl leading-[0.92] md:text-5xl">
              Trouver une
              <br />
              bonne adresse.
            </h2>

            <span className="lpv-text-link mt-8">
              Découvrir <span>→</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
