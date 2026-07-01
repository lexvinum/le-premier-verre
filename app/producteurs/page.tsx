import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { producersQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Producer = {
  _id: string;
  name: string;
  slug: string;
  country?: { name?: string };
  region?: { name?: string };
};

const producerImages = [
  "/images/lpv/IMG_5428.JPG",
  "/images/lpv/IMG_9670.JPG",
  "/images/lpv/vignes.jpg",
  "/images/lpv/vendanges.jpg",
  "/images/lpv/IMG_9706.JPG",
  "/images/lpv/IMG_9729.JPG",
  "/images/lpv/cave.jpg",
  "/images/lpv/barriques.jpg",
  "/images/lpv/pexels-alisa-skripina-2147548092-35518179.jpg",
];

export default async function ProducersPage() {
  const producers = await client.fetch<Producer[]>(producersQuery);

  return (
    <main className="bg-[#efe6d7] text-[#263227]">
      <section className="relative overflow-hidden px-8 py-24 md:px-14 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(217,183,131,.26),transparent_32%),radial-gradient(circle_at_86%_42%,rgba(113,115,91,.16),transparent_34%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[#71735b]">
              Producteurs
            </p>
            <h1 className="lpv-display mt-6 text-[clamp(5rem,11vw,12rem)] leading-[0.76] tracking-[-0.09em]">
              Ceux qui
              <br />
              font le vin.
            </h1>
          </div>

          <div className="relative">
            <img
              src="/images/lpv/vignes.jpg"
              alt="Vignes"
              className="h-[560px] w-full rounded-[42px] object-cover shadow-[0_28px_90px_rgba(51,41,29,.16)]"
            />
            <div className="absolute -bottom-8 -left-8 hidden max-w-sm rounded-[30px] bg-[#3b2a20] p-7 text-[#fff8ee] shadow-2xl md:block">
              <p className="text-xs uppercase tracking-[0.34em] text-[#d9b783]">
                Répertoire vivant
              </p>
              <p className="mt-4 text-sm leading-7 text-[#f3eadf]">
                Des domaines, des paysages, des gestes et des bouteilles qui ont
                quelque chose à raconter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 pb-24 md:px-14 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#9e6b44]">
                {producers.length} producteur{producers.length > 1 ? "s" : ""}
              </p>
              <h2 className="lpv-display mt-4 text-6xl leading-[.84] tracking-[-0.08em]">
                À découvrir.
              </h2>
            </div>

            <p className="max-w-2xl text-xl leading-relaxed text-[#4b3a2c]">
              Ici, le producteur n’est pas une fiche technique. C’est un lieu,
              une main, une méthode, une saison, une façon de regarder la table.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {producers.map((producer, index) => {
              const location = [producer.region?.name, producer.country?.name]
                .filter(Boolean)
                .join(" · ");

              const image = producerImages[index % producerImages.length];

              return (
                <Link
                  key={producer._id}
                  href={`/producteurs/${producer.slug}`}
                  className="group overflow-hidden rounded-[36px] bg-[#f7f0e6] shadow-[0_22px_70px_rgba(51,41,29,.11)] transition duration-700 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(51,41,29,.18)]"
                >
                  <div className="relative h-[360px] overflow-hidden">
                    <img
                      src={image}
                      alt={producer.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(51,41,29,.54),transparent_58%)]" />
                    <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.32em] text-[#fff8ee]">
                      Domaine
                    </p>
                  </div>

                  <div className="p-7">
                    <h2 className="lpv-display text-5xl leading-[0.86] tracking-[-0.08em]">
                      {producer.name}
                    </h2>

                    {location && (
                      <p className="mt-5 text-sm leading-7 text-[#5f5447]">
                        {location}
                      </p>
                    )}

                    <p className="mt-8 text-xs uppercase tracking-[0.28em] text-[#9e6b44]">
                      Découvrir le domaine →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#6f5c48] px-8 py-24 text-[#fff8ee] md:px-14 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <img
            src="/images/lpv/barriques.jpg"
            alt="Barriques"
            className="h-[560px] w-full rounded-[42px] object-cover opacity-90 shadow-[0_28px_90px_rgba(0,0,0,.18)]"
          />

          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[#d9b783]">
              Carnet de producteurs
            </p>
            <h2 className="lpv-display mt-6 max-w-3xl text-6xl leading-[0.84] tracking-[-0.08em] md:text-8xl">
              Les vins ont toujours une adresse.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#f3eadf]">
              Revenir aux producteurs, c’est revenir à la terre, au geste et au
              rythme lent des choses bien faites.
            </p>
            <Link
              href="/vins"
              className="mt-10 inline-block rounded-full bg-[#d9b783] px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#263227]"
            >
              Explorer les bouteilles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
