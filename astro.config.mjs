import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://robo-house.com",
  output: "server",
  adapter: cloudflare(),
  devToolbar: {
    enabled: false,
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    preact(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
