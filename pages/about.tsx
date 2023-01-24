import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { NextApiRequest } from "next";
import client from "../client";
import { MaxWidthContent } from "../components/MaxWidthContent";
import { Wrapper } from "../components/Wrapper";
import { getLoginSession } from "../helpers/Auth";
import { ptComponents } from "../helpers/PostHelper";
import { HeroContent } from "../components/HeroContent";

export default function About({ about, user }: { about: any; user: any }) {
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
                  {about?.title}
                </div>
                <div className="text-white flex flex-col w-full md:w-3/4">
                  <p className="text-3xl font-sans leading-snug mt-8 tracking-widest font-thin">
                    Find out more about who Robo House is and what we&lsquo;re
                    doing.
                  </p>
                </div>
              </>
            }
            image={
              <Image
                src="/images/house.png"
                alt="The Robo House"
                width="500"
                height="500"
                priority
              />
            }
          />
        </MaxWidthContent>
      </Wrapper>
      <Wrapper footer footerDark style="mt-12">
        <MaxWidthContent>
          <div className="grid md:grid-cols-2 gap-6 font-normal">
            <PortableText value={about?.who} components={ptComponents} />
          </div>
          <div className="grid md:grid-cols-2 gap-6 font-normal mt-8">
            <div>
              <PortableText value={about?.what} components={ptComponents} />
            </div>
            <div className="w-full flex justify-center items-center">
              <Image
                src="/images/robot-house-blue.png"
                alt="Robo House about me"
                width="500"
                height="500"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 font-normal mt-8">
            <PortableText value={about?.offers} components={ptComponents} />
          </div>
        </MaxWidthContent>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const session = await getLoginSession(
    req.cookies[process.env.COOKIE_NAME || ""],
    process.env.TOKEN_SECRET || ""
  );
  const about = await client.fetch(
    `
    *[_type == "about"][0]
    `
  );
  return {
    props: {
      about,
      user: session?.passport?.user || null,
    },
  };
}
