"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setStatus(res.ok ? "success" : "error");
    if (res.ok) setEmail("");
  }

  return (
    <form onSubmit={submit} className="mt-12 flex max-w-xl flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ton courriel"
        className="rounded-full bg-[#fff8ee] px-6 py-4 text-[#263227] outline-none sm:flex-1"
      />
      <button
        disabled={status === "loading"}
        className="rounded-full bg-[#caa06b] px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#263227] disabled:opacity-50"
      >
        {status === "loading" ? "..." : "S’inscrire"}
      </button>

      {status === "success" && (
        <p className="sm:col-span-2 text-sm text-[#d7c3b1]">
          C’est noté. Bienvenue dans le Courrier du Premier Verre.
        </p>
      )}

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-[#d7c3b1]">
          Impossible d’inscrire ce courriel pour l’instant.
        </p>
      )}
    </form>
  );
}
