import Link from "next/link";
import PremiumCheckoutButton from "@/components/membership/PremiumCheckoutButton";

type PremiumPaywallProps = {
  title?: string;
  description?: string;
  feature?: string;
};

export default function PremiumPaywall({
  title = "Débloque l’expérience Premium.",
  description = "Passe à Premium pour continuer avec un carnet plus intelligent, des recommandations personnalisées et des outils pensés pour mieux choisir tes bouteilles.",
  feature = "Premium",
}: PremiumPaywallProps) {
  return (
    <section className="relative overflow-hidden rounded-[42px] border border-[#caa06b]/30 bg-[#2b1c17] p-8 text-[#fff8ee] shadow-[0_28px_90px_rgba(0,0,0,.22)] md:p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(202,160,107,.18),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(255,248,238,.08),transparent_30%)]" />

      <div className="relative max-w-2xl">
        <p className="text-xs uppercase tracking-[0.38em] text-[#caa06b]">
          {feature}
        </p>

        <h2 className="lpv-display mt-6 text-5xl leading-[0.86] tracking-[-0.08em] md:text-7xl">
          {title}
        </h2>

        <p className="mt-6 max-w-xl text-base leading-8 text-[#d7c3b1]">
          {description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PremiumCheckoutButton />

          <Link
            href="/premium"
            className="rounded-full border border-[#caa06b]/40 px-8 py-3 text-center text-xs uppercase tracking-[0.28em] text-[#caa06b]"
          >
            Voir Premium
          </Link>
        </div>
      </div>
    </section>
  );
}
