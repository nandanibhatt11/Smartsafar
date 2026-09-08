import React, { useEffect, useRef } from "react";
import L from "leaflet";

export const LiveCrowdMap = ({ markers, focusMarker }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerLayerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [30.455, 78.065],
      zoom: 13,
      scrollWheelZoom: false,
    });

    // L.tileLayer(
    //   "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    //   {
    //     attribution: '&copy; OpenStreetMap &copy; CARTO',
    //   }
    // ).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    mapRef.current = map;
    markerLayerRef.current = L.layerGroup().addTo(map);

    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = markerLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    markers.forEach((m) => {
      const color =
        m.crowdStatus === "high"
          ? "#ef4444"
          : m.crowdStatus === "moderate"
            ? "#f59e0b"
            : "#10b981";

      const icon = L.divIcon({
        className: "crowd-pin",
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>`,
      });

      L.marker([m.lat, m.lng], { icon })
        .addTo(layer)
        .bindPopup(`<b>${m.name}</b><br/>Density: ${m.crowdPercent}%`);
    });

    if (focusMarker) {
      map.flyTo([focusMarker.lat, focusMarker.lng], 15, { duration: 0.8 });
      const marker = L.marker([focusMarker.lat, focusMarker.lng], {
        icon: L.divIcon({
          className: "crowd-pin",
          iconSize: [22, 22],
          iconAnchor: [11, 11],
          html: `<div style="width:20px;height:20px;border-radius:50%;background:#136821;border:3px solid white;box-shadow:0 0 0 5px rgba(19,104,33,.2)"></div>`,
        }),
      }).addTo(layer);
      marker
        .bindPopup(
          `<b>${focusMarker.name}</b><br/>${focusMarker.description || ""}`,
        )
        .openPopup();
    }
  }, [markers, focusMarker]);

  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl border border-slate-200">
      <div ref={mapContainerRef} className="h-full w-full" />
      <div className="absolute left-4 top-4 z-[1000] rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold shadow">
        🔴 High &nbsp; 🟠 Moderate &nbsp; 🟢 Quiet
      </div>
    </div>
  );
};
