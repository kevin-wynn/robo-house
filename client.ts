import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "eshxeroz",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
  token: process.env.SANITY_AUTH_TOKEN,
});
