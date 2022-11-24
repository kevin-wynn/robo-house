import { PortableText } from "@portabletext/react";
import client from "../client";
import { Wrapper } from "../components/Wrapper";
import { ptComponents } from "../helpers/PostHelper";

export default function About({ about }: { about: any }) {
  return (
    <Wrapper>
      <div className="flex flex-col justify-center items-center w-full md:h-full md:min-h-screen mt-8 p-6 md:p-0">
        <div className="flex flex-col max-w-4xl text-left">
          <h2 className="text-4xl mb-4 border-b-blood border-b-2 text-quicksilver">
            {about?.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 font-normal">
            <PortableText value={about?.who} components={ptComponents} />
          </div>
          <div className="flex flex-col w-full font-normal mt-8">
            <PortableText value={about?.what} components={ptComponents} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export async function getStaticProps(context: {
  params: { slug?: string | undefined };
}) {
  const about = await client.fetch(
    `
    *[_type == "about"][0]
    `
  );
  return {
    props: {
      about,
    },
  };
}
