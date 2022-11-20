import groq from "groq";
import client from "../client";
import { Wrapper } from "../components/Wrapper";
import { PostList } from "../components/PostList";

export default function Posts({ posts }: { posts: any }) {
  // TODO: typing
  return (
    <Wrapper image>
      <div className="flex flex-col justify-center items-center w-full h-96 md:min-h-screen p-6 md:p-0">
        <PostList posts={posts} />
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
