import { defineCollection } from "astro:content";
import { authorSchema, postSchema, tagSchema } from "./schemas";

const authorCollection = defineCollection({
  type: "content",
  schema: authorSchema,
});

const tagCollection = defineCollection({
  type: "content",
  schema: tagSchema,
});

const postCollection = defineCollection({
  type: "content",
  schema: postSchema,
});

export const collections = {
  posts: postCollection,
  authors: authorCollection,
  tags: tagCollection,
};
