'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import { PROPS, MUNROS, LOCHS, PLACES, JMW_SITES, type Property } from '@/lib/data';

interface JmtMapProps {
  activeView: 'properties' | 'jmw';
  selectedPropId: string | null;
  onSelectProp: (id: string) => void;
}

const HIGHLAND_ZONES = [
  { level: 'high', coords: [[-3.9,57.15],[-3.5,57.55],[-3.0,57.50],[-2.85,57.15],[-3.2,56.95],[-3.8,56.95],[-3.9,57.15]] },
  { level: 'high', coords: [[-4.85,56.85],[-5.05,57.00],[-5.10,57.10],[-4.90,57.05],[-4.70,56.95],[-4.75,56.85],[-4.85,56.85]] },
  { level: 'high', coords: [[-5.10,57.55],[-5.35,57.70],[-5.45,57.90],[-5.20,58.05],[-5.00,57.95],[-4.90,57.70],[-5.00,57.55],[-5.10,57.55]] },
  { level: 'mid', coords: [[-4.20,56.60],[-3.50,56.80],[-3.00,57.00],[-2.90,57.45],[-3.50,57.55],[-4.00,57.40],[-4.30,57.10],[-4.40,56.85],[-4.20,56.60]] },
  { level: 'mid', coords: [[-4.50,56.50],[-4.20,56.60],[-4.40,56.85],[-4.80,57.00],[-5.00,57.10],[-5.10,56.90],[-4.90,56.65],[-4.50,56.50]] },
  { level: 'mid', coords: [[-5.00,57.50],[-5.20,57.85],[-5.40,58.20],[-5.20,58.40],[-4.80,58.30],[-4.50,57.90],[-4.60,57.55],[-5.00,57.50]] },
  { level: 'mid', coords: [[-4.50,57.90],[-4.80,58.30],[-4.60,58.55],[-4.20,58.50],[-4.00,58.20],[-4.20,57.90],[-4.50,57.90]] },
];

export default function JmtMap({ activeView, selectedPropId, onSelectProp }: JmtMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<Record<string, any>>({});
  const [ready, setReady] = useState(false);

  // ── Initialise map once ──────────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    // Guard against React strict mode double-invoke
    if ((containerRef.current as any)._leaflet_id) return;

    import('leaflet').then(async (L) => {
      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current!, {
        center: [57.2, -4.8],
        zoom: 7,
        zoomControl: true,
        maxBounds: L.latLngBounds(L.latLng(54.0, -9.0), L.latLng(61.5, 2.0)),
        maxBoundsViscosity: 0.9,
      });
      mapRef.current = map;

      // ── Sea background ────────────────────────────────────────────────────
      const BlankLayer = L.GridLayer.extend({
        createTile() {
          const t = document.createElement('canvas');
          t.width = t.height = 256;
          t.getContext('2d')!.fillStyle = '#a8c8e0';
          t.getContext('2d')!.fillRect(0, 0, 256, 256);
          return t;
        },
      });
      new (BlankLayer as any)({ attribution: 'JMT Properties Dashboard' }).addTo(map);

      // ── UK land outline ───────────────────────────────────────────────────
      const ukRes = await fetch('/uk.geojson');
      const ukGeoJSON = await ukRes.json();
      L.geoJSON(ukGeoJSON, {
        style: { fillColor: '#dde8cc', fillOpacity: 1, color: '#8aab6e', weight: 0.8, interactive: false },
      }).addTo(map);

      // ── Highland gradient zones ───────────────────────────────────────────
      const midZones = HIGHLAND_ZONES.filter(z => z.level === 'mid').map(z => ({
        type: 'Feature' as const, properties: {}, geometry: { type: 'Polygon' as const, coordinates: [z.coords] },
      }));
      const highZones = HIGHLAND_ZONES.filter(z => z.level === 'high').map(z => ({
        type: 'Feature' as const, properties: {}, geometry: { type: 'Polygon' as const, coordinates: [z.coords] },
      }));
      L.geoJSON(midZones as any, {
        style: () => ({ fillColor: '#b5d494', fillOpacity: 0.55, color: 'none', weight: 0 }),
      }).addTo(map);
      L.geoJSON(highZones as any, {
        style: () => ({ fillColor: '#8db87a', fillOpacity: 0.60, color: 'none', weight: 0 }),
      }).addTo(map);

      // ── National Parks ────────────────────────────────────────────────────
      const npRes = await fetch('/national-parks.geojson');
      const npGeoJSON = await npRes.json();
      L.geoJSON(npGeoJSON, {
        style: () => ({ fillColor: '#789A2B', fillOpacity: 0.12, color: '#789A2B', weight: 1.5, dashArray: '6,4', interactive: false }),
        onEachFeature: (f, layer: any) => {
          const c = layer.getBounds().getCenter();
          L.marker([c.lat, c.lng], {
            icon: L.divIcon({
              className: '',
              html: `<div style="font-family:Arial,sans-serif;font-size:8px;font-weight:600;color:#37563E;white-space:nowrap;text-transform:uppercase;letter-spacing:0.5px;text-shadow:1px 1px 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff;">■ ${f.properties.name}</div>`,
              iconAnchor: [0, 6], iconSize: undefined,
            }),
            interactive: false, zIndexOffset: -200,
          }).addTo(map);
        },
      }).addTo(map);

      // ── Loch labels ───────────────────────────────────────────────────────
      LOCHS.forEach(l => {
        L.marker([l.lat, l.lng], {
          icon: L.divIcon({
            className: '',
            html: `<div style="font-family:Arial,sans-serif;font-size:8px;font-weight:400;color:#1a5a8a;font-style:italic;white-space:nowrap;text-shadow:1px 1px 0 rgba(255,255,255,0.8),-1px -1px 0 rgba(255,255,255,0.8);">${l.name}</div>`,
            iconAnchor: [0, 6], iconSize: undefined,
          }),
          interactive: false, zIndexOffset: -150,
        }).addTo(map);
      });

      // ── Munro markers ─────────────────────────────────────────────────────
      MUNROS.forEach(m => {
        L.marker([m.lat, m.lng], {
          icon: L.divIcon({
            className: '',
            html: `<div style="line-height:1;"><span style="font-size:9px;color:#8E1537;">▲</span><span style="font-family:Arial,sans-serif;font-size:8px;font-weight:500;color:#382F20;white-space:nowrap;vertical-align:top;margin-left:2px;text-shadow:1px 1px 0 #fff,-1px -1px 0 #fff;">${m.name} <span style="color:#666;font-size:7px;">${m.elev}m</span></span></div>`,
            iconAnchor: [0, 8], iconSize: undefined,
          }),
          interactive: false, zIndexOffset: -120,
        }).addTo(map);
      });

      // ── Place labels ──────────────────────────────────────────────────────
      const pStyles: Record<string, { size: string; weight: string; color: string }> = {
        city:   { size: '12px', weight: '700', color: '#1a1a1a' },
        town:   { size: '10px', weight: '600', color: '#333333' },
        geo:    { size: '9px',  weight: '400', color: '#37563E' },
        island: { size: '9px',  weight: '400', color: '#385DAE' },
      };
      PLACES.forEach(p => {
        const s = pStyles[p.type];
        const dot = p.type === 'city'
          ? '<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#666633;vertical-align:middle;margin-right:3px;"></span>'
          : p.type === 'town'
          ? '<span style="display:inline-block;width:3px;height:3px;border-radius:50%;background:#666;vertical-align:middle;margin-right:2px;"></span>'
          : '';
        L.marker([p.lat, p.lng], {
          icon: L.divIcon({
            className: '',
            html: `<div style="font-family:Arial,sans-serif;font-size:${s.size};font-weight:${s.weight};color:${s.color};white-space:nowrap;text-shadow:1px 1px 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff;">${dot}${p.name}</div>`,
            iconAnchor: [0, 8], iconSize: undefined,
          }),
          interactive: false, zIndexOffset: -100,
        }).addTo(map);
      });

      setReady(true);
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // ── Property markers (toggle with activeView) ─────────────────────────────
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    import('leaflet').then((L) => {
      const map = mapRef.current!;

      // Clear previous prop/jmw layers
      layersRef.current.propMarkers?.forEach((m: any) => m.remove());
      layersRef.current.jmwLayer?.remove();
      layersRef.current.propZones?.forEach((z: any) => z.remove());

      if (activeView === 'properties') {
        const markers: any[] = [];
        const zones: any[] = [];

        PROPS.forEach(p => {
          // Zone polygons
          const zoneConfigs = [
            { zone: p.rfZone,    color: '#4CAF50', label: 'Rainforest' },
            { zone: p.peatZone,  color: '#8B4513', label: 'Peatland' },
            { zone: p.overgZone, color: '#FF8C00', label: 'Overgrazing' },
            { zone: p.invasZone, color: '#DC143C', label: 'Invasive' },
          ];
          zoneConfigs.forEach(({ zone, color }) => {
            if (!zone) return;
            const poly = L.polygon(zone as [number,number][], {
              color, weight: 1.5, opacity: 0.7, fillColor: color, fillOpacity: 0.15,
            }).addTo(map);
            zones.push(poly);
          });

          // Property marker
          const isSelected = p.id === selectedPropId;
          const markerHtml = `
            <div style="
              background:${p.color};
              color:#fff;
              border-radius:50%;
              width:${isSelected ? 18 : 14}px;
              height:${isSelected ? 18 : 14}px;
              border:${isSelected ? '3px solid #fff' : '2px solid rgba(255,255,255,0.7)'};
              box-shadow:0 2px 6px rgba(0,0,0,0.4);
              cursor:pointer;
              transition:all 0.15s;
            "></div>`;

          const marker = L.marker([p.lat, p.lng], {
            icon: L.divIcon({ className: '', html: markerHtml, iconAnchor: [9, 9], iconSize: [18, 18] }),
            zIndexOffset: isSelected ? 1000 : 0,
          })
            .addTo(map)
            .bindTooltip(p.name, { permanent: false, direction: 'top', offset: [0, -10] })
            .on('click', () => onSelectProp(p.id));
          markers.push(marker);
        });

        layersRef.current.propMarkers = markers;
        layersRef.current.propZones = zones;
      } else {
        // JMW mode
        const coords: [number, number][] = JMW_SITES.map(s => [s.lat, s.lng]);
        const line = L.polyline(coords, { color: '#37563E', weight: 3, opacity: 0.8 }).addTo(map);
        const siteMarkers = JMW_SITES.map(s => {
          return L.marker([s.lat, s.lng], {
            icon: L.divIcon({
              className: '',
              html: `<div style="font-size:16px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4));">${s.icon || '📍'}</div>`,
              iconAnchor: [8, 16], iconSize: [16, 16],
            }),
          })
            .addTo(map)
            .bindTooltip(s.name, { permanent: false, direction: 'top' });
        });
        layersRef.current.jmwLayer = { remove: () => { line.remove(); siteMarkers.forEach(m => m.remove()); } };
      }
    });
  }, [ready, activeView, selectedPropId, onSelectProp]);

  // ── Fly to selected property ──────────────────────────────────────────────
  useEffect(() => {
    if (!ready || !mapRef.current || !selectedPropId) return;
    const prop = PROPS.find(p => p.id === selectedPropId);
    if (prop) mapRef.current.flyTo([prop.lat, prop.lng], 10, { duration: 1 });
  }, [ready, selectedPropId]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
