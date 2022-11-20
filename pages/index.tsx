import groq from "groq";
import client from "../client";
import { Wrapper } from "../components/Wrapper";
import { PostList } from "../components/PostList";
import { HeroContent } from "../components/HeroContent";

export default function Home({ posts }: { posts: any }) {
  // TODO: typing
  return (
    <Wrapper image>
      <div className="flex flex-col md:flex-row w-full mt-8 p-6">
        <div className="w-3/4 md:w-1/2">
          <HeroContent />
        </div>
        <div className="w-3/4 md:w-1/2 mt-8 md:mt-0">
          <PostList posts={posts} styles="w-full mx-10 md:mx-0 h-32 md:h-96" />
        </div>
      </div>
    </Wrapper>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
  `);
  return {
    props: {
      posts,
    },
  };
}
