import http from "node:http";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env"), "utf8");
    const env = {};
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
    }
    return env;
  } catch {
    return {};
  }
}

const env = loadEnv();
const CLIENT_ID = env.STRAVA_CLIENT_ID || process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = env.STRAVA_CLIENT_SECRET || process.env.STRAVA_CLIENT_SECRET;
const PORT = 4322;
const REDIRECT = `http://localhost:${PORT}/callback`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing STRAVA_CLIENT_ID or STRAVA_CLIENT_SECRET in .env");
  process.exit(1);
}

const authUrl =
  `https://www.strava.com/oauth/authorize?` +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT,
    response_type: "code",
    approval_prompt: "auto",
    scope: "activity:read_all",
  }).toString();

console.log("\n1. Make sure your Strava app's Authorization Callback Domain is set to: localhost");
console.log("\n2. Open this URL in your browser:\n");
console.log(`   ${authUrl}\n`);
console.log("3. After you click Authorize, Strava redirects back here.\n");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404);
    res.end();
    return;
  }
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  if (error || !code) {
    res.writeHead(400, { "content-type": "text/plain" });
    res.end(`auth failed: ${error || "no code"}`);
    console.error("auth failed:", error || "no code");
    server.close();
    process.exit(1);
  }
  try {
    const tokenRes = await fetch("https://www.strava.com/api/v3/oauth/token", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }),
    });
    const data = await tokenRes.json();
    if (!tokenRes.ok) throw new Error(JSON.stringify(data));
    res.writeHead(200, { "content-type": "text/html" });
    res.end(
      `<html><body style="font-family:monospace;padding:40px;background:#0a0a0a;color:#f5f0e8;"><h2>Auth complete.</h2><p>You can close this tab and return to the terminal.</p></body></html>`
    );
    console.log("\n✔ Auth complete. Add this to your .env:\n");
    console.log(`STRAVA_ACCESS_TOKEN="${data.access_token}"`);
    console.log(`STRAVA_REFRESH_TOKEN="${data.refresh_token}"`);
    console.log(`\n(expires_at ${new Date(data.expires_at * 1000).toISOString()}, scope: ${data.athlete ? "ok" : "?"})`);
    console.log("\nThe build will refresh the access token automatically as long as STRAVA_REFRESH_TOKEN, STRAVA_CLIENT_ID, and STRAVA_CLIENT_SECRET are set.\n");
    server.close();
    process.exit(0);
  } catch (e) {
    res.writeHead(500);
    res.end("token exchange failed");
    console.error("token exchange failed:", e);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log(`(local callback server listening on :${PORT})\n`);
});
