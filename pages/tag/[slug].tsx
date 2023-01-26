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
      <Wrapper
        header
        user={user}
        style="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-900 via-orange-500 to-indigo-700"
      >
        <MaxWidthContent>
          <HeroContent
            content={
              <>
                <div className="text-6xl md:text-8xl font-heavy font-black tracking-tighter">
                  Recent Posts: {slug}
                </div>
                <div className="text-stone flex flex-col w-full md:w-3/4">
                  <p className="text-3xl font-sans leading-snug mt-8 tracking-widest font-thin">
                    See what we&lsquo;ve been up to, read about some of our
                    clients. Or just poke around to see how busy we are.
                  </p>
                </div>
              </>
            }
            image={
              <Image
                src="/images/robot-house-wave.png"
                alt="The Robo House Robot"
                width="700"
                height="700"
                className="mt-16"
                priority
              />
            }
          />
        </MaxWidthContent>
      </Wrapper>
      <Wrapper footer footerDark>
        <MaxWidthContent>
          <PostList animate posts={posts} />
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
