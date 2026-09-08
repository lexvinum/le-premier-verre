"use client";

import { useEffect, useState } from "react";

type Preferences = {
  mainWineType: string;
  budget: string;
  bodyPreference: number;
  stylePreference: string;
  mainOccasion: string;
};

const initialPreferences: Preferences = {
  mainWineType: "",
  budget: "",
  bodyPreference: 3,
  stylePreference: "",
  mainOccasion: "",
};

const wineTypes = [
  { label: "Blanc", value: "white" },
  { label: "Rouge", value: "red" },
  { label: "Bulles", value: "sparkling" },
  { label: "Rosé", value: "rose" },
  { label: "Orange", value: "orange" },
  { label: "Je touche à tout", value: "everything" },
];

const budgets = [
  { label: "Moins de 20 $", value: "under-20" },
  { label: "20 à 30 $", value: "20-30" },
  { label: "30 à 50 $", value: "30-50" },
  { label: "50 $ et plus", value: "50-plus" },
];

const styles = [
  { label: "Classique", value: "classic" },
  { label: "Aventureux", value: "adventurous" },
  { label: "Les deux", value: "both" },
];

const occasions = [
  { label: "Souper de semaine", value: "weeknight" },
  { label: "Recevoir", value: "hosting" },
  { label: "Découvrir", value: "discovering" },
  { label: "Offrir", value: "gifting" },
  { label: "Occasions spéciales", value: "special-occasions" },
];

function ChoiceButtons({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              "border px-5 py-3 text-sm transition-colors",
              selected
                ? "border-[var(--lpv-ink)] bg-[var(--lpv-ink)] text-[var(--lpv-paper-light)]"
                : "border-[var(--lpv-line)] bg-transparent hover:border-[var(--lpv-ink)]",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function PreferencesForm() {
  const [preferences, setPreferences] =
    useState<Preferences>(initialPreferences);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPreferences() {
      try {
        const response = await fetch("/api/preferences");

        if (!response.ok) {
          throw new Error("Impossible de charger les préférences.");
        }

        const data = await response.json();

        if (data.preferences) {
          setPreferences({
            mainWineType: data.preferences.mainWineType || "",
            budget: data.preferences.budget || "",
            bodyPreference: data.preferences.bodyPreference || 3,
            stylePreference: data.preferences.stylePreference || "",
            mainOccasion: data.preferences.mainOccasion || "",
          });
        }
      } catch (error) {
        console.error(error);
        setMessage("Impossible de charger tes préférences.");
      } finally {
        setLoading(false);
      }
    }

    loadPreferences();
  }, []);

  function updatePreference<K extends keyof Preferences>(
    key: K,
    value: Preferences[K]
  ) {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));

    setMessage("");
  }

  async function savePreferences() {
    if (
      !preferences.mainWineType ||
      !preferences.budget ||
      !preferences.stylePreference ||
      !preferences.mainOccasion
    ) {
      setMessage("Réponds aux cinq questions avant d’enregistrer.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Impossible d’enregistrer.");
      }

      setMessage("Tes préférences sont enregistrées.");
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue pendant l’enregistrement.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="lpv-container py-16 md:py-24">
        <p className="text-sm text-[var(--lpv-muted)]">
          Chargement de tes préférences…
        </p>
      </section>
    );
  }

  const questions = [
    {
      number: "01",
      title: "Je bois surtout",
      content: (
        <ChoiceButtons
          options={wineTypes}
          value={preferences.mainWineType}
          onChange={(value) => updatePreference("mainWineType", value)}
        />
      ),
    },
    {
      number: "02",
      title: "Mon budget habituel",
      content: (
        <ChoiceButtons
          options={budgets}
          value={preferences.budget}
          onChange={(value) => updatePreference("budget", value)}
        />
      ),
    },
    {
      number: "03",
      title: "Je préfère généralement",
      content: (
        <div className="max-w-2xl">
          <div className="mb-4 flex justify-between text-sm text-[var(--lpv-muted)]">
            <span>Léger</span>
            <span>Généreux</span>
          </div>

          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={preferences.bodyPreference}
            onChange={(event) =>
              updatePreference(
                "bodyPreference",
                Number(event.target.value)
              )
            }
            className="w-full accent-[var(--lpv-ink)]"
          />

          <div className="mt-3 flex justify-between text-xs text-[var(--lpv-muted)]">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      ),
    },
    {
      number: "04",
      title: "J’aime",
      content: (
        <ChoiceButtons
          options={styles}
          value={preferences.stylePreference}
          onChange={(value) =>
            updatePreference("stylePreference", value)
          }
        />
      ),
    },
    {
      number: "05",
      title: "Je cherche surtout du vin pour",
      content: (
        <ChoiceButtons
          options={occasions}
          value={preferences.mainOccasion}
          onChange={(value) =>
            updatePreference("mainOccasion", value)
          }
        />
      ),
    },
  ];

  return (
    <section className="lpv-container py-16 md:py-24">
      <div className="border-t border-[var(--lpv-line)]">
        {questions.map((question) => (
          <div
            key={question.number}
            className="grid gap-6 border-b border-[var(--lpv-line)] py-10 md:grid-cols-[70px_0.7fr_1.3fr] md:py-12"
          >
            <span className="text-[0.62rem] tracking-[0.18em] text-[var(--lpv-muted)]">
              {question.number}
            </span>

            <h2 className="lpv-display text-3xl leading-[0.95] md:text-4xl">
              {question.title}
            </h2>

            <div>{question.content}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 pt-10 md:flex-row md:items-center">
        <button
          type="button"
          onClick={savePreferences}
          disabled={saving}
          className="lpv-button lpv-button-dark"
        >
          {saving ? "Enregistrement…" : "Enregistrer mes préférences"}
        </button>

        {message ? (
          <p className="text-sm text-[var(--lpv-muted)]">
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
