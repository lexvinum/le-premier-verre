"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Entry = {
  favorite: boolean;
  tasted: boolean;
  buyAgain: boolean;
  gift: boolean;
  avoid: boolean;
  rating: number | null;
  note: string | null;
  location: string | null;
  tastedAt: string | null;
};

export function WineJournalButton({ wineId }: { wineId: string }) {
  const { isSignedIn } = useUser();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isSignedIn) return;

    fetch(`/api/journal/${wineId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setEntry(data?.entry ?? null))
      .catch(() => null);
  }, [isSignedIn, wineId]);

  async function save(next: Partial<Entry>) {
    if (!isSignedIn) {
      window.location.href = "/sign-in";
      return;
    }

    setSaving(true);

    const payload = {
      favorite: next.favorite ?? entry?.favorite ?? false,
      tasted: next.tasted ?? entry?.tasted ?? false,
      buyAgain: next.buyAgain ?? entry?.buyAgain ?? false,
      gift: next.gift ?? entry?.gift ?? false,
      avoid: next.avoid ?? entry?.avoid ?? false,
      rating: next.rating ?? entry?.rating ?? null,
      note: next.note ?? entry?.note ?? null,
      location: next.location ?? entry?.location ?? null,
      tastedAt: next.tastedAt ?? entry?.tastedAt ?? null,
    };

    const res = await fetch(`/api/journal/${wineId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setEntry(data.entry);
    setSaving(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full bg-[#caa06b] px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#263227] transition hover:bg-[#dcc8b1]"
      >
        {entry ? "Dans mon carnet" : "Ajouter au carnet"}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-[320px] rounded-[28px] bg-[#2f2119] p-5 text-[#fff8ee] shadow-[0_24px_80px_rgba(0,0,0,.35)]">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#caa06b]">
            Mon carnet
          </p>

          <div className="grid gap-2">
            {[
              ["favorite", "❤️ Favori"],
              ["tasted", "🍷 Goûté"],
              ["buyAgain", "🔁 À racheter"],
              ["gift", "🎁 À offrir"],
              ["avoid", "👎 À éviter"],
            ].map(([key, label]) => {
              const active = Boolean(entry?.[key as keyof Entry]);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => save({ [key]: !active } as Partial<Entry>)}
                  disabled={saving}
                  className={`rounded-full px-4 py-3 text-left text-sm transition ${
                    active
                      ? "bg-[#caa06b] text-[#263227]"
                      : "bg-[#3b2a20] text-[#d7c3b1] hover:bg-[#4a372b]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#caa06b]">
              Note
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => save({ rating })}
                  disabled={saving}
                  className={`text-2xl ${
                    (entry?.rating ?? 0) >= rating
                      ? "text-[#caa06b]"
                      : "text-[#6f5c48]"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
