# JMT Properties Dashboard — Next.js

Interactive map dashboard for John Muir Trust properties and the John Muir Way.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Leaflet.js** — interactive map (loaded client-side only via `dynamic()`)
- **Tailwind CSS** — utility styling
- No backend required — fully static

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx        — root layout, imports Leaflet CSS
  page.tsx          — main dashboard page
  globals.css       — base styles

components/
  JmtMap.tsx        — Leaflet map (offline: canvas sea + UK GeoJSON + markers)
  Sidebar.tsx       — property list, detail panel, JMW waypoints

lib/
  data.ts           — all typed data: properties, munros, lochs, places, JMW sites

public/
  assets/           — all images (property photos, wildlife, JMW route photos)
  uk.geojson        — UK coastline (10m resolution, simplified)
  national-parks.geojson — Cairngorms + Loch Lomond NP boundaries
```

## Deploy to Vercel

```bash
npm run build
vercel deploy
```

Or connect the repo to Vercel and it will auto-deploy on push.

## Map Features

- Offline-capable map (sea canvas + embedded UK GeoJSON — no tile server needed)
- Highland gradient shading (mid/high elevation zones)
- National Park boundaries (Cairngorms, Loch Lomond & The Trossachs)
- 20 Munro markers with elevation
- 15 major loch labels
- 29 place labels (cities, towns, geographic regions, islands)
- 7 JMT property markers with colour coding
- Zone overlays (rainforest, peatland, overgrazing, invasive species)
- John Muir Way route with 10 waypoint markers
