import Image from "next/image";
import { NextApiRequest } from "next";
import { Wrapper } from "../../components/Wrapper";
import { PostList } from "../../components/PostList";
import { getAllPostsForTag } from "../../helpers/PostHelper";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { getLoginSession } from "../../helpers/Auth";
import { HeroContent } from "../../components/HeroContent";
import { NextApiRequestQuery } from "next/dist/server/api-utils";

export default function Tags({
  posts,
  user,
  slug,
}: {
  posts: any;
  user: any;
  slug: string;
}) {
  return (
    <>
      <Wrapper header user={user}>
        <HeroContent>
          <div className="p-6 w-full flex flex-col">
            <div className="text-5xl md:text-8xl font-serif tracking-tighter">
              Recent Posts: {slug}
            </div>
            <p className="text-xl md:text-2xl mt-4 md:mt-6 tracking-wider">
              See what we&lsquo;ve been up to, read about some of our clients.
              Or just poke around to see how busy we are.
            </p>
          </div>
        </HeroContent>
      </Wrapper>
      <Wrapper footer style="mt-12">
        <MaxWidthContent>
          <PostList posts={posts} />
        </MaxWidthContent>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps({
  query,
  req,
}: {
  query: NextApiRequestQuery;
  req: NextApiRequest;
}) {
  const slug = query.slug as string;
  const posts = await getAllPostsForTag(slug);
  const session = await getLoginSession(
    req.cookies[process.env.COOKIE_NAME || ""],
    process.env.TOKEN_SECRET || ""
  );
  return {
    props: {
      user: session?.passport?.user || null,
      posts,
      slug,
    },
  };
}
