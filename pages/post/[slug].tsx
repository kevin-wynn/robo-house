import { PortableText } from "@portabletext/react";
import client from "../../client";
import { Wrapper } from "../../components/Wrapper";
import { getPostBySlug, ptComponents, urlFor } from "../../helpers/PostHelper";
import { Tag as TagType } from "../../types/Tag";
import { Tag } from "../../components/Tag";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import Image from "next/image";

const POST_IMAGE_WIDTH = 2400;

const Post = ({ post }: { post: any }) => {
  if (post) {
    return (
      <Wrapper header footer footerDark>
        <div className="flex flex-col items-center w-full mt-12">
          <div
            style={{
              backgroundImage: `url('${urlFor(post?.mainImage)
                .width(POST_IMAGE_WIDTH)
                .url()}')`,
            }}
            className="-z-10 -mt-44 pt-44 pb-44 top-0 w-full flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center"
          >
            <h2 className="text-4xl md:text-8xl font-heavy font-black text-stone z-10 tracking-tighter text-center">
              {post?.title}
            </h2>
            <div className="z-10 mt-8 flex items-center justify-center flex-row w-full">
              {post?.tags?.map((tag: TagType) => (
                <Tag key={tag._id} tag={tag} />
              ))}
            </div>
          </div>
          <MaxWidthContent maxWidth="max-w-screen-lg">
            <div className="w-full mt-8">
              <PortableText value={post?.body} components={ptComponents} />
            </div>
          </MaxWidthContent>
        </div>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: {
  params: { slug?: string | undefined };
}) {
  const { slug = "" } = context.params;
  const post = await getPostBySlug(slug);
  return {
    props: {
      post,
    },
  };
}

export default Post;
