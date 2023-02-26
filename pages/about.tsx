import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { NextApiRequest } from "next";
import client from "../client";
import { MaxWidthContent } from "../components/MaxWidthContent";
import { Wrapper } from "../components/Wrapper";
import { getLoginSession } from "../helpers/Auth";
import { ptComponents } from "../helpers/PostHelper";
import { HeroContent } from "../components/HeroContent";
import { CardListColumn } from "../components/CardListColumn";
import { CardsList } from "../components/CardsList";

export default function About({ about, user }: { about: any; user: any }) {
  return (
    <>
      <Wrapper header user={user}>
        <HeroContent>
          <div className="p-6 w-full flex flex-col">
            <div className="text-5xl md:text-8xl font-serif tracking-tighter">
              {about?.title}
            </div>
            <p className="text-xl md:text-2xl mt-4 md:mt-6 tracking-wider">
              Find out more about who Robo House is and what we&lsquo;re doing.
            </p>
          </div>
        </HeroContent>
      </Wrapper>
      <Wrapper footer style="mt-12">
        <CardsList cols={3}>
          <CardListColumn>
            <PortableText value={about?.who} components={ptComponents} />
          </CardListColumn>
          <CardListColumn>
            <PortableText value={about?.what} components={ptComponents} />
          </CardListColumn>
          <CardListColumn>
            <PortableText value={about?.offers} components={ptComponents} />
          </CardListColumn>
        </CardsList>
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
