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
      <Wrapper header user={user}>
        <HeroContent>
          <div className="p-6 w-full flex flex-col">
            <div className="text-5xl md:text-8xl font-serif tracking-tighter">
              Recent Posts
            </div>
            <p className="text-xl md:text-2xl mt-4 md:mt-6 tracking-wider">
              See what we&lsquo;ve been up to, read about some of our clients.
              Or just poke around to see how busy we are.
            </p>
          </div>
        </HeroContent>
      </Wrapper>
      <Wrapper footer user={user} style="min-h-screen">
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
