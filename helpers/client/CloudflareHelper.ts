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

export const createSSLForClient = async (clientName: string) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    },
    body: JSON.stringify({
      csr: "-----BEGIN CERTIFICATE REQUEST-----\nMIICxzCCAa8CAQAwSDELMAkGA1UEBhMCVVMxFjAUBgNVBAgTDVNhbiBGcmFuY2lz\nY28xCzAJBgNVBAcTAkNBMRQwEgYDVQQDEwtleGFtcGxlLm5ldDCCASIwDQYJKoZI\nhvcNAQEBBQADggEPADCCAQoCggEBALxejtu4b+jPdFeFi6OUsye8TYJQBm3WfCvL\nHu5EvijMO/4Z2TImwASbwUF7Ir8OLgH+mGlQZeqyNvGoSOMEaZVXcYfpR1hlVak8\n4GGVr+04IGfOCqaBokaBFIwzclGZbzKmLGwIQioNxGfqFm6RGYGA3be2Je2iseBc\nN8GV1wYmvYE0RR+yWweJCTJ157exyRzu7sVxaEW9F87zBQLyOnwXc64rflXslRqi\ng7F7w5IaQYOl8yvmk/jEPCAha7fkiUfEpj4N12+oPRiMvleJF98chxjD4MH39c5I\nuOslULhrWunfh7GB1jwWNA9y44H0snrf+xvoy2TcHmxvma9Eln8CAwEAAaA6MDgG\nCSqGSIb3DQEJDjErMCkwJwYDVR0RBCAwHoILZXhhbXBsZS5uZXSCD3d3dy5leGFt\ncGxlLm5ldDANBgkqhkiG9w0BAQsFAAOCAQEAcBaX6dOnI8ncARrI9ZSF2AJX+8mx\npTHY2+Y2C0VvrVDGMtbBRH8R9yMbqWtlxeeNGf//LeMkSKSFa4kbpdx226lfui8/\nauRDBTJGx2R1ccUxmLZXx4my0W5iIMxunu+kez+BDlu7bTT2io0uXMRHue4i6quH\nyc5ibxvbJMjR7dqbcanVE10/34oprzXQsJ/VmSuZNXtjbtSKDlmcpw6To/eeAJ+J\nhXykcUihvHyG4A1m2R6qpANBjnA0pHexfwM/SgfzvpbvUg0T1ubmer8BgTwCKIWs\ndcWYTthM51JIqRBfNqy4QcBnX+GY05yltEEswQI55wdiS3CjTTA67sdbcQ==\n-----END CERTIFICATE REQUEST-----",
      hostnames: ["example.com", "*.example.com"],
      request_type: "origin-rsa",
      requested_validity: 5475,
    }),
  };

  const res = await fetch(`${CLOUDFLARE_BASE_URL}/certificates`, postOptions);
  return await res.json();
};
