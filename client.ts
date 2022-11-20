import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "eshxeroz",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-08-31",
});
