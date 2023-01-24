import Image from "next/image";
import { Wrapper } from "../components/Wrapper";
import { HeroContent } from "../components/HeroContent";
import { getAllPosts } from "../helpers/PostHelper";
import { MaxWidthContent } from "../components/MaxWidthContent";
import { DescriptorContent } from "../components/DescriptorContent";
import { PostList } from "../components/PostList";
import { getLoginSession } from "../helpers/Auth";
import { NextApiRequest } from "next";

export default function Home({ posts, user }: { posts: any; user: any }) {
  return (
    <>
      <Wrapper
        header
        style="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-900 via-orange-500 to-indigo-700"
        user={user}
      >
        <MaxWidthContent>
          <HeroContent
            content={
              <>
                <div className="text-4xl md:text-8xl font-heavy font-black tracking-tighter">
                  Create and host projects in one place.
                </div>
                <div className="text-white flex flex-col w-full md:w-3/4">
                  <p className="text-2xl md:text-3xl font-sans leading-snug mt-8 tracking-widest font-thin">
                    One dashboard to manage your projects from inception,
                    through creation, and to hosting.
                  </p>
                </div>
              </>
            }
            image={
              <Image
                src="/images/robot-house.png"
                alt="The Robo House Robot"
                width="700"
                height="700"
              />
            }
          />
        </MaxWidthContent>
      </Wrapper>
      <Wrapper>
        <MaxWidthContent>
          <DescriptorContent
            imagePosition="left"
            imageURL="/images/house-orbs.png"
            imageAlt="Robo House is a one stop shop for anything you need online"
            content={
              <>
                <h2 className="text-xl md:text-4xl text-granite mb-12">
                  Design and planning
                </h2>
                <p className="text-sm leading-8 tracking-widest font-thin mb-2">
                  With Robo House we can help you design your new website or
                  application. With over 10 years of experience in web design we
                  can provide you with ongoing design support for the best user
                  experience possible.
                </p>
                <p className="text-sm leading-8 tracking-widest font-thin">
                  Utilizing the power of AI to help iterate on a unique and
                  effective design that will drive more leads and give you
                  better results.
                </p>
              </>
            }
          />
          <DescriptorContent
            imagePosition="right"
            imageURL="/images/space.png"
            imageAlt="Robo House is a one stop shop for anything you need online"
            content={
              <>
                <h2 className="text-xl md:text-4xl text-granite mb-12">
                  Manage everything with our dashboard
                </h2>
                <p className="text-sm leading-8 tracking-widest font-thin mb-2">
                  See time spent on projects, hault progress, make revisions,
                  create new projects. See the status of your website and stand
                  up new ones with only a few clicks. All backed by world
                  leading resources like AWS and Cloudflare.
                </p>
              </>
            }
          />
        </MaxWidthContent>
      </Wrapper>
      <Wrapper
        footer
        style="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-900 via-orange-500 to-indigo-700 min-h-screen"
      >
        <PostList animate posts={posts} />
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
