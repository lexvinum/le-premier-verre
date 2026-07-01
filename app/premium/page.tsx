import Image from "next/image";
import Link from "next/link";
import PremiumCheckoutButton from "@/components/membership/PremiumCheckoutButton";

const premiumFeatures = [
  {
    title: "Ma Cave",
    text: "Un espace élégant pour garder en mémoire tes bouteilles, tes coups de cœur, tes envies et tes achats à refaire.",
  },
  {
    title: "Scanner intelligent",
    text: "Photographie une étiquette et laisse Le Premier Verre retrouver, classer et enrichir la bouteille pour toi.",
  },
  {
    title: "Sommelier IA",
    text: "Des recommandations personnalisées selon ton carnet, tes goûts, ton budget et l’occasion du moment.",
  },
];

const comparison = [
  ["Recherche de vins", "Oui", "Oui"],
  ["Fiches vins éditoriales", "Oui", "Oui"],
  ["Favoris", "Limité", "Illimité"],
  ["Ma Cave", "Aperçu", "Complète"],
  ["Scanner d’étiquettes", "Limité", "Inclus"],
  ["Sommelier IA personnalisé", "Découverte", "Complet"],
  ["Listes intelligentes", "Non", "Oui"],
  ["Guides premium", "Non", "Oui"],
];

const testimonials = [
  {
    quote:
      "J’ai enfin un endroit beau et simple pour me souvenir des bouteilles que j’aime vraiment.",
    name: "Camille",
  },
  {
    quote:
      "Le scanner est devenu mon réflexe à la SAQ. Je gagne du temps et je découvre mieux.",
    name: "Élodie",
  },
  {
    quote:
      "Le sommelier comprend mon style. C’est comme avoir une amie qui connaît le vin.",
    name: "Laurence",
  },
];

const faqs = [
  {
    q: "Est-ce que Premium remplace un sommelier?",
    a: "Non. Premium agit plutôt comme un carnet intelligent et un guide personnel pour t’aider à mieux choisir, retenir et découvrir.",
  },
  {
    q: "Puis-je annuler mon abonnement?",
    a: "Oui. L’abonnement peut être géré via Stripe selon les paramètres de ton compte.",
  },
  {
    q: "Le scanner fonctionne-t-il avec toutes les bouteilles?",
    a: "Il utilise l’OCR existant du site. Les résultats peuvent varier selon la qualité de la photo, mais l’expérience est conçue pour être rapide et utile.",
  },
  {
    q: "Est-ce que mes goûts influencent les recommandations?",
    a: "Oui. Le Sommelier IA tient compte de ton carnet, de tes favoris et de tes préférences lorsque ces données sont disponibles.",
  },
];

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-[#f4efe4] text-[#2b1c17]">
      <section className="relative overflow-hidden bg-[#2b1c17] text-[#f8f1e7]">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/lpv/IMG_0040.jpg"
            alt="Verre de vin dans une ambiance éditoriale"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#2b1c17] via-[#2b1c17]/85 to-[#2b1c17]/35" />

        <div className="relative mx-auto grid min-h-[86vh] max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#c9b98f]">
              Le Premier Verre Premium
            </p>

            <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl">
              Ton carnet de vin devient intelligent.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#eadfcd] md:text-xl">
              Garde les bouteilles que tu aimes, scanne les étiquettes, bâtis ta
              cave personnelle et laisse ton sommelier IA te guider selon tes
              goûts, ton budget et le moment.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <PremiumCheckoutButton />

              <Link
                href="/scanner"
                className="inline-flex items-center justify-center rounded-full border border-[#f8f1e7]/40 px-7 py-3 text-sm font-medium text-[#f8f1e7] transition hover:bg-[#f8f1e7] hover:text-[#2b1c17]"
              >
                Essayer le scanner
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-t-full border border-[#f8f1e7]/20 bg-[#f8f1e7]/10 p-3 shadow-2xl">
              <Image
                src="/images/lpv/IMG_5428.jpg"
                alt="Ambiance vin premium"
                fill
                className="object-cover p-3"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <p className="text-xs uppercase tracking-[0.4em] text-[#7d6b42]">
            L’histoire
          </p>

          <div>
            <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] md:text-6xl">
              Pour celles qui aiment le vin, mais pas les tableaux compliqués.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-9 text-[#5b4638]">
              Le Premier Verre Premium a été pensé comme un carnet personnel :
              beau, simple, sensible. Un endroit pour noter ce qu’on a aimé,
              retrouver une bouteille croisée au détour d’un souper, préparer
              une soirée, choisir un accord ou se laisser surprendre.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#e8decb] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#7d6b42]">
              Pourquoi Premium
            </p>
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-6xl">
              Moins chercher. Mieux choisir. Se souvenir.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {premiumFeatures.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[2rem] border border-[#cdbf9f] bg-[#f8f1e7]/70 p-8 shadow-sm"
              >
                <h3 className="font-serif text-3xl">{feature.title}</h3>
                <p className="mt-5 leading-7 text-[#5b4638]">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-3 lg:px-10">
        {[
          {
            eyebrow: "Ma Cave",
            title: "Tes bouteilles, enfin bien rangées.",
            image: "/images/lpv/IMG_0041.jpg",
            href: "/cave",
          },
          {
            eyebrow: "Scanner",
            title: "Une étiquette devient une fiche.",
            image: "/images/lpv/IMG_0042.jpg",
            href: "/scanner",
          },
          {
            eyebrow: "Sommelier IA",
            title: "Des conseils selon ton vrai goût.",
            image: "/images/lpv/IMG_0043.jpg",
            href: "/sommelier",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group overflow-hidden rounded-[2rem] bg-[#2b1c17] text-[#f8f1e7] shadow-xl"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c17] via-[#2b1c17]/20 to-transparent" />
              <div className="absolute bottom-0 p-7">
                <p className="text-xs uppercase tracking-[0.35em] text-[#d7c79b]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-3xl leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-[#2b1c17] px-6 py-24 text-[#f8f1e7] lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#c9b98f]">
            Gratuit vs Premium
          </p>

          <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-6xl">
            Choisis ton rythme de découverte.
          </h2>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-[#f8f1e7]/15">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead className="bg-[#f8f1e7]/10">
                <tr>
                  <th className="p-5">Fonctionnalité</th>
                  <th className="p-5">Gratuit</th>
                  <th className="p-5">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([feature, free, premium]) => (
                  <tr key={feature} className="border-t border-[#f8f1e7]/10">
                    <td className="p-5 text-[#eadfcd]">{feature}</td>
                    <td className="p-5 text-[#c8bda8]">{free}</td>
                    <td className="p-5 font-medium text-[#f8f1e7]">
                      {premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-[2rem] border border-[#d9ccb1] bg-[#fffaf0] p-8"
            >
              <blockquote className="font-serif text-2xl leading-snug">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm uppercase tracking-[0.25em] text-[#7d6b42]">
                {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-[#ede4d4] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#7d6b42]">
              FAQ
            </p>
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-6xl">
              Quelques réponses avant le premier verre.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-3xl border border-[#d3c3a3] bg-[#f8f1e7] p-6"
              >
                <summary className="cursor-pointer list-none font-serif text-2xl">
                  {faq.q}
                </summary>
                <p className="mt-4 leading-7 text-[#5b4638]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-28 text-[#f8f1e7] lg:px-10">
        <Image
          src="/images/lpv/IMG_0049.jpg"
          alt="Table de vin"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2b1c17]/75" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.4em] text-[#c9b98f]">
            Devenir Premium
          </p>

          <h2 className="font-serif text-5xl leading-tight tracking-[-0.04em] md:text-7xl">
            Commence ton carnet de vin intelligent.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#eadfcd]">
            Une expérience plus personnelle, plus belle et plus utile pour
            choisir les bonnes bouteilles, au bon moment.
          </p>

          <div className="mt-10 flex justify-center">
            <PremiumCheckoutButton />
          </div>
        </div>
      </section>
    </main>
  );
}