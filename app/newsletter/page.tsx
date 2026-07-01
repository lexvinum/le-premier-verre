import NewsletterForm from "@/components/newsletter/NewsletterForm";

export default function NewsletterPage() {
  return (
    <main className="bg-[#4a372b] px-8 py-24 text-[#fff8ee] md:px-14 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.42em] text-[#caa06b]">Courrier</p>
        <h1 className="lpv-display mt-6 text-[clamp(5rem,10vw,11rem)] leading-[0.76] tracking-[-0.09em]">
          Le courrier
          <br />
          du Premier Verre.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d7c3b1]">
          L’article à la une, la bouteille du mois et les idées à boire avant le week-end.
        </p>

        <NewsletterForm />
      </div>
    </main>
  );
}
