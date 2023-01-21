import { Wrapper } from "../components/Wrapper";
import { HeroContent } from "../components/HeroContent";
import { getAllPosts } from "../helpers/PostHelper";
import { MaxWidthContent } from "../components/MaxWidthContent";
import { DescriptorContent } from "../components/DescriptorContent";
import { GradientDivider } from "../components/GradientDivider";
import { PostList } from "../components/PostList";

export default function Home({ posts }: { posts: any }) {
  return (
    <>
      <Wrapper header style="bg-dune bg-center bg-cover bg-no-repeat">
        <MaxWidthContent>
          <HeroContent />
        </MaxWidthContent>
        <GradientDivider />
      </Wrapper>
      <Wrapper footer style="-mt-48">
        <DescriptorContent />
        <PostList animate posts={posts} horizontal />
      </Wrapper>
    </>
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
