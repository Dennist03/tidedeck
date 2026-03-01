# TideDeck — Self-Hosted Tide Dashboard

> A beautiful, real-time tide dashboard for any coast — built for home lab screens, Cozyla panels, and self-hosted displays.

---

<img src="https://github.com/user-attachments/assets/placeholder-main" alt="TideDeck Dashboard - Main" width="100%">

---

## Overview

**TideDeck** is a fully self-hosted, single-page tide dashboard served via Docker and Nginx. It pulls live tide predictions from NOAA's free Tides & Currents API — no API key required — and layers in weather conditions, solunar fishing periods, moon phase, and a live sun arc card. Built for always-on home lab displays, Cozyla-style dashboards, wall-mounted screens, and smart home panels.

Works on any US coast. Search 3,000+ NOAA tide stations instantly.

---

## Features

- **NOAA tide chart** — Catmull-Rom spline curve with dynamic scaling, handles negative tides
- **Swipeable canvas** — 3-day scrollable chart centered on "now" with touch/swipe support
- **Interactive tooltips** — tap or click any point on the tide curve for exact height and time
- **Next tide strip** — up/down arrow, height, and ETA for the next 6 tidal events
- **Tide status bar** — live tide height, rate of change, and rising/falling direction
- **Weather card** — current conditions, feels like, wind, and humidity
- **Moon phase** — calculated locally with emoji, illumination percent, and rise/set times
- **Sun arc card** — animated SVG arc showing sunrise, sunset, and current sun position
- **Solunar periods** — major and minor fishing activity windows calculated from moon position
- **Water temperature** — pulled live from NOAA (where available)
- **Fuzzy station search** — finds 3,000+ NOAA stations with 3 keystrokes, handles misspellings
- **Zero required API keys** — NOAA Tides & Currents API is completely free
- **Mobile-first responsive** — sharp canvas via devicePixelRatio scaling, 3+3 tide strip breakpoint
- **Auto-refresh** — live data reloads automatically
- **SEO blocked** — `noindex, nofollow` meta tags for private deployments

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML5 / CSS3 / JavaScript (no frameworks) |
| Fonts | Google Fonts — Inter / Figtree |
| Web server | Nginx (Alpine) |
| Container | Docker / Docker Compose |
| Tide predictions | [NOAA Tides & Currents API](https://tidesandcurrents.noaa.gov/api-helper/url-helper.html) — **free, no key** |
| Station search | [NOAA Stations API](https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json) — **free, no key** |
| Water temp | [NOAA Water Temperature API](https://tidesandcurrents.noaa.gov/api/) — **free, no key** |
| Weather | [OpenWeatherMap One Call 3.0](https://openweathermap.org/api/one-call-3) *(optional, requires key)* |
| Tunneling | Cloudflare Tunnel (optional) |

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- A free [OpenWeatherMap](https://openweathermap.org/api) account with **One Call API 3.0** enabled *(optional — only needed for weather card)*

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Dennist03/tidedeck.git
cd tidedeck
```

### 2. Configure your station

Open `config.js` and fill in your details:

```js
const CONFIG = {

  // ── Default NOAA Tide Station ──────────────────────────────────
  // Find your station at: https://tidesandcurrents.noaa.gov/stations.html
  station_id:   'YOUR_NOAA_STATION_ID',   // e.g. '8727520'
  station_name: 'Your Station Name',      // e.g. 'Kings Bay, Crystal River'

  // ── Station Coordinates ────────────────────────────────────────
  // Used for weather, solunar, and sun/moon calculations.
  lat:  0.0,   // e.g.  28.9006
  lon:  0.0,   // e.g. -82.5926

  // ── OpenWeatherMap API Key (optional) ─────────────────────────
  // Only needed for weather conditions card.
  // Free account at https://openweathermap.org/api
  owm_key: 'YOUR_OPENWEATHERMAP_KEY_HERE',

};
```

> **Tip:** Not sure of your NOAA station ID? Just launch the app and use the built-in search — type the first 3 letters of any city or bay name to find it instantly.

> **Security:** Keep `config.js` private. Never commit your `owm_key` to a public repository.

### 3. Start the container

```bash
docker compose up -d
```

The dashboard will be available at `http://localhost:5003`.

---

## Docker Compose Reference

```yaml
services:
  tides:
    image: nginx:alpine
    container_name: tides-dashboard
    restart: unless-stopped
    ports:
      - "5003:80"
    volumes:
      - ./index.html:/usr/share/nginx/html/index.html:ro
      - ./config.js:/usr/share/nginx/html/config.js:ro
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
```

---

## Cloudflare Tunnel (optional)

To expose the dashboard over HTTPS without opening firewall ports, create a Cloudflare Tunnel pointed at `http://localhost:5003`. No other changes to the project are required.

---

## Finding Your NOAA Station

1. Visit [tidesandcurrents.noaa.gov/stations.html](https://tidesandcurrents.noaa.gov/stations.html)
2. Search for your nearest coastal city or inlet
3. Click your station — the ID is in the URL (e.g. `8727520`)
4. Copy the ID and coordinates into `config.js`

Or — just launch TideDeck and use the live search bar. Type 3+ characters and it will find and load any station automatically.

---

## Project Structure

```
tidedeck/
├── index.html          # Main single-page application
├── config.js           # Your station config (keep private — never commit keys)
├── docker-compose.yml  # Docker service definition
├── nginx.conf          # Nginx web server config
├── .gitignore
├── LICENSE
└── README.md
```

---

## API Notes

TideDeck is built to minimize external dependencies and cost:

| Data | Source | Key Required | Cost |
|---|---|---|---|
| Tide predictions | NOAA CO-OPS API | No | Free |
| Station list / search | NOAA Stations API | No | Free |
| Water temperature | NOAA CO-OPS API | No | Free |
| Sun / moon / solunar | Calculated locally | No | Free |
| Current weather | OpenWeatherMap | Yes | Free tier available |

The core tide, sun, moon, and solunar functionality works with **zero API keys**.

---

## Roadmap

- [ ] Offline PWA mode with service worker caching
- [ ] Multi-station favorites / quick-switch
- [ ] Tide alert notifications (push or webhook)
- [ ] TideDeck + ViewDeck combined dashboard suite

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE) © [Dennist03](https://github.com/Dennist03)
