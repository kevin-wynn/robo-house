const CLOUDFLARE_BASE_URL = "https://api.cloudflare.com/client/v4";
const ROBO_HOUSE_ZONE_ID = "7672ef490375a12c49dfcb33c04e3e7f";
const ROBO_HOUSE_URL = "robo-house.com";

export const createSubdomainForClient = async (
  clientName: string,
  ip: string
) => {
  const res = await fetch(
    `${CLOUDFLARE_BASE_URL}/zones/${ROBO_HOUSE_ZONE_ID}/dns_records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({
        comment: "Client Wordpress Subdomain",
        content: ip,
        name: `${clientName}.${ROBO_HOUSE_URL}`,
        proxied: true,
        ttl: 3600,
        type: "A",
      }),
    }
  );
  return await res.json();
};
