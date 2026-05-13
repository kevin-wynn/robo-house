export type StravaActivity = {
  id: number;
  name: string;
  type: string;
  sport_type: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  average_speed: number;
  max_speed: number;
  average_watts?: number;
  kilojoules?: number;
  start_date: string;
  start_date_local: string;
  start_latlng?: [number, number];
  end_latlng?: [number, number];
  map: {
    id: string;
    summary_polyline: string | null;
  };
  achievement_count?: number;
  pr_count?: number;
};

export type Ride = {
  id: number;
  name: string;
  date: string;
  distanceMi: string;
  movingTime: string;
  elevationFt: string;
  avgSpeedMph: string;
  maxSpeedMph: string;
  avgWatts: string | null;
  pathD: string;
  startEndPoints: { start: [number, number]; end: [number, number] } | null;
  viewBox: string;
  markerR: number;
};

const RIDE_TYPES = new Set([
  "Ride",
  "VirtualRide",
  "EBikeRide",
  "GravelRide",
  "MountainBikeRide",
  "Velomobile",
  "Handcycle",
]);

export type StravaCreds = {
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
};

export async function getAccessToken(creds: StravaCreds): Promise<string> {
  if (creds.refreshToken && creds.clientId && creds.clientSecret) {
    const res = await fetch("https://www.strava.com/api/v3/oauth/token", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: creds.clientId,
        client_secret: creds.clientSecret,
        refresh_token: creds.refreshToken,
        grant_type: "refresh_token",
      }),
    });
    if (!res.ok) {
      throw new Error(
        `strava token refresh ${res.status}: ${await res.text()}`,
      );
    }
    const data = (await res.json()) as { access_token: string };
    return data.access_token;
  }
  if (creds.accessToken) return creds.accessToken;
  throw new Error("no strava credentials available");
}

export async function fetchRecentRides(
  credsOrToken: StravaCreds | string,
  limit = 6,
): Promise<Ride[]> {
  const token =
    typeof credsOrToken === "string"
      ? credsOrToken
      : await getAccessToken(credsOrToken);
  const res = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=30`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) {
    throw new Error(`strava ${res.status}: ${await res.text()}`);
  }
  const activities = (await res.json()) as StravaActivity[];
  return activities
    .filter(
      (a) =>
        (RIDE_TYPES.has(a.type) || RIDE_TYPES.has(a.sport_type)) &&
        a.map?.summary_polyline,
    )
    .slice(0, limit)
    .map(toRide);
}

function toRide(a: StravaActivity): Ride {
  const coords = decodePolyline(a.map.summary_polyline ?? "");
  const { d, viewBox, startEnd, markerR } = coordsToSvg(coords);
  return {
    id: a.id,
    name: a.name,
    date: formatDate(a.start_date_local),
    distanceMi: (a.distance / 1609.344).toFixed(1),
    movingTime: formatDuration(a.moving_time),
    elevationFt: Math.round(a.total_elevation_gain * 3.28084).toLocaleString(),
    avgSpeedMph: (a.average_speed * 2.236936).toFixed(1),
    maxSpeedMph: (a.max_speed * 2.236936).toFixed(1),
    avgWatts: a.average_watts ? Math.round(a.average_watts).toString() : null,
    pathD: d,
    startEndPoints: startEnd,
    viewBox,
    markerR,
  };
}

export function decodePolyline(str: string): [number, number][] {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coords: [number, number][] = [];
  while (index < str.length) {
    let b: number;
    let shift = 0;
    let result = 0;
    do {
      b = str.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = str.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;
    coords.push([lat * 1e-5, lng * 1e-5]);
  }
  return coords;
}

function coordsToSvg(coords: [number, number][]): {
  d: string;
  viewBox: string;
  startEnd: { start: [number, number]; end: [number, number] } | null;
  markerR: number;
} {
  if (coords.length === 0) {
    return { d: "", viewBox: "0 0 100 100", startEnd: null, markerR: 1 };
  }
  const SCALE = 100000;
  const PAD = 20;

  const projected = coords.map(([lat, lng]) => {
    const x = ((lng * Math.PI) / 180) * SCALE;
    const y = -Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * SCALE;
    return [x, y] as [number, number];
  });

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of projected) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  const points = projected.map(
    ([x, y]) => [x - minX + PAD, y - minY + PAD] as [number, number],
  );
  const w = maxX - minX + PAD * 2;
  const h = maxY - minY + PAD * 2;

  const d = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");

  return {
    d,
    viewBox: `0 0 ${w.toFixed(1)} ${h.toFixed(1)}`,
    startEnd: { start: points[0], end: points[points.length - 1] },
    markerR: Math.max(w, h) * 0.012,
  };
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}
