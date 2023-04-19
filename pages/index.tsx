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
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif mb-6">
                  Design, planning, and building.
                </h2>

                <p className="mb-2">
                  At Robo House, we understand that every client is unique and
                  has their own specific needs and requirements. That's why we
                  take the time to listen to our clients, understand their
                  goals, and work with them to develop a custom solution that
                  meets their needs and exceeds their expectations.
                </p>

                <p className="mb-2">
                  Our design process starts with a thorough consultation, where
                  we get to know our clients and learn about their brand, target
                  audience, and business objectives. From there, we create a
                  custom design that reflects their brand and conveys their
                  message effectively.
                </p>

                <p className="mb-2">
                  Once the design is finalized, we gets to work, building a
                  website or application that is fast, secure, and easy to use.
                  We use the latest technologies and industry best practices to
                  ensure that our clients' websites and applications are
                  functional, reliable, and scalable.
                </p>

                <p className="mb-2">
                  In addition to website and application design and development,
                  we also offer ongoing support and maintenance services to
                  ensure that our clients' websites and applications remain
                  up-to-date, secure, and optimized. We are committed to
                  providing exceptional service and building long-term
                  relationships with our clients.
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
                  At Robo-House, we are committed to providing our clients with
                  exceptional service and transparency throughout the entire
                  design and development process. That's why we offer a
                  comprehensive dashboard that clients can use to log in and
                  view the status of their projects and website or application
                  hosting.
                </p>

                <p className="mb-2">
                  Our dashboard provides real-time updates on the progress of
                  each project, including milestones achieved and upcoming
                  tasks. Clients can also view their website or application
                  hosting status, including uptime, server load, and other
                  critical metrics.
                </p>

                <p className="mb-2">
                  With our dashboard, clients have complete visibility into the
                  status of their projects and website or application hosting,
                  enabling them to make informed decisions and stay up-to-date
                  on the latest developments. Our team is always available to
                  answer any questions or concerns and provide support whenever
                  needed.
                </p>
              </div>
            </Card>
          </CardListColumn>
          <CardListColumn>
            <Card>
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif mb-6">
                  Build anything you can think of.
                </h2>

                <p className="mb-2">
                  At Robo House, we pride ourselves on being a one-stop-shop for
                  all your digital needs. We are experts with a wealth of
                  experience in planning, designing, and building a wide range
                  of digital products, including websites, applications,
                  infrastructure, and mobile applications for both iOS and
                  Android.
                </p>

                <p className="mb-2">
                  Whether you're looking to launch a new website, develop a
                  custom application, or build a robust infrastructure to
                  support your digital needs, we have the expertise and
                  resources to bring your vision to life. We use the latest
                  technologies and industry best practices to ensure that your
                  digital products are fast, secure, and easy to use.
                </p>

                <p className="mb-2">
                  Our approach to development is collaborative and
                  client-focused, and we work closely with our clients to
                  understand their goals and requirements. We provide regular
                  updates and seek feedback throughout the development process,
                  ensuring that our clients are always informed and satisfied
                  with the end product.
                </p>

                <Image
                  src="/images/desk.jpg"
                  height="300"
                  width="500"
                  alt="Desk"
                  className="my-6 grayscale"
                />
              </div>
            </Card>
          </CardListColumn>
        </CardsList>
        <div className="w-full">
          <DividerHeader underline align="left" text="From the Desk" />
          <CardsList cols={3}>
            {posts.map((post: any) => (
              <div>
                <Card key={post._id}>
                  <PostItem post={post} />
                </Card>
              </div>
            ))}
          </CardsList>
        </div>
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
