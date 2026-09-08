"use client";

import Link from "next/link";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erreur inscription");
      }

      setStatus("success");
      setFirstName("");
      setEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);
      setStatus("error");
    }
  }

  function resetStatus() {
    if (status !== "idle") {
      setStatus("idle");
    }
  }

  return (
    <div className="mt-12 max-w-3xl md:mt-14">
      <form onSubmit={submit}>
        <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
          <label className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-[#caa06b]">
              Prénom
            </span>

            <input
              type="text"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
                resetStatus();
              }}
              placeholder="Facultatif"
              autoComplete="given-name"
              className="h-14 w-full border-0 border-b border-[#8f7767] bg-transparent px-0 text-base text-[#fff8ee] outline-none placeholder:text-[#a99383] focus:border-[#fff8ee]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-[#caa06b]">
              Courriel
            </span>

            <input
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                resetStatus();
              }}
              placeholder="tonadresse@exemple.com"
              autoComplete="email"
              className="h-14 w-full border-0 border-b border-[#8f7767] bg-transparent px-0 text-base text-[#fff8ee] outline-none placeholder:text-[#a99383] focus:border-[#fff8ee]"
            />
          </label>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-h-12 items-center justify-center border border-[#caa06b] bg-[#caa06b] px-7 text-[11px] uppercase tracking-[0.24em] text-[#263227] transition hover:bg-transparent hover:text-[#fff8ee] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? "Inscription…" : "S’inscrire"}
          </button>
        </div>

        <p className="mt-6 max-w-2xl text-[11px] leading-5 text-[#bfa997]">
          En t’inscrivant, tu acceptes de recevoir l’infolettre du Premier Verre.
          Désinscription possible en tout temps.{" "}
          <Link
            href="/politique-confidentialite"
            className="underline underline-offset-4 transition hover:text-[#fff8ee]"
          >
            Politique de confidentialité
          </Link>
          .
        </p>

        {status === "success" && (
          <div className="mt-7 border-t border-[#725c4d] pt-5">
            <p className="text-sm text-[#fff8ee]">
              Merci — ton inscription est confirmée.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-7 border-t border-[#8f5f55] pt-5">
            <p className="text-sm text-[#f1c7bc]">
              L’inscription n’a pas fonctionné. Réessaie dans un instant.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
