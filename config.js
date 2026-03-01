// ─────────────────────────────────────────────────────────────────
//  TideDeck — Configuration
//  Fill in your details below, then save.
//  Never commit this file with real keys to a public repo.
// ─────────────────────────────────────────────────────────────────

const CONFIG = {

  // ── Default NOAA Tide Station ────────────────────────────────
  // Find your station at: https://tidesandcurrents.noaa.gov/stations.html
  station_id:   'YOUR_NOAA_STATION_ID',   // e.g. '8727520'
  station_name: 'Your Station Name',      // e.g. 'Kings Bay, Crystal River'

  // ── Station Coordinates ──────────────────────────────────────
  // Used for weather, solunar, and sun/moon calculations.
  // Decimal degrees — negative longitude for Western Hemisphere.
  lat:  0.0,   // e.g.  28.9006
  lon:  0.0,   // e.g. -82.5926

  // ── OpenWeatherMap API Key ───────────────────────────────────
  // Free account at https://openweathermap.org/api
  // Requires One Call API 3.0 for full weather data.
  owm_key: 'YOUR_OPENWEATHERMAP_KEY_HERE',

};
