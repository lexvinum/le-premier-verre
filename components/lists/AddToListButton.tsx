"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type WineList = {
  _id: string;
  name: string;
  wines?: {
    _id: string;
  }[];
};

export default function AddToListButton({
  wineId,
}: {
  wineId: string;
}) {
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState<WineList[]>([]);
  const [loading, setLoading] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  async function openMenu() {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (!nextOpen) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/lists", {
        cache: "no-store",
      });

      if (response.status === 401) {
        window.location.href = "/connexion";
        return;
      }

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setLists(Array.isArray(data.lists) ? data.lists : []);
    } catch {
      setError("Impossible de charger tes listes.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleWine(list: WineList) {
    if (pendingId) return;

    const containsWine = (list.wines ?? []).some(
      (wine) => wine._id === wineId
    );

    setPendingId(list._id);
    setError("");

    try {
      const response = await fetch(
        `/api/lists/${encodeURIComponent(list._id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: containsWine ? "remove" : "add",
            wineId,
          }),
        }
      );

      if (response.status === 401) {
        window.location.href = "/connexion";
        return;
      }

      if (!response.ok) {
        throw new Error();
      }

      setLists((current) =>
        current.map((item) => {
          if (item._id !== list._id) return item;

          const wines = item.wines ?? [];

          return {
            ...item,
            wines: containsWine
              ? wines.filter((wine) => wine._id !== wineId)
              : [...wines, { _id: wineId }],
          };
        })
      );
    } catch {
      setError("Impossible de modifier cette liste.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={openMenu}
        aria-expanded={open}
        className="text-xs uppercase tracking-[0.18em] text-[var(--lpv-muted)] transition hover:text-[var(--lpv-ink)]"
      >
        + Liste
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-4 w-[280px] border border-[var(--lpv-line)] bg-[var(--lpv-paper)] p-5 shadow-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--lpv-muted)]">
            Ajouter à une liste
          </p>

          {loading ? (
            <p className="py-5 text-sm text-[var(--lpv-muted)]">
              Chargement…
            </p>
          ) : error ? (
            <p className="py-5 text-sm">{error}</p>
          ) : lists.length === 0 ? (
            <div className="pt-5">
              <p className="text-sm text-[var(--lpv-muted)]">
                Tu n’as encore aucune liste.
              </p>

              <Link
                href="/mes-listes"
                className="mt-4 inline-flex border-b border-[var(--lpv-ink)] pb-1 text-xs uppercase tracking-[0.18em]"
              >
                Créer une liste →
              </Link>
            </div>
          ) : (
            <div className="mt-4 border-t border-[var(--lpv-line)]">
              {lists.map((list) => {
                const selected = (list.wines ?? []).some(
                  (wine) => wine._id === wineId
                );

                return (
                  <button
                    key={list._id}
                    type="button"
                    disabled={pendingId === list._id}
                    onClick={() => toggleWine(list)}
                    className="flex w-full items-center justify-between gap-4 border-b border-[var(--lpv-line)] py-4 text-left text-sm transition hover:opacity-60 disabled:opacity-40"
                  >
                    <span>{list.name}</span>
                    <span aria-hidden="true">
                      {selected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}

              <Link
                href="/mes-listes"
                className="mt-5 inline-flex text-xs uppercase tracking-[0.18em] text-[var(--lpv-muted)]"
              >
                Gérer mes listes →
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
