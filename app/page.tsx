import Link from "next/link";
import { LPV_HOME_IMAGES } from "@/lib/lpv-home-images";

const img = (group: keyof typeof LPV_HOME_IMAGES, index = 0) =>
  LPV_HOME_IMAGES[group]?.[index]?.src;

function Photo({
  src,
  alt = "",
  className = "",
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return src ? (
    <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />
  ) : (
    <div className={`h-full w-full bg-[#c8b89f] ${className}`} />
  );
}

export default function HomePage() {
  return (
    <main className="bg-[#efe6d7] text-[#263227]">
      <section className="relative min-h-[88vh] overflow-hidden">
        <Photo
          src="/images/lpv/IMG_0042.JPG"
          alt="Verre de rosé devant la lune"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,50,39,.54),rgba(38,50,39,.12),rgba(38,50,39,.04))]" />

        <div className="relative z-10 flex min-h-[88vh] flex-col justify-between px-8 py-10 text-[#fff8ee] md:px-14">
          <div className="flex justify-between text-xs uppercase tracking-[0.34em]">
            <span>Le Premier Verre</span>
            <span>Guide vin francophone</span>
          </div>

          <div className="max-w-4xl pb-10">
            <h1 className="lpv-display text-[18vw] leading-[0.76] tracking-[-0.08em] md:text-[10vw]">
              boire
              <br />
              mieux.
            </h1>
            <div className="mt-8 flex items-center gap-5">
              <Link href="/ce-soir" className="rounded-full bg-[#d9b783] px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#263227]">
                Ce soir
              </Link>
              <Link href="/sommelier" className="text-xs uppercase tracking-[0.28em] underline underline-offset-8">
                Demander au sommelier
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="lpv-paper px-8 py-24 md:px-14 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1.05fr_.95fr] md:items-end">
          <div>
            <p className="mb-8 text-xs uppercase tracking-[0.34em] text-[#71735b]">Éditorial</p>
            <h2 className="lpv-display max-w-3xl text-6xl leading-[0.84] tracking-[-0.08em] md:text-8xl">
              Une plateforme qui prend son temps.
            </h2>
          </div>
          <p className="max-w-xl text-2xl leading-relaxed text-[#33291d]">
            Le Premier Verre n’est pas un catalogue. C’est un carnet de moments :
            une lumière, une table, une bouteille, une envie de recevoir sans trop
            compliquer les choses.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl gap-6 md:grid-cols-4">
          <Link href="/blog" className="lpv-tile group md:col-span-2">
            <Photo src="/images/lpv/IMG_0045.JPG" alt="Table de vin" className="aspect-[4/5] transition duration-700 group-hover:scale-[1.03]" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#9e6b44]">Article du mois</p>
              <h3 className="mt-4 lpv-display text-4xl leading-[.9]">Recevoir sans cérémonie.</h3>
              <p className="mt-4 text-sm leading-6 text-[#5f5447]">Une façon plus douce de penser le vin, la table et le moment.</p>
            </div>
          </Link>

          <Link href="/vins" className="lpv-tile group">
            <Photo src="/images/lpv/IMG_0041.JPG" alt="Bouteille coup de coeur" className="aspect-[3/4] transition duration-700 group-hover:scale-[1.03]" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#9e6b44]">Coup de cœur</p>
              <h3 className="mt-4 lpv-display text-3xl leading-[.9]">La bouteille du moment.</h3>
            </div>
          </Link>

          <Link href="/accords" className="lpv-tile group">
            <Photo src="/images/lpv/IMG_0043.JPG" alt="Accords" className="aspect-[3/4] transition duration-700 group-hover:scale-[1.03]" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#9e6b44]">À table</p>
              <h3 className="mt-4 lpv-display text-3xl leading-[.9]">Les bons accords.</h3>
            </div>
          </Link>
        </div>
      </section>

      
      <section className="lpv-paper px-8 py-20 md:px-14 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-5">
          <Photo src="/images/lpv/IMG_0040.JPG" alt="Service du vin" className="aspect-[3/4] rounded-[30px]" />
          <Photo src="/images/lpv/IMG_0046.JPG" alt="Raisins" className="aspect-[3/4] rounded-[30px] md:translate-y-12" />
          <div className="flex flex-col justify-center rounded-[30px] bg-[#3b2a20] p-8 text-[#fff8ee]">
            <p className="text-xs uppercase tracking-[0.34em] text-[#d9b783]">Carnet visuel</p>
            <h2 className="mt-6 lpv-display text-5xl leading-[.86]">
              Des images qui donnent envie de rester à table.
            </h2>
          </div>
          <Photo src="/images/lpv/IMG_0049.JPG" alt="Vendanges" className="aspect-[3/4] rounded-[30px] md:-translate-y-8" />
          <Photo src="/images/lpv/IMG_0042.JPG" alt="Verres en bord de mer" className="aspect-[3/4] rounded-[30px] md:translate-y-6" />
        </div>
      </section>


      <section className="lpv-paper px-8 py-24 md:px-14 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.15fr_.85fr]">
          <Link
            href="/blog"
            className="group relative overflow-hidden rounded-[36px] bg-[#3b2a20] text-[#fff8ee] shadow-[0_28px_90px_rgba(51,41,29,.18)]"
          >
            <Photo
              src="/images/lpv/IMG_0043.JPG"
              alt="Article à la une"
              className="h-[680px] opacity-90 transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(59,42,32,.88),rgba(59,42,32,.22),transparent)]" />
            <div className="absolute bottom-0 left-0 max-w-3xl p-8 md:p-12">
              <p className="mb-6 text-xs uppercase tracking-[0.34em] text-[#d9b783]">
                Article à la une
              </p>
              <h2 className="lpv-display text-6xl leading-[.84] tracking-[-0.08em] md:text-8xl">
                L’art de choisir une bouteille sans casser le moment.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#f3eadf]">
                Une lecture plus sensible du vin : moins de performance, plus de table,
                de lumière, de saison et d’instinct.
              </p>
              <span className="mt-10 inline-block text-xs uppercase tracking-[0.28em] text-[#d9b783]">
                Lire l’article →
              </span>
            </div>
          </Link>

          <Link
            href="/vins"
            className="group flex flex-col overflow-hidden rounded-[36px] bg-[#75664f] text-[#fff8ee] shadow-[0_28px_90px_rgba(51,41,29,.15)]"
          >
            <Photo
              src="/images/lpv/IMG_0049.JPG"
              alt="Bouteille coup de coeur du mois"
              className="h-[430px] transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
              <div>
                <p className="mb-6 text-xs uppercase tracking-[0.34em] text-[#f1d8aa]">
                  Bouteille du mois
                </p>
                <h2 className="lpv-display text-5xl leading-[.86] tracking-[-0.08em]">
                  Le coup de cœur à ouvrir maintenant.
                </h2>
                <p className="mt-7 text-base leading-relaxed text-[#f6efe7]">
                  Une bouteille qui accompagne un souper simple, une fin de journée
                  lente ou un dimanche qui s’étire.
                </p>
              </div>
              <span className="mt-10 inline-block text-xs uppercase tracking-[0.28em] text-[#f1d8aa]">
                Voir la recommandation →
              </span>
            </div>
          </Link>
        </div>
      </section>

<section className="bg-[#6f5c48] px-8 py-24 text-[#fff8ee] md:px-14 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="mb-8 text-xs uppercase tracking-[0.34em] text-[#d9b783]">Sommelier</p>
            <h2 className="lpv-display text-6xl leading-[.84] tracking-[-0.08em] md:text-8xl">
              Une réponse qui goûte quelque chose.
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-2xl leading-relaxed text-[#f3eadf]">
              Pas de notes froides. Pas de jargon inutile. Juste une façon plus
              intuitive de trouver le bon vin pour le bon moment.
            </p>
            <Link href="/sommelier" className="mt-10 inline-block rounded-full border border-[#f3eadf]/40 px-8 py-3 text-xs uppercase tracking-[0.28em]">
              Essayer
            </Link>
          </div>
        </div>
      </section>

      <section className="lpv-paper px-8 py-24 md:px-14 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4">
            <p className="mb-8 text-xs uppercase tracking-[0.34em] text-[#71735b]">Collections</p>
            <h2 className="lpv-display text-6xl leading-[.84] tracking-[-0.08em]">
              Des listes comme des carnets.
            </h2>
          </div>

          <Photo src="/images/lpv/IMG_0047.JPG" alt="Vignoble" className="aspect-[4/5] md:col-span-4" />

          <div className="md:col-span-3 md:col-start-10">
            <Photo src="/images/lpv/IMG_0048.JPG" alt="Bouteille" className="mb-8 aspect-square rounded-[28px]" />
            <p className="text-lg leading-relaxed text-[#4b3a2c]">
              Bulles de fin d’après-midi, rouges de chalet, blancs de comptoir,
              bouteilles à moins de 25 $ qui ont de la tenue.
            </p>
            <Link href="/vins" className="mt-8 inline-block text-xs uppercase tracking-[0.28em] underline underline-offset-8">
              Voir les vins
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#3b3b2f] px-8 py-24 text-[#fff8ee] md:px-14 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <Photo src="/images/lpv/IMG_0044.JPG" alt="Courrier" className="aspect-[4/5] md:col-span-1" />
          <div className="flex flex-col justify-center md:col-span-2">
            <p className="mb-8 text-xs uppercase tracking-[0.34em] text-[#d9b783]">Courrier</p>
            <h2 className="lpv-display max-w-4xl text-6xl leading-[.84] tracking-[-0.08em] md:text-8xl">
              Une lettre à ouvrir avant le week-end.
            </h2>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-[#efe6d7]">
              Sélections, accords, producteurs, bouteilles à surveiller et petites
              idées pour mieux boire, sans prétention.
            </p>
            <Link href="/blog" className="mt-10 w-fit text-xs uppercase tracking-[0.28em] underline underline-offset-8">
              Découvrir
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
