import { PortableText } from "@portabletext/react";
import client from "../../client";
import { Wrapper } from "../../components/Wrapper";
import { getPostBySlug, ptComponents, urlFor } from "../../helpers/PostHelper";
import { Tag as TagType } from "../../types/Tag";
import { Tag } from "../../components/Tag";
import { MaxWidthContent } from "../../components/MaxWidthContent";

const POST_IMAGE_WIDTH = 2400;

const Post = ({ post }: { post: any }) => {
  if (post) {
    return (
      <Wrapper header footer footerDark>
        <div className="flex flex-col items-center w-full mt-8 p-6 md:p-0">
          <div className="-z-10 top-0 w-full flex flex-col justify-center items-center h-44 mb-16">
            <MaxWidthContent>
              <h2 className="text-6xl md:text-8xl font-heavy font-black text-white z-10 tracking-tighter text-center">
                {post?.title}
              </h2>
            </MaxWidthContent>
            <div className="absolute top-0 bg-black opacity-25 z-0 w-full h-3/4 md:h-96"></div>
            <img
              alt="main blog image"
              src={urlFor(post?.mainImage).width(POST_IMAGE_WIDTH).url()}
              className="absolute top-0 object-cover object-center w-full -z-10 h-3/4 md:h-96"
            />
          </div>
          <MaxWidthContent maxWidth="max-w-screen-lg">
            <div className="mt-8 z-10 flex items-start justify-start flex-row w-full">
              {post?.tags?.map((tag: TagType) => (
                <Tag tag={tag} />
              ))}
            </div>
            <div className="mt-48 md:mt-8">
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
