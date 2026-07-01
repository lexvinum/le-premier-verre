"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  "Quel vin rouge recommanderais-tu pour un souper italien?",
  "Aide-moi à découvrir un producteur intéressant.",
  "Quel contenu du site devrais-je lire pour mieux comprendre une région?",
];

type SommelierChatProps = {
  suggestions?: string[];
};

export function SommelierChat({
  suggestions = SUGGESTIONS,
}: SommelierChatProps) {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/assistant",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  function submitQuestion(value: string) {
    const question = value.trim();

    if (!question || isLoading) return;

    sendMessage({
      text: question,
    });

    setInput("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(input);
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-xl">
      <div className="border-b border-neutral-200 bg-neutral-950 px-6 py-7 text-white md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          Sommelier IA
        </p>

        <h1 className="mt-3 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
          Une conversation guidée par les contenus du Premier Verre.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-300">
          Posez une question. Le Sommelier recherche dans les fiches, articles
          et guides du site avant de répondre.
        </p>
      </div>

      <div className="flex min-h-[460px] flex-col gap-5 bg-neutral-50 px-4 py-5 md:px-6">
        {messages.length === 0 ? (
          <div className="grid gap-3">
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-5">
              <p className="font-serif text-xl text-neutral-950">
                Par où commencer?
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Essayez une question de recommandation, de découverte ou de
                compréhension. Le Sommelier s'appuiera uniquement sur les
                contenus déjà publiés.
              </p>
            </div>

            <div className="grid gap-2 md:grid-cols-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => submitQuestion(suggestion)}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 text-left text-sm leading-5 text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "ml-auto max-w-[85%] rounded-3xl bg-neutral-950 px-5 py-4 text-sm text-white"
                  : "mr-auto max-w-[88%] rounded-3xl border border-neutral-200 bg-white px-5 py-4 text-sm leading-6 text-neutral-800 shadow-sm"
              }
            >
              {message.parts.map((part, index) => {
                if (part.type !== "text") return null;

                if (message.role === "assistant") {
                  return (
                    <div
                      key={`${message.id}-${index}`}
                      className="prose prose-sm max-w-none prose-a:text-neutral-950 prose-a:underline prose-strong:text-neutral-950"
                    >
                      <ReactMarkdown>{part.text}</ReactMarkdown>
                    </div>
                  );
                }

                return (
                  <p
                    key={`${message.id}-${index}`}
                    className="whitespace-pre-wrap"
                  >
                    {part.text}
                  </p>
                );
              })}
            </div>
          ))
        )}

        {isLoading && (
          <div className="mr-auto rounded-3xl border border-neutral-200 bg-white px-5 py-4 text-sm text-neutral-500 shadow-sm">
            Le Sommelier consulte les fiches…
          </div>
        )}
      </div>

      {error && (
        <div className="border-t border-red-100 bg-red-50 px-6 py-3 text-sm text-red-700">
          Une erreur est survenue avec le Sommelier IA.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-3 border-t border-neutral-200 bg-white p-4 md:p-5"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ex. Quel vin choisir pour un repas entre amis?"
          className="min-w-0 flex-1 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm outline-none transition focus:border-neutral-950"
        />

        <button
          type="submit"
          disabled={isLoading || input.trim().length === 0}
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
