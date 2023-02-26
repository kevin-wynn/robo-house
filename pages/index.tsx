import Image from "next/image";
import { Wrapper } from "../components/Wrapper";
import { HeroContent } from "../components/HeroContent";
import { getAllPosts } from "../helpers/PostHelper";
import { getLoginSession } from "../helpers/Auth";
import { NextApiRequest } from "next";
import { CardsList } from "../components/CardsList";
import { Card } from "../components/Card";
import { DividerHeader } from "../components/DividerHeader";
import { PostItem } from "../components/PostItem";
import { CardListColumn } from "../components/CardListColumn";

export default function Home({ posts, user }: { posts: any; user: any }) {
  return (
    <>
      <Wrapper header user={user}>
        <HeroContent>
          <div className="p-6 w-full flex flex-col">
            <div className="text-5xl md:text-8xl font-serif tracking-tighter">
              <span className="italic">the internet; </span>all in one.
            </div>
            <p className="text-xl md:text-2xl mt-4 md:mt-6 tracking-wider">
              Design, develop, build, host, and maintain your internet presence
              in one package.
            </p>
          </div>
        </HeroContent>
      </Wrapper>
      <Wrapper style="mt-12" footer>
        <CardsList cols={3}>
          <CardListColumn>
            <Card>
              <DividerHeader underline align="left" text="What is Robo House" />
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif mb-6">
                  Design, planning, and building.
                </h2>
                <p className="mb-2">
                  With Robo House we can help you design your new website or
                  application. With over 10 years of experience in web design we
                  can provide you with ongoing design support for the best user
                  experience possible.
                </p>
                <Image
                  src="/images/studio.jpg"
                  height="300"
                  width="500"
                  alt="Studio"
                  className="my-6 grayscale"
                />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif mb-6">
                  Build anything you can think of.
                </h2>
                <p className="mb-2">
                  From building a marketing site to build your web applicaiton
                  or iOS/Android application. All can be done through Robo
                  House. Every step of the process can be accounted for and
                  performed.
                </p>
              </div>
            </Card>
          </CardListColumn>
          <CardListColumn>
            <Card>
              <div className="flex flex-col">
                <Image
                  src="/images/building.jpg"
                  height="300"
                  width="500"
                  alt="Building"
                  className="my-6 grayscale"
                />
                <h2 className="text-3xl font-serif mb-6">
                  Manage everything on your dashboard.
                </h2>
                <p className="mb-2">
                  See time spent on projects, hault progress, make revisions,
                  create new projects. See the status of your website and stand
                  up new ones with only a few clicks. One click deploy Wordpress
                  and configurable Docker applications. All backed by world
                  leading resources like AWS and Cloudflare.
                </p>
              </div>
            </Card>
          </CardListColumn>
          <CardListColumn>
            <Card>
              <DividerHeader underline align="left" text="From the Desk" />
            </Card>
            {posts.map((post: any) => (
              <Card key={post._id}>
                <PostItem post={post} />
              </Card>
            ))}
          </CardListColumn>
        </CardsList>
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
