import ScanExperience from "@/components/scan/ScanExperience";

export default function ScanPage() {
  return (
    <main className="bg-[#2f2119] text-[#fff8ee]">
      <section className="relative overflow-hidden px-8 py-24 md:px-14 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#5a3828_0%,#432b21_35%,#2b1c17_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(202,160,107,.18),transparent_32%),radial-gradient(circle_at_82%_30%,rgba(255,248,238,.08),transparent_34%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[#caa06b]">
              Scan
            </p>

            <h1 className="lpv-display mt-6 text-[clamp(5rem,10vw,11rem)] leading-[0.76] tracking-[-0.09em]">
              Scanner
              <br />
              une bouteille.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d7c3b1]">
              Dépose une photo de bouteille, d’étiquette, de carte des vins ou de
              capture SAQ. Le Premier Verre tente de reconnaître la bouteille et
              de l’ouvrir dans ton répertoire.
            </p>
          </div>

          <div className="relative">
            <img
              src="/images/lpv/IMG_0040.JPG"
              alt="Scan de bouteille"
              className="h-[580px] w-full rounded-[42px] object-cover opacity-90 shadow-[0_28px_90px_rgba(0,0,0,.30)]"
            />
            <div className="absolute -bottom-8 -left-8 hidden max-w-xs rounded-[30px] bg-[#dcc8b1] p-6 text-[#263227] shadow-2xl md:block">
              <p className="text-xs uppercase tracking-[0.32em] text-[#8f6242]">
                OCR + carnet
              </p>
              <p className="mt-4 text-sm leading-6 text-[#4b3a2c]">
                Reconnaître, ouvrir la fiche, garder la bouteille.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 pb-24 md:px-14 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <ScanExperience />
        </div>
      </section>
    </main>
  );
}
