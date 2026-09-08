"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";

type ListWine = {
  _id: string;
  name?: string;
  slug?: string;
  vintage?: number;
  approxPrice?: number;
  producer?: {
    name?: string;
  };
};

type WineList = {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  wines?: ListWine[];
};

export default function WineListsClient() {
  const [lists, setLists] = useState<WineList[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const loadLists = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/lists", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Impossible de charger les listes.");
      }

      const data = await response.json();
      setLists(Array.isArray(data.lists) ? data.lists : []);
    } catch {
      setError("Impossible de charger tes listes pour le moment.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  async function createList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName || pending) return;

    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!response.ok) {
        throw new Error("Impossible de créer la liste.");
      }

      setName("");
      await loadLists();
    } catch {
      setError("Impossible de créer cette liste.");
    } finally {
      setPending(false);
    }
  }

  async function deleteList(listId: string) {
    const confirmed = window.confirm(
      "Supprimer cette liste? Les vins ne seront pas supprimés de ton compte."
    );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(
        `/api/lists/${encodeURIComponent(listId)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Impossible de supprimer la liste.");
      }

      setLists((current) =>
        current.filter((list) => list._id !== listId)
      );
    } catch {
      setError("Impossible de supprimer cette liste.");
    }
  }

  async function removeWine(listId: string, wineId: string) {
    setError("");

    try {
      const response = await fetch(
        `/api/lists/${encodeURIComponent(listId)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "remove",
            wineId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Impossible de retirer le vin.");
      }

      setLists((current) =>
        current.map((list) =>
          list._id === listId
            ? {
                ...list,
                wines: (list.wines ?? []).filter(
                  (wine) => wine._id !== wineId
                ),
              }
            : list
        )
      );
    } catch {
      setError("Impossible de retirer ce vin de la liste.");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-10 sm:px-8 md:px-12 lg:px-16">
        <header className="border-b border-[var(--lpv-line)] pb-12 md:pb-16">
          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            Mon espace
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
            <div>
              <h1 className="lpv-display text-[clamp(4.5rem,10vw,10rem)] leading-[0.78] tracking-[-0.075em]">
                Mes listes.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--lpv-muted)]">
                Garde certaines bouteilles ensemble selon l’occasion,
                l’envie ou simplement pour ne pas les oublier.
              </p>
            </div>

            <form
              onSubmit={createList}
              className="border-t border-[var(--lpv-line)] pt-6"
            >
              <label
                htmlFor="list-name"
                className="text-xs uppercase tracking-[0.22em] text-[var(--lpv-muted)]"
              >
                Nouvelle liste
              </label>

              <div className="mt-4 flex border-b border-[var(--lpv-ink)]">
                <input
                  id="list-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={80}
                  placeholder="Ex. À essayer"
                  className="min-w-0 flex-1 bg-transparent py-3 text-lg outline-none placeholder:text-[var(--lpv-muted)]"
                />

                <button
                  type="submit"
                  disabled={!name.trim() || pending}
                  className="px-3 text-xs uppercase tracking-[0.18em] transition disabled:opacity-35"
                >
                  {pending ? "Création…" : "Créer →"}
                </button>
              </div>
            </form>
          </div>
        </header>

        {error ? (
          <p className="border-b border-[var(--lpv-line)] py-5 text-sm">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="py-16 text-sm uppercase tracking-[0.18em] text-[var(--lpv-muted)]">
            Chargement…
          </p>
        ) : lists.length === 0 ? (
          <section className="py-20 md:py-28">
            <p className="lpv-display max-w-3xl text-5xl leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Ta première liste commence par une bouteille.
            </p>

            <Link
              href="/vins"
              className="mt-10 inline-flex border-b border-[var(--lpv-ink)] pb-1 text-xs uppercase tracking-[0.22em]"
            >
              Explorer les vins →
            </Link>
          </section>
        ) : (
          <div>
            {lists.map((list, index) => {
              const wines = list.wines ?? [];

              return (
                <section
                  key={list._id}
                  className="grid gap-8 border-b border-[var(--lpv-line)] py-12 md:grid-cols-[0.28fr_0.72fr] md:py-16"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--lpv-muted)]">
                      Liste {String(index + 1).padStart(2, "0")}
                    </p>

                    <h2 className="lpv-display mt-4 text-5xl leading-[0.9] tracking-[-0.05em] md:text-6xl">
                      {list.name}
                    </h2>

                    <p className="mt-5 text-sm text-[var(--lpv-muted)]">
                      {wines.length} vin{wines.length === 1 ? "" : "s"}
                    </p>

                    <button
                      type="button"
                      onClick={() => deleteList(list._id)}
                      className="mt-8 text-xs uppercase tracking-[0.18em] text-[var(--lpv-muted)] transition hover:text-[var(--lpv-ink)]"
                    >
                      Supprimer la liste
                    </button>
                  </div>

                  <div>
                    {wines.length === 0 ? (
                      <div className="border-t border-[var(--lpv-line)] py-6">
                        <p className="text-sm leading-7 text-[var(--lpv-muted)]">
                          Aucun vin dans cette liste pour le moment.
                        </p>

                        <Link
                          href="/vins"
                          className="mt-5 inline-flex border-b border-[var(--lpv-ink)] pb-1 text-xs uppercase tracking-[0.2em]"
                        >
                          Ajouter une bouteille →
                        </Link>
                      </div>
                    ) : (
                      <div className="border-t border-[var(--lpv-line)]">
                        {wines.map((wine) => (
                          <div
                            key={wine._id}
                            className="flex items-center justify-between gap-6 border-b border-[var(--lpv-line)] py-6"
                          >
                            <Link
                              href={
                                wine.slug
                                  ? `/vins/${wine.slug}`
                                  : "/vins"
                              }
                              className="group min-w-0"
                            >
                              <p className="text-xs uppercase tracking-[0.18em] text-[var(--lpv-muted)]">
                                {wine.producer?.name ?? "Producteur"}
                              </p>

                              <p className="mt-2 text-xl transition group-hover:opacity-60">
                                {wine.name}
                                {wine.vintage ? ` · ${wine.vintage}` : ""}
                              </p>
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                removeWine(list._id, wine._id)
                              }
                              className="shrink-0 text-xs uppercase tracking-[0.18em] text-[var(--lpv-muted)] transition hover:text-[var(--lpv-ink)]"
                            >
                              Retirer
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
