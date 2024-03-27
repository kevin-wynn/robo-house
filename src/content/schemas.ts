import { reference, z } from "astro:content";

export const authorSchema = z.object({ name: z.string() });
export const tagSchema = z.object({ name: z.string(), color: z.string() });

export const postSchema = z.object({
  title: z.string(),
  date: z.date(),
  description: z.string(),
  authors: z.array(reference("authors")),
  tags: z.array(reference("tags")),
  image: z.string(),
});
