"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { WineJournalButton } from "@/components/journal/WineJournalButton";

type ScanResult = {
  wine?: {
    id?: string;
    slug?: string;
    name?: string;
    producer?: string | null;
    region?: string | null;
    country?: string | null;
    color?: string | null;
    price?: number | null;
    image?: string | null;
  } | null;
  match?: {
    wine?: ScanResult["wine"];
    confidence?: number;
    reason?: string;
  } | null;
  confidence?: number;
  reason?: string;
  candidates?: Array<{
    name?: string;
    producer?: string;
    region?: string;
    country?: string;
    vintage?: number | null;
  }>;
  extracted?: unknown;
  error?: string;
};

function getWine(result: ScanResult | null) {
  return result?.wine ?? result?.match?.wine ?? null;
}

function getConfidence(result: ScanResult | null) {
  return result?.confidence ?? result?.match?.confidence ?? null;
}

function getReason(result: ScanResult | null) {
  return result?.reason ?? result?.match?.reason ?? null;
}

export default function ScanExperience() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const wine = getWine(result);
  const confidence = getConfidence(result);
  const reason = getReason(result);

  const wineHref = wine?.slug ? `/vins/${wine.slug}` : null;
  const wineId = wine?.slug ?? wine?.id ?? null;

  const helper = useMemo(() => {
    if (loading) return "Analyse de l’image, lecture de l’étiquette et comparaison avec le répertoire.";
    if (wine) return "Bouteille reconnue. Tu peux l’ouvrir, la garder ou demander un accord.";
    if (result?.error) return result.error;
    if (result) return "Analyse terminée. Aucun match certain pour l’instant.";
    return "Dépose une photo de bouteille, d’étiquette, de carte des vins ou de capture SAQ.";
  }, [loading, result, wine]);

  function onFile(nextFile: File | null) {
    setFile(nextFile);
    setResult(null);

    if (!nextFile) {
      setPreview(null);
      return;
    }

    setPreview(URL.createObjectURL(nextFile));
  }

  async function scan() {
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("file", file);

    try {
      const res = await fetch("/api/scan/extract", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Impossible d’analyser l’image pour le moment." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
      <div className="rounded-[42px] bg-[#3b2a20] p-6 shadow-[0_28px_90px_rgba(0,0,0,.24)] md:p-8">
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className="flex min-h-[560px] cursor-pointer flex-col items-center justify-center rounded-[34px] border border-dashed border-[#caa06b]/45 bg-[#2f2119] p-8 text-center transition hover:border-[#caa06b]"
        >
          {preview ? (
            <img
              src={preview}
              alt="Aperçu du scan"
              className="max-h-[500px] w-full rounded-[28px] object-contain"
            />
          ) : (
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#caa06b]">
                Déposer une image
              </p>
              <p className="mt-8 lpv-display text-6xl leading-[.84] tracking-[-0.08em] text-[#fff8ee] md:text-8xl">
                Photo,
                <br />
                étiquette,
                <br />
                carte.
              </p>
              <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-[#d7c3b1]">
                Glisse une image ici ou clique pour choisir un fichier.
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={scan}
            disabled={!file || loading}
            className="rounded-full bg-[#caa06b] px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#263227] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {loading ? "Analyse..." : "Scanner"}
          </button>

          <button
            type="button"
            onClick={() => onFile(null)}
            className="rounded-full border border-[#caa06b]/35 px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#caa06b]"
          >
            Recommencer
          </button>
        </div>
      </div>

      <div className="flex min-h-[620px] flex-col justify-between rounded-[42px] bg-[#dcc8b1] p-8 text-[#263227] shadow-[0_28px_90px_rgba(0,0,0,.20)] md:p-10">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-[#8f6242]">
            Résultat
          </p>

          <h2 className="lpv-display mt-8 text-6xl leading-[.84] tracking-[-0.08em] md:text-8xl">
            {wine?.name ?? "Le scan cherche la bouteille."}
          </h2>

          <p className="mt-8 max-w-xl text-base leading-8 text-[#4b3a2c]">
            {helper}
          </p>

          {confidence !== null && confidence !== undefined && (
            <p className="mt-6 text-xs uppercase tracking-[0.28em] text-[#8f6242]">
              Confiance : {confidence}%
            </p>
          )}

          {reason && (
            <p className="mt-3 text-sm leading-7 text-[#5f5447]">
              {reason}
            </p>
          )}

          {wine && (
            <div className="mt-8 rounded-[30px] bg-[#f3eadf] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[#8f6242]">
                Fiche reconnue
              </p>

              <div className="mt-5 space-y-2 text-sm leading-7 text-[#4b3a2c]">
                {wine.producer && <p>Producteur : {wine.producer}</p>}
                {[wine.region, wine.country].filter(Boolean).length > 0 && (
                  <p>{[wine.region, wine.country].filter(Boolean).join(" · ")}</p>
                )}
                {wine.color && <p>Couleur : {wine.color}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {wineHref && (
            <Link
              href={wineHref}
              className="rounded-full bg-[#3b2a20] px-7 py-3 text-xs uppercase tracking-[0.24em] text-[#fff8ee]"
            >
              Voir la fiche
            </Link>
          )}

          {wineId && <WineJournalButton wineId={wineId} />}

          <Link
            href={`/sommelier${wine?.name ? `?prompt=${encodeURIComponent(`Que boire avec ${wine.name}?`)}` : ""}`}
            className="rounded-full border border-[#8f6242]/35 px-7 py-3 text-xs uppercase tracking-[0.24em] text-[#8f6242]"
          >
            Demander au sommelier
          </Link>
        </div>
      </div>
    </div>
  );
}
