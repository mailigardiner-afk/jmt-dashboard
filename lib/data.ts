// ── JMT Brand Colours ────────────────────────────────────────────────────────
export const JMT_COLOURS = {
  olive:       '#666633',
  scotsPine:   '#37563E',
  leafGreen:   '#789A2B',
  sphagnum:    '#B6B232',
  autumnFern:  '#D2A429',
  redMoss:     '#8E1537',
  eveLoch:     '#385DAE',
  glacier:     '#4BABE5',
  blackCuillin:'#382F20',
  cream:       '#F5F3ED',
  quartz:      '#F5F4F3',
  granite:     '#6E6B63',
  lichen:      '#A7A089',
};

// ── Types ────────────────────────────────────────────────────────────────────
export interface RestorationSite {
  name: string;
  lat: number;
  lng: number;
  type: 'active' | 'completed' | 'planned';
  note: string;
}

export interface Property {
  id: string;
  name: string;
  sub: string;
  region: string;
  featured?: boolean;
  lat: number;
  lng: number;
  color: string;
  photo: string;
  wildlifePhotos?: [string, string][];
  totalHa: number;
  rfHa: number | null;
  status: string;
  rfZone: [number, number][] | null;
  peatZone: [number, number][] | null;
  overgZone: [number, number][] | null;
  invasZone: [number, number][] | null;
  restoration: RestorationSite[];
  threats: string[];
  wildlife: string[];
  funding: string;
  desc: string;
  greenTeam?: boolean;
}

export interface JmwSite {
  name: string;
  lat: number;
  lng: number;
  icon: string;
  desc: string;
  img: string;
}

export interface Munro {
  name: string;
  lat: number;
  lng: number;
  elev: number;
}

export interface Loch {
  name: string;
  lat: number;
  lng: number;
}

export interface Place {
  name: string;
  lat: number;
  lng: number;
  type: 'city' | 'town' | 'geo' | 'island';
}

// ── Properties ───────────────────────────────────────────────────────────────
export const PROPS: Property[] = [
  {
    id: 'glenlude', wildlifePhotos: [['Adder', 'wl-glenlude.jpg']], photo: 'glenlude.jpg',
    name: 'Glenlude', sub: 'Scottish Borders', region: 'Scottish Borders', featured: true,
    lat: 55.535, lng: -3.175, color: '#e86820',
    totalHa: 149, rfHa: null, status: 'active',
    rfZone: [[55.555,-3.21],[55.548,-3.17],[55.528,-3.155],[55.518,-3.17],[55.522,-3.205],[55.54,-3.22]],
    peatZone: null,
    overgZone: [[55.548,-3.20],[55.535,-3.17],[55.522,-3.175],[55.525,-3.20]],
    invasZone: [[55.545,-3.195],[55.533,-3.165],[55.52,-3.168]],
    restoration: [
      { name: 'Native Broadleaf Woodland Planting', lat: 55.540, lng: -3.182, type: 'active', note: '20-year plan replacing conifer plantation with native broadleaf woodland. Birch, oak, rowan, aspen, holly, hazel grown from locally collected seed in on-site nursery.' },
      { name: "Jamie's Wood Memorial Project", lat: 55.532, lng: -3.172, type: 'active', note: '1,500 trees planted in memory of Jamie Gardiner (1994–2017). Fundraised and planted by volunteers on the northern side of the property.' },
      { name: 'On-site Tree Nursery (Polytunnel)', lat: 55.537, lng: -3.190, type: 'active', note: 'Volunteer-built polytunnel nursery grows trees from locally collected seed.' },
      { name: 'Brash Hedge Network', lat: 55.544, lng: -3.196, type: 'active', note: 'Felled conifers woven into protective brash hedges to shield young tree seedlings from roe deer and sika deer browsing.' },
      { name: 'Phoenix Forest Scotland', lat: 55.528, lng: -3.185, type: 'active', note: 'Section managed in partnership with Phoenix Futures, supporting people in rehabilitation through conservation work.' },
    ],
    threats: ['Roe deer and sika deer browsing young tree seedlings', 'Impacts of previous intensive sheep farming', 'Legacy conifer plantation degrading native habitat'],
    wildlife: ['Red squirrel', 'Pine marten', 'Otter', 'Adder', 'Palmate newt', 'Barn owl', 'Black grouse', 'Crossbill', 'Northern Brown Argus butterfly', '400+ species recorded in 24-hr Bioblitz (2018)'],
    funding: "Funded through major donors, Rewilding Britain Innovation Fund (2023), A&N Daniell Charitable Trust, and The Green Team volunteer programme.",
    desc: "Gifted to JMT in 2003 by the late Sheila Bell. JMT's most intensive community and volunteer hub — a former sheep farm being transformed into native woodland over 20 years.",
    greenTeam: true,
  },
  {
    id: 'skye', wildlifePhotos: [['White-tailed Eagle', 'wl-skye.jpg']], photo: 'skye.jpg',
    name: 'Isle of Skye', sub: 'Strathaird Estate', region: 'Isle of Skye',
    lat: 57.205, lng: -6.10, color: '#4a8c4b',
    totalHa: 12000, rfHa: 400, status: 'active',
    rfZone: [[57.26,-6.25],[57.24,-6.14],[57.19,-6.07],[57.16,-6.12],[57.18,-6.22],[57.23,-6.28]],
    peatZone: [[57.215,-6.18],[57.21,-6.14],[57.195,-6.15],[57.195,-6.20]],
    overgZone: [[57.23,-6.22],[57.21,-6.15],[57.17,-6.11],[57.16,-6.18],[57.19,-6.24]],
    invasZone: [[57.21,-6.20],[57.20,-6.14],[57.185,-6.12],[57.18,-6.18]],
    restoration: [
      { name: 'Keppoch Native Woodland', lat: 57.215, lng: -6.165, type: 'completed', note: '40,000 native trees planted 2021 — hazel, aspen, ash replacing Sitka spruce.' },
      { name: 'Peatland Restoration (Faoilean)', lat: 57.202, lng: -6.145, type: 'completed', note: '35 ha bog restored; 17 ha Sitka spruce removed.' },
      { name: 'Invasive Species Clearance', lat: 57.22, lng: -6.195, type: 'active', note: 'Volunteer-led removal of prickly heath, fuscia, cotoneaster and rhododendron.' },
      { name: 'Grazing Reduction Zone', lat: 57.195, lng: -6.17, type: 'active', note: 'Deer fencing and sheep management to allow natural broadleaf woodland regeneration.' },
    ],
    threats: ['Overgrazing by sheep & deer', 'Invasive Sitka spruce re-seeding', 'Non-native rhododendron, cotoneaster, fuscia'],
    wildlife: ['Golden eagle (highest UK density)', 'White-tailed sea eagle', 'Otter', 'Greenshank'],
    funding: "Peak & Wild (Matthew Algie) cofunds ~400 ha of Skye's rainforest zone. Peatland work funded by NatureScot Peatland Action Fund.",
    desc: "Southern Skye's three adjoining estates (Sconser, Strathaird, Torrin) — 12,000 ha of coastline, woodland, peatland and mountain.",
  },
  {
    id: 'knoydart', wildlifePhotos: [['Otters', 'wl-knoydart.jpg']], photo: 'knoydart.jpg',
    name: 'Knoydart', sub: 'Lì & Coire Dhorrcail', region: 'Knoydart Peninsula',
    lat: 57.058, lng: -5.72, color: '#2a6fa8',
    totalHa: 1255, rfHa: 350, status: 'active',
    rfZone: [[57.10,-5.80],[57.08,-5.71],[57.05,-5.65],[57.02,-5.67],[57.03,-5.78],[57.07,-5.83]],
    peatZone: null,
    overgZone: [[57.08,-5.77],[57.065,-5.70],[57.04,-5.68],[57.035,-5.74]],
    invasZone: [[57.07,-5.73],[57.055,-5.68],[57.042,-5.72]],
    restoration: [
      { name: 'Native Tree Planting Programme', lat: 57.072, lng: -5.740, type: 'active', note: 'Birch, oak, hazel, rowan, Scots pine — natural regeneration boosted by deer control.' },
      { name: 'Deer Management', lat: 57.055, lng: -5.705, type: 'active', note: 'Controlled deer numbers enabling woodland recovery.' },
      { name: 'Invasive Species Clearance', lat: 57.045, lng: -5.750, type: 'active', note: 'Volunteer-led removal programme.' },
      { name: 'Old Stalkers Path Restoration', lat: 57.065, lng: -5.775, type: 'completed', note: 'Historic route into Coire Dhorrcail restored; redundant fencing removed.' },
    ],
    threats: ['Centuries of burning degraded woodland', 'Historically very high overgrazing', 'Remote access makes monitoring challenging'],
    wildlife: ['Pine marten', 'Otter', 'Golden & white-tailed eagle', 'Water vole', 'Woodland birds'],
    funding: 'Peak & Wild (Matthew Algie), Wild Woods Appeal major donors.',
    desc: '"The rough bounds" — accessible only by boat or long walk. One of the most spectacular regenerating native woodland landscapes in the UK.',
  },
  {
    id: 'quinag', photo: 'quinag.jpg',
    name: 'Quinag & Kylesku', sub: 'Assynt–Coigach NSA', region: 'Sutherland & Assynt',
    lat: 58.20, lng: -5.02, color: '#e8a020',
    totalHa: 3699, rfHa: 250, status: 'active',
    rfZone: [[58.245,-5.10],[58.225,-4.97],[58.195,-4.93],[58.175,-4.98],[58.18,-5.10],[58.21,-5.14]],
    peatZone: [[58.225,-5.08],[58.215,-5.01],[58.195,-5.00],[58.19,-5.07]],
    overgZone: [[58.22,-5.06],[58.205,-4.98],[58.185,-4.96],[58.178,-5.04]],
    invasZone: [[58.23,-5.09],[58.21,-4.99],[58.19,-4.96]],
    restoration: [
      { name: 'Ardvar Ancient Oak Woodland', lat: 58.235, lng: -5.095, type: 'active', note: 'Priority ancient Atlantic woodland. Deer management critical for oak, birch and hazel regeneration.' },
      { name: 'Coigach–Assynt Living Landscape', lat: 58.195, lng: -5.02, type: 'completed', note: 'Landscape-scale project to reconnect woodland and fragmented habitats.' },
      { name: 'Deer Population Management', lat: 58.21, lng: -4.985, type: 'active', note: 'NatureScot licensed deer management to allow woodland regeneration.' },
      { name: 'Kylesku Community Hub', lat: 58.255, lng: -5.005, type: 'planned', note: 'Newly acquired Kylesku Estate (September 2025). Long-term plan for world-class community and visitor hub.' },
    ],
    threats: ['Very high deer numbers blocking tree regeneration', 'Centuries of heather burning', 'Fragmented habitats with poor connectivity'],
    wildlife: ['Red deer', 'Golden eagle', 'Rare mountain flora', 'Upland breeding birds'],
    funding: 'Peak & Wild (Matthew Algie). Kylesku Estate acquired September 2025.',
    desc: "Breathtaking three-peak ridge above Assynt's lochs and peatlands. Kylesku Estate acquired in 2025 to create a major community hub.",
  },
  {
    id: 'bennevis', wildlifePhotos: [['Pine Marten', 'wl-bennevis.jpg']], photo: 'bennevis.jpg',
    name: 'Ben Nevis', sub: 'Steall Gorge & Glen Nevis', region: 'Lochaber, Highland',
    lat: 56.80, lng: -4.96, color: '#9dc44e',
    totalHa: 1761, rfHa: 170, status: 'active',
    rfZone: [[56.835,-5.03],[56.82,-4.95],[56.795,-4.90],[56.775,-4.93],[56.775,-5.02],[56.81,-5.06]],
    peatZone: [[56.82,-5.01],[56.81,-4.95],[56.795,-4.94],[56.79,-5.00]],
    overgZone: [[56.82,-4.99],[56.805,-4.93],[56.785,-4.93]],
    invasZone: null,
    restoration: [
      { name: 'Steall Gorge Native Woodland', lat: 56.812, lng: -4.978, type: 'active', note: 'Remnant rainforest in dramatic gorge. 75 lichen species, 33 UK-rare.' },
      { name: 'Peatland Restoration', lat: 56.798, lng: -4.945, type: 'completed', note: 'Peatland restoration completed autumn 2022.' },
      { name: 'Future Forest Project', lat: 56.825, lng: -5.005, type: 'active', note: 'Community tree planting through Nevis Landscape Partnership.' },
      { name: 'Deer Control Programme', lat: 56.808, lng: -5.025, type: 'active', note: 'Managed deer numbers enabling Scots pine and native broadleaf regeneration.' },
    ],
    threats: ['Red deer overgrazing limiting woodland regeneration', 'High visitor numbers causing erosion', 'Climate change affecting high-altitude habitats'],
    wildlife: ["Golden & white-tailed eagle", 'Red deer', 'Pine marten', 'Snow bunting', 'Ptarmigan', 'Mountain ringlet butterfly'],
    funding: "Peak & Wild (Matthew Algie) cofunds Steall Gorge rainforest.",
    desc: "Britain's highest peak estate. Steall Gorge holds 75 lichen species (33 UK-rare), one of Scotland's finest Atlantic woodland remnants.",
  },
  {
    id: 'sandwood', wildlifePhotos: [['Great Yellow Bumblebee', 'wl-sandwood.jpg']], photo: 'sandwood.jpg',
    name: 'Sandwood Bay', sub: 'Cape Wrath', region: 'North-west Sutherland',
    lat: 58.545, lng: -5.045, color: '#1a9080',
    totalHa: 4703, rfHa: null, status: 'active',
    rfZone: null,
    peatZone: [[58.555,-5.07],[58.548,-5.025],[58.530,-5.010],[58.525,-5.045],[58.535,-5.075]],
    overgZone: [[58.550,-5.065],[58.538,-5.025],[58.522,-5.020],[58.520,-5.055]],
    invasZone: null,
    restoration: [
      { name: 'Sandwood Path Maintenance', lat: 58.540, lng: -5.038, type: 'active', note: '4-mile path from Blairmore car park maintained against constant erosion.' },
      { name: 'Machair Conservation', lat: 58.548, lng: -5.055, type: 'active', note: 'Protecting one of Scotland\'s best mainland machair examples. Over 200 plant species including 8 orchids.' },
      { name: 'Deer & Wildlife Monitoring', lat: 58.530, lng: -5.020, type: 'active', note: 'Regular wildlife monitoring; deer management across the estate.' },
      { name: 'Beach & Coastal Cleans', lat: 58.540, lng: -5.042, type: 'active', note: 'Volunteer-led regular beach cleans at Sandwood Bay.' },
    ],
    threats: ['Erosion from high visitor footfall on soft soils', 'Coastal erosion from weather', 'Pressure on SAC-designated dune and machair habitats'],
    wildlife: ['Great Yellow bumblebee (rare)', 'Hundreds of nesting seabirds', 'Fulmars, guillemots, razorbills, shags', 'Great northern diver', '200+ plant species incl. 8 orchids'],
    funding: 'Wild Waters Appeal. Crofting community partnership central to land management.',
    desc: "4,703 ha of remote coastline near Cape Wrath. Sandwood Bay is one of Scotland's most spectacular beaches, guarded by sea-stack Am Buachaille.",
  },
  {
    id: 'schiehallion', wildlifePhotos: [['Black Grouse', 'wl-schiehallion.jpg']], photo: 'schiehallion.jpg',
    name: 'East Schiehallion', sub: 'Gleann Mòr, Perthshire', region: 'Highland Perthshire',
    lat: 56.665, lng: -4.095, color: '#8040b0',
    totalHa: 871, rfHa: null, status: 'active',
    rfZone: null,
    peatZone: null,
    overgZone: [[56.675,-4.12],[56.660,-4.085],[56.648,-4.078],[56.645,-4.105]],
    invasZone: null,
    restoration: [
      { name: 'Native Woodland Planting', lat: 56.668, lng: -4.105, type: 'active', note: '8 ha of new native woodland planted; 72 ha on lower slopes protected for natural regeneration.' },
      { name: 'Heart of Scotland Forest Partnership', lat: 56.655, lng: -4.088, type: 'active', note: 'Landscape-scale project with 7 partners to connect woodlands across 3,000 ha.' },
      { name: 'Mountain Path Realignment', lat: 56.672, lng: -4.098, type: 'completed', note: 'Main Munro path realigned 1999 onto sustainable line; Foss Loop established.' },
      { name: 'Grazing Management', lat: 56.660, lng: -4.100, type: 'active', note: 'Strategic fencing to reduce herbivore pressure and allow woodland regeneration.' },
    ],
    threats: ['Herbivore grazing preventing woodland regeneration', 'Path erosion damaging limestone habitats', '20,000+ annual summit visitors'],
    wildlife: ['Ptarmigan', 'Black grouse (threatened)', 'Mountain hare', 'Ring ouzel (threatened)', 'Rare mountain willows', 'Migrating geese'],
    funding: 'Heart of Scotland Forest Partnership. Scottish Forestry grants.',
    desc: '871 ha in Highland Perthshire including the eastern Schiehallion summit. Designated SSSI for geology and limestone flora.',
  },
];

// ── John Muir Way Waypoints ───────────────────────────────────────────────────
export const JMW_SITES: JmwSite[] = [
  { name: 'Start — Helensburgh', lat: 56.0046, lng: -4.7117, icon: '🏁', desc: 'Official start. Memorial bench & stone circle on the esplanade, inscribed with John Muir quotes.', img: 'jmw-helensburgh.jpg' },
  { name: 'Loch Lomond & The Trossachs NP', lat: 56.0200, lng: -4.4800, icon: '🌊', desc: 'Route follows Loch Lomond southern shore through Scotland\'s first National Park.', img: 'jmw-lochlomond.jpg' },
  { name: 'Falkirk Wheel', lat: 56.0011, lng: -3.8339, icon: '⚙️', desc: 'World\'s only rotating boat lift (2002), connecting the Forth and Clyde Canal to the Union Canal.', img: 'jmw-falkirkwheel.jpg' },
  { name: 'Antonine Wall (UNESCO)', lat: 55.9800, lng: -4.1000, icon: '🧱', desc: 'Roman frontier wall c.142 AD, UNESCO World Heritage Site.', img: 'jmw-antonine.jpg' },
  { name: 'Linlithgow Palace', lat: 55.9768, lng: -3.5982, icon: '👑', desc: "Birthplace of Mary Queen of Scots. 15th-century royal palace on the lochside.", img: 'jmw-linlithgow.jpg' },
  { name: 'Forth Bridges - South Queensferry', lat: 55.9899, lng: -3.3974, icon: '🌉', desc: 'Iconic views of all three Forth bridges. The Forth Railway Bridge (1890) is a UNESCO World Heritage Site.', img: 'jmw-forthbridge.jpg' },
  { name: "Arthur's Seat - Edinburgh", lat: 55.9533, lng: -3.1883, icon: '🌋', desc: 'Ancient volcanic hill at the heart of Holyrood Park.', img: 'jmw-arthursseat.jpg' },
  { name: 'Aberlady Bay Nature Reserve', lat: 55.9700, lng: -2.8700, icon: '🐦', desc: "Scotland's first Local Nature Reserve (1952). Vital coastal habitat for waders and wildfowl.", img: 'jmw-aberlady.jpg' },
  { name: 'Tantallon Castle', lat: 56.0578, lng: -2.6571, icon: '🏰', desc: 'Dramatic 14th-century clifftop ruin near North Berwick, overlooking the Bass Rock.', img: 'jmw-tantallon.jpg' },
  { name: 'Finish - Dunbar & John Muir Country Park', lat: 56.0052, lng: -2.5175, icon: '🏁', desc: "Journey's end. John Muir Birthplace Museum on Dunbar High Street.", img: 'jmw-dunbar.jpg' },
];

// ── Munros ───────────────────────────────────────────────────────────────────
export const MUNROS: Munro[] = [
  { name: 'Ben Nevis', lat: 56.7969, lng: -5.0035, elev: 1345 },
  { name: 'Ben Macdui', lat: 57.0703, lng: -3.6697, elev: 1309 },
  { name: 'Braeriach', lat: 57.0782, lng: -3.7286, elev: 1296 },
  { name: 'Cairn Toul', lat: 57.0542, lng: -3.7100, elev: 1291 },
  { name: 'Cairngorm', lat: 57.1148, lng: -3.6436, elev: 1245 },
  { name: 'Aonach Beag', lat: 56.8289, lng: -4.9700, elev: 1234 },
  { name: 'Ben Lawers', lat: 56.5470, lng: -4.2228, elev: 1214 },
  { name: 'Ben Lomond', lat: 56.1919, lng: -4.6344, elev: 974 },
  { name: 'Schiehallion', lat: 56.6587, lng: -4.0979, elev: 1083 },
  { name: 'Ben Cruachan', lat: 56.4269, lng: -5.1239, elev: 1126 },
  { name: 'Bidean nam Bian', lat: 56.6464, lng: -5.0200, elev: 1150 },
  { name: 'An Teallach', lat: 57.7990, lng: -5.2350, elev: 1062 },
  { name: 'Liathach', lat: 57.5650, lng: -5.4600, elev: 1055 },
  { name: 'Ben Hope', lat: 58.4050, lng: -4.6130, elev: 927 },
  { name: 'Quinag', lat: 58.2050, lng: -5.0100, elev: 808 },
  { name: 'Stac Pollaidh', lat: 57.9980, lng: -5.1810, elev: 613 },
  { name: 'Ben Wyvis', lat: 57.6820, lng: -4.5880, elev: 1046 },
  { name: 'Lochnagar', lat: 56.9610, lng: -3.2390, elev: 1155 },
  { name: 'Ben Lui', lat: 56.4010, lng: -4.8180, elev: 1130 },
  { name: 'Buachaille Etive Mor', lat: 56.5996, lng: -4.9340, elev: 1022 },
];

// ── Lochs ────────────────────────────────────────────────────────────────────
export const LOCHS: Loch[] = [
  { name: 'Loch Ness', lat: 57.2900, lng: -4.4700 },
  { name: 'Loch Lomond', lat: 56.1100, lng: -4.6200 },
  { name: 'Loch Tay', lat: 56.5100, lng: -4.1500 },
  { name: 'Loch Rannoch', lat: 56.6800, lng: -4.3500 },
  { name: 'Loch Awe', lat: 56.2800, lng: -5.0400 },
  { name: 'Loch Etive', lat: 56.5200, lng: -5.1500 },
  { name: 'Loch Linnhe', lat: 56.7500, lng: -5.3000 },
  { name: 'Loch Shiel', lat: 56.8500, lng: -5.5500 },
  { name: 'Loch Morar', lat: 56.9600, lng: -5.7300 },
  { name: 'Loch Maree', lat: 57.6600, lng: -5.4200 },
  { name: 'Loch Torridon', lat: 57.5500, lng: -5.5000 },
  { name: 'Loch Assynt', lat: 58.1500, lng: -4.9800 },
  { name: 'Loch Shin', lat: 58.0700, lng: -4.5500 },
  { name: 'Loch Laggan', lat: 56.9700, lng: -4.5700 },
  { name: 'Loch Fyne', lat: 56.1000, lng: -5.2000 },
];

// ── Place Labels ─────────────────────────────────────────────────────────────
export const PLACES: Place[] = [
  { name: 'Glasgow', lat: 55.8642, lng: -4.2518, type: 'city' },
  { name: 'Edinburgh', lat: 55.9533, lng: -3.1883, type: 'city' },
  { name: 'Aberdeen', lat: 57.1497, lng: -2.0943, type: 'city' },
  { name: 'Inverness', lat: 57.4778, lng: -4.2247, type: 'city' },
  { name: 'Dundee', lat: 56.4620, lng: -2.9707, type: 'town' },
  { name: 'Stirling', lat: 56.1197, lng: -3.9367, type: 'town' },
  { name: 'Fort William', lat: 56.6870, lng: -5.1048, type: 'town' },
  { name: 'Oban', lat: 56.3980, lng: -5.4730, type: 'town' },
  { name: 'Wick', lat: 58.5855, lng: -3.5246, type: 'town' },
  { name: 'Elgin', lat: 57.6568, lng: -3.3167, type: 'town' },
  { name: 'Portree', lat: 57.2800, lng: -5.5120, type: 'town' },
  { name: 'Stornoway', lat: 58.2999, lng: -6.7817, type: 'town' },
  { name: 'Kirkwall', lat: 58.9770, lng: -2.9605, type: 'town' },
  { name: 'Lerwick', lat: 60.1547, lng: -1.1455, type: 'town' },
  { name: 'Cairngorms', lat: 56.7000, lng: -4.0000, type: 'geo' },
  { name: 'Torridon', lat: 57.5500, lng: -5.1000, type: 'geo' },
  { name: 'Sutherland', lat: 58.2500, lng: -4.8000, type: 'geo' },
  { name: 'Knoydart', lat: 57.0000, lng: -5.5000, type: 'geo' },
  { name: 'Lochaber', lat: 56.8500, lng: -5.3000, type: 'geo' },
  { name: 'Perthshire', lat: 56.5000, lng: -4.5000, type: 'geo' },
  { name: 'Loch Lomond', lat: 56.1800, lng: -4.6000, type: 'geo' },
  { name: 'Loch Ness', lat: 57.1500, lng: -4.4800, type: 'geo' },
  { name: 'Borders', lat: 55.8000, lng: -3.0000, type: 'geo' },
  { name: 'Isle of Skye', lat: 57.3000, lng: -6.2000, type: 'island' },
  { name: 'Mull', lat: 56.3000, lng: -5.6000, type: 'island' },
  { name: 'Arran', lat: 55.6000, lng: -5.2000, type: 'island' },
  { name: 'Orkney', lat: 58.7700, lng: -3.0000, type: 'island' },
  { name: 'Shetland', lat: 60.3000, lng: -1.3000, type: 'island' },
  { name: 'Lewis & Harris', lat: 58.2000, lng: -6.4000, type: 'island' },
];
