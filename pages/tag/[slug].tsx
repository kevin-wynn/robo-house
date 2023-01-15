import client from "../../client";
import { Wrapper } from "../../components/Wrapper";
import { PostList } from "../../components/PostList";
import { getAllPostsForTag } from "../../helpers/PostHelper";

export default function Posts({ posts }: { posts: any }) {
  // TODO: typing
  return (
    <Wrapper>
      <div className="flex flex-row justify-center items-center w-full p-6 md:p-0 h-full">
        <PostList posts={posts} />
      </div>
    </Wrapper>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "tag" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: {
  params: { slug?: string | undefined };
}) {
  const { slug = "" } = context.params;
  const posts = await getAllPostsForTag(slug);
  return {
    props: {
      posts,
    },
  };
}
