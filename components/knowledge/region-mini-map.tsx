"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type RegionMiniMapProps = {
  name: string;
  latitude: number;
  longitude: number;
  zoom?: number;
  polygon?: {
    latitude: number;
    longitude: number;
  }[];
};

const lpvMapStyles: google.maps.MapTypeStyle[] = [
  {
    elementType: "geometry",
    stylers: [{ color: "#e6ddd1" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#5e4f43" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#efe8df" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#a89483" }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#7b6657" }, { weight: 1.2 }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#e3d9cc" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#f0e8de" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#c5b4a4" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6f5a4b" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#d7c8ba" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#9f8978" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c4cbc8" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#5f6a66" }],
  },
];


export function RegionMiniMap({
  name,
  latitude,
  longitude,
  zoom = 8,
  polygon,
}: RegionMiniMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapsReady, setMapsReady] = useState(false);

  useEffect(() => {
    if (window.google?.maps) {
      setMapsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!mapsReady || !mapRef.current || !window.google?.maps) return;

    const position = { lat: latitude, lng: longitude };

    const map = new window.google.maps.Map(mapRef.current, {
      center: position,
      zoom,
      styles: lpvMapStyles,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      clickableIcons: false,
      gestureHandling: "cooperative",
      backgroundColor: "#e6ddd1",
      disableDefaultUI: true,
    });

    if (polygon?.length && polygon.length >= 3) {
      const paths = polygon.map((point) => ({
        lat: point.latitude,
        lng: point.longitude,
      }));

      new window.google.maps.Polygon({
        paths,
        strokeColor: "#6f4f3a",
        strokeOpacity: 0.95,
        strokeWeight: 2,
        fillColor: "#8c654b",
        fillOpacity: 0.22,
        map,
      });
    }
  }, [mapsReady, latitude, longitude, zoom, name, polygon]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=marker,geometry`}
        strategy="afterInteractive"
        onLoad={() => setMapsReady(true)}
        onReady={() => setMapsReady(true)}
      />

      <div className="relative h-[420px] w-full overflow-hidden border border-[var(--lpv-line)] md:h-[500px]">
        <div
          ref={mapRef}
          aria-label={`Carte de la région ${name}`}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </>
  );
}
