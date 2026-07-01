"use client";

import { useState } from "react";

export default function PremiumCheckoutButton() {
  const [loading, setLoading] = useState(false);

  async function checkout() {
    setLoading(true);

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
      return;
    }

    alert(data?.error ?? "Impossible de démarrer l’abonnement.");
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={checkout}
      disabled={loading}
      className="rounded-full bg-[#caa06b] px-8 py-3 text-xs uppercase tracking-[0.28em] text-[#263227] disabled:opacity-50"
    >
      {loading ? "Ouverture..." : "Devenir membre"}
    </button>
  );
}
