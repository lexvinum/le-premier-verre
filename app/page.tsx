"use client";

import Image from "next/image";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erreur inscription");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#141f17] text-[#f6efe6]">
      <section className="flex min-h-screen items-center justify-center px-0 py-0">
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#102016] px-6 py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,47,35,0.18),transparent_58%),linear-gradient(180deg,#112016_0%,#07110c_100%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <Image
              src="/logo-lex-vinum-new.png"
              alt="Lex Vinum"
              width={520}
              height={520}
              priority
              className="h-auto w-[132px] opacity-[0.20] brightness-0 invert contrast-110 md:w-[175px]"
            />

            <p className="mt-10 text-[10px] uppercase tracking-[0.34em] text-[#c7b897]/72">
              Maison numérique du vin · Digital wine house
            </p>

            <h1 className="mt-7 font-serif text-[3.15rem] leading-[0.98] tracking-[-0.06em] text-[#f8f1e7] md:text-[4.8rem] lg:text-[5.4rem]">
              Disponible
              <span className="block italic font-light text-[#d8c8aa]">
                bientôt.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-[14px] leading-[2.05] text-[#d8cebf]/76 md:text-[14.5px]">
              Une expérience éditoriale raffinée pour découvrir le vin avec
              plus de justesse, de curiosité et d’élégance.
            </p>

            <p className="mt-3 max-w-xl text-sm italic leading-7 text-[#c6bba9]/68">
              A refined digital wine experience — curated, intuitive and quietly elegant.
            </p>

            <section className="mt-12 w-full max-w-2xl overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#f9f4ec_0%,#f3eadc_100%)] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.18)] md:p-10">
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#b88a55]">
                Courrier Lex Vinum
              </p>

              <h2 className="mt-4 font-serif text-[1.95rem] leading-[1.02] tracking-[-0.045em] text-[#241c17] md:text-[2.45rem]">
                Recevoir la première invitation.
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-7 flex flex-col gap-4 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="votre@email.com"
                  className="min-h-[62px] flex-1 rounded-full border border-[#c8a97a] bg-[#fffdfa] px-7 text-[15px] !text-[#102016] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.98)] transition-all duration-300 placeholder:!text-[#102016] placeholder:!opacity-100 focus:border-[#b88a55] focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,138,85,0.12)]"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="min-h-[58px] rounded-full bg-[#0d2015] px-10 text-sm uppercase tracking-[0.22em] text-[#f7efe4] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-[#173223] disabled:opacity-60"
                >
                  {status === "loading" ? "Inscription..." : "S'inscrire"}
                </button>
              </form>

              <p className="mt-7 text-sm leading-7 text-[#756555]">
                Aucun bruit. Seulement les nouvelles importantes.
                <span className="block italic text-[#8b7967]">
                  No noise. Only meaningful updates.
                </span>
              </p>

              {status === "success" && (
                <p className="mt-4 text-sm text-[#102116]">
                  Merci — votre adresse a bien été inscrite.
                </p>
              )}

              {status === "error" && (
                <p className="mt-4 text-sm text-[#9a544a]">
                  L’inscription n’a pas fonctionné. Réessayez dans un instant.
                </p>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}