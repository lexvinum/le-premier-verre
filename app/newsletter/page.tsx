import NewsletterForm from "@/components/newsletter/NewsletterForm";

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-[#4a372b] px-6 py-20 text-[#fff8ee] sm:px-8 md:px-14 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-5xl">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[#caa06b]">
            L’infolettre
          </p>

          <h1 className="lpv-display mt-5 max-w-5xl text-[clamp(4.4rem,9vw,9rem)] leading-[0.82] tracking-[-0.075em]">
            Le prochain verre
            <br />
            commence ici.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-[#d7c3b1] md:text-lg md:leading-8">
            Nos découvertes, nouvelles bouteilles, endroits à visiter et bonnes
            raisons d’ouvrir quelque chose.
          </p>
        </div>

        <NewsletterForm />
      </div>
    </main>
  );
}
