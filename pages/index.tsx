import { Wrapper } from "../components/Wrapper";
import { PostList } from "../components/PostList";
import { HeroContent } from "../components/HeroContent";
import { getAllPosts } from "../helpers/PostHelper";

export default function Home({ posts }: { posts: any }) {
  // TODO: typing
  return (
    <Wrapper>
      <div className="flex flex-col h-full lg:flex-row justify-center items-center w-full p-2 md:p-0">
        <div className="w-3/4 md:w-1/2 flex">
          <HeroContent />
        </div>
        <div className="w-3/4 md:w-1/2  mt-8 md:mt-0 flex">
          <PostList posts={posts} styles="w-full md:mx-10 h-32 md:h-96" />
        </div>
      </div>
    </Wrapper>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
