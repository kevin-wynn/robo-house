import { Wrapper } from "../components/Wrapper";
import { HeroContent } from "../components/HeroContent";
import { getAllPosts } from "../helpers/PostHelper";
import { MaxWidthContent } from "../components/MaxWidthContent";
import { DescriptorContent } from "../components/DescriptorContent";
import { GradientDivider } from "../components/GradientDivider";
import { PostList } from "../components/PostList";
import { getLoginSession } from "../helpers/Auth";

export default function Home({ posts, user }: { posts: any; user: any }) {
  return (
    <>
      <Wrapper
        header
        style="bg-dune bg-center bg-cover bg-no-repeat"
        user={user}
      >
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

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  const posts = await getAllPosts();
  const session = await getLoginSession(
    req.cookies[process.env.COOKIE_NAME || ""],
    process.env.TOKEN_SECRET
  );
  return {
    props: {
      user: session.passport.user || null,
      posts,
    },
  };
}
