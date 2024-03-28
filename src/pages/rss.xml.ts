import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
  const blogEntries = await getCollection("posts");

  return rss({
    title: "Robo House Blog",
    description:
      "Robo House is a custom web design and web development shop based in the heart of Waco, TX. Specializing in creating bespoke online solutions tailored to your unique needs and preferences. From stunning website designs to robust web development, committed to bringing your vision to life with creativity, precision, and expertise.",
    site: context.site ?? "https://robo-house.com",
    items: blogEntries.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
};
