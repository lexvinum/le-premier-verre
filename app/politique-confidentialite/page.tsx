import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité | Lex Vinum",
  description: "Politique de confidentialité de Lex Vinum.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-[#102016] px-6 py-16 text-[#f6efe6]">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.24em] text-[#c7b897]/70 transition hover:text-[#f6efe6]"
        >
          ← Retour
        </Link>

        <p className="mt-12 text-[10px] uppercase tracking-[0.34em] text-[#b88a55]">
          Lex Vinum
        </p>

        <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.04em] text-[#f8f1e7] md:text-5xl">
          Politique de confidentialité
        </h1>

        <p className="mt-5 text-sm leading-8 text-[#d8cebf]/76">
          Dernière mise à jour : 31 mai 2026
        </p>

        <div className="mt-12 space-y-10 text-[15px] leading-8 text-[#d8cebf]/82">
          <section>
            <h2 className="font-serif text-2xl text-[#f8f1e7]">
              1. Responsable de la protection des renseignements personnels
            </h2>
            <p className="mt-4">
              Lex Vinum accorde une grande importance à la protection de votre
              vie privée. La personne responsable de la protection des
              renseignements personnels est Laurie Anne Biron.
            </p>
            <p className="mt-4">
              Pour toute question relative à la présente politique, vous pouvez
              nous écrire à{" "}
              <a
                href="mailto:contact@lexvinum.com"
                className="text-[#d8c8aa] underline underline-offset-4"
              >
                contact@lexvinum.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#f8f1e7]">
              2. Renseignements recueillis
            </h2>
            <p className="mt-4">
              Lorsque vous vous inscrivez au Courrier Lex Vinum, nous recueillons
              votre adresse courriel. Nous pouvons également recueillir certaines
              informations techniques liées à votre utilisation du site, comme
              des données de navigation, d’appareil ou de consultation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#f8f1e7]">
              3. Finalités de la collecte
            </h2>
            <p className="mt-4">
              Ces renseignements sont utilisés afin de gérer les inscriptions à
              notre infolettre, transmettre nos communications éditoriales,
              améliorer l’expérience utilisateur, analyser l’utilisation générale
              du site et assurer le bon fonctionnement de nos services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#f8f1e7]">
              4. Infolettre
            </h2>
            <p className="mt-4">
              En vous inscrivant, vous consentez à recevoir le Courrier Lex
              Vinum et certaines communications liées à nos contenus, découvertes
              et activités. Vous pouvez vous désabonner en tout temps au moyen du
              lien prévu à cette fin dans nos courriels.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#f8f1e7]">
              5. Fournisseurs de services
            </h2>
            <p className="mt-4">
              Lex Vinum peut utiliser des fournisseurs externes pour
              l’hébergement du site, la gestion de l’infolettre, l’analyse de
              performance et l’envoi de communications électroniques. Ces
              fournisseurs peuvent traiter ou héberger certaines données à
              l’extérieur du Québec ou du Canada.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#f8f1e7]">
              6. Conservation et sécurité
            </h2>
            <p className="mt-4">
              Nous conservons les renseignements personnels uniquement pour la
              durée raisonnablement nécessaire aux fins décrites dans la présente
              politique. Nous mettons en place des mesures raisonnables afin de
              protéger les renseignements contre l’accès, l’utilisation ou la
              divulgation non autorisés.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#f8f1e7]">
              7. Vos droits
            </h2>
            <p className="mt-4">
              Sous réserve de la loi applicable, vous pouvez demander l’accès à
              vos renseignements personnels, leur rectification ou le retrait de
              votre consentement lorsque celui-ci constitue la base du
              traitement.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#f8f1e7]">
              8. Modifications
            </h2>
            <p className="mt-4">
              Lex Vinum peut modifier la présente politique afin de refléter
              l’évolution de ses activités, technologies ou obligations légales.
              La version la plus récente sera publiée sur cette page.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}