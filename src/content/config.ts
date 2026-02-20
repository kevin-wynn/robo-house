import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    art: z
      .enum(["warhol-1", "noir-1", "splash-1", "grid-1"])
      .default("warhol-1"),
  }),
});

export const collections = { blog };
