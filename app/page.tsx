import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import NewsletterSignup from "@/components/newsletter/NewsletterSignup";

export const revalidate = 60;

type HomeSettings = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroText?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  introTitle?: string;
  introText?: string;
};

const homeQuery = `*[_type == "siteSettings"][0] {
  heroEyebrow,
  heroTitle,
  heroText,
  primaryButtonLabel,
  primaryButtonHref,
  secondaryButtonLabel,
  secondaryButtonHref,
  introTitle,
  introText
}`;

export default async function Home() {
  const settings = await client.fetch<HomeSettings | null>(homeQuery);

  const heroEyebrow =
    settings?.heroEyebrow || "Maison numérique du vin · Québec";
  const heroTitle = settings?.heroTitle || "Le Premier Verre";
  const heroText =
    settings?.heroText || "Une plateforme éditoriale et technologique pour découvrir le vin autrement.";

  return (
    <main className="min-h-screen bg-[#141f17] text-[#f6efe6]">
      <section className="flex min-h-screen items-center justify-center px-0 py-0">
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#102016] px-6 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,47,35,0.18),transparent_58%),linear-gradient(180deg,#112016_0%,#07110c_100%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <Image
              src="/logo-lex-vinum-new.png"
              alt="Le Premier Verre"
              width={520}
              height={520}
              priority
              className="h-auto w-[132px] opacity-[0.20] brightness-0 invert contrast-110 md:w-[175px]"
            />

            <p className="mt-10 text-[10px] uppercase tracking-[0.34em] text-[#c7b897]/72">
              {heroEyebrow}
            </p>

            <h1 className="mt-7 font-serif text-[3.15rem] leading-[0.98] tracking-[-0.06em] text-[#f8f1e7] md:text-[4.8rem] lg:text-[5.4rem]">
              {heroTitle}
            </h1>

            <p className="mt-7 max-w-lg text-[14px] leading-[2.05] text-[#d8cebf]/76 md:text-[14.5px]">
              {heroText}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {settings?.primaryButtonLabel && settings?.primaryButtonHref ? (
                <Link
                  href={settings.primaryButtonHref}
                  className="rounded-full bg-[#eadac1] px-6 py-3 text-sm font-medium text-[#1a1713]"
                >
                  {settings.primaryButtonLabel}
                </Link>
              ) : null}

              {settings?.secondaryButtonLabel && settings?.secondaryButtonHref ? (
                <Link
                  href={settings.secondaryButtonHref}
                  className="rounded-full border border-white/15 px-6 py-3 text-sm text-[#f6efe6]"
                >
                  {settings.secondaryButtonLabel}
                </Link>
              ) : null}
            </div>

            {(settings?.introTitle || settings?.introText) && (
              <section className="mt-14 max-w-2xl rounded-[28px] border border-white/10 bg-white/5 p-8">
                {settings.introTitle ? (
                  <h2 className="font-serif text-3xl text-[#f8f1e7]">
                    {settings.introTitle}
                  </h2>
                ) : null}

                {settings.introText ? (
                  <p className="mt-4 text-sm leading-8 text-[#d8cebf]/76">
                    {settings.introText}
                  </p>
                ) : null}
              </section>
            )}

            <NewsletterSignup />
          </div>
        </div>
      </section>
    </main>
  );
}