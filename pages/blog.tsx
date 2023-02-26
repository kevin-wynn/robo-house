import { NextApiRequest } from "next";
import { Wrapper } from "../components/Wrapper";
import { PostList } from "../components/PostList";
import { getAllPosts } from "../helpers/PostHelper";
import { MaxWidthContent } from "../components/MaxWidthContent";
import { getLoginSession } from "../helpers/Auth";
import { HeroContent } from "../components/HeroContent";

export default function Blog({ posts, user }: { posts: any; user: any }) {
  return (
    <>
      <Wrapper header footer user={user} style="min-h-screen">
        <MaxWidthContent>
          <PostList posts={posts} />
        </MaxWidthContent>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const posts = await getAllPosts();
  const session = await getLoginSession(
    req.cookies[process.env.COOKIE_NAME || ""],
    process.env.TOKEN_SECRET || ""
  );
  return {
    props: {
      user: session?.passport?.user || null,
      posts,
    },
  };
}
