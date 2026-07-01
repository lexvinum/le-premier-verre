import { SommelierChat } from "@/components/assistant/SommelierChat";
import { getSiteSettings, getThemeStyle } from "@/sanity/lib/site-settings";

export default async function SommelierPage() {
  const settings = await getSiteSettings();

  return (
    <main
      style={getThemeStyle(settings)}
      className="min-h-screen px-4 py-12 md:px-8 md:py-20"
    >
      <div className="lpv-container">
        <div className="mb-12 max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.42em] text-[var(--lpv-muted)]">
            Sommelier IA
          </p>
          <h1 className="lpv-display text-7xl leading-[0.85] md:text-9xl">
            {settings.assistant.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--lpv-muted)]">
            {settings.assistant.description}
          </p>
        </div>

        <SommelierChat suggestions={settings.assistant.suggestions} />
      </div>
    </main>
  );
}
