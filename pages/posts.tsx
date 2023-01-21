import { Wrapper } from "../components/Wrapper";
import { PostList } from "../components/PostList";
import { getAllPosts } from "../helpers/PostHelper";

export default function Posts({ posts }: { posts: any }) {
  return (
    <Wrapper header footer>
      <div className="flex flex-row justify-center items-center w-full p-6 md:p-0 h-full">
        <PostList animate={false} horizontal={false} posts={posts} />
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
