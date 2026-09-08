type RegionMiniMapProps = {
  name: string;
  latitude: number;
  longitude: number;
  zoom?: number;
};

export function RegionMiniMap({
  name,
  latitude,
  longitude,
  zoom = 8,
}: RegionMiniMapProps) {
  const span = Math.max(0.08, 12 / Math.pow(2, zoom - 5));

  const left = longitude - span;
  const right = longitude + span;
  const top = latitude + span * 0.65;
  const bottom = latitude - span * 0.65;

  const mapUrl =
    `https://www.openstreetmap.org/export/embed.html?` +
    `bbox=${left}%2C${bottom}%2C${right}%2C${top}` +
    `&layer=mapnik` +
    `&marker=${latitude}%2C${longitude}`;

  const externalUrl =
    `https://www.openstreetmap.org/?mlat=${latitude}` +
    `&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`;

  return (
    <div>
      <div className="overflow-hidden border border-[var(--lpv-line)] bg-[var(--lpv-paper-light)]">
        <iframe
          src={mapUrl}
          title={`Carte de la région ${name}`}
          loading="lazy"
          className="h-[360px] w-full border-0 md:h-[460px]"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <a
          href={externalUrl}
          target="_blank"
          rel="noreferrer"
          className="lpv-text-link"
        >
          Voir la carte <span>↗</span>
        </a>
      </div>
    </div>
  );
}
