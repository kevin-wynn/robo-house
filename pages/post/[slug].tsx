import { PortableText } from "@portabletext/react";
import client from "../../client";
import { Wrapper } from "../../components/Wrapper";
import { getPostBySlug, ptComponents, urlFor } from "../../helpers/PostHelper";
import { Tag as TagType } from "../../types/Tag";
import { Tag } from "../../components/Tag";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import Image from "next/image";

const POST_IMAGE_WIDTH = 1200;
const AUTHOR_IMAGE_WIDTH = 200;

const Post = ({ post }: { post: any }) => {
  console.log("post:", post);

  if (post) {
    return (
      <Wrapper header footer>
        <div className="flex flex-col items-center w-full mt-12 relative">
          <MaxWidthContent maxWidth="max-w-screen-lg">
            <div className="w-full bg-white p-8">
              <h2 className="text-4xl md:text-5xl font-serif tracking-tighter">
                {post?.title}
                <span className="text-sm font-sans tracking-wide ml-2 font-thin my-2 ">
                  {new Date(post?.publishedAt).toLocaleDateString()}
                </span>
              </h2>
              <Image
                alt="Post Image"
                width={POST_IMAGE_WIDTH}
                height={POST_IMAGE_WIDTH}
                src={urlFor(post?.mainImage).width(POST_IMAGE_WIDTH).url()}
                className="my-8 h-96 object-cover grayscale"
              />
              <PortableText value={post?.body} components={ptComponents} />
              <div className="mt-4 mb-8 flex items-center flex-row w-full">
                {post?.tags?.map((tag: TagType) => (
                  <Tag key={tag._id} tag={tag} />
                ))}
              </div>
              {post.author && (
                <div className="my-8 flex flex-row items-end">
                  <Image
                    alt={post.author.name}
                    src={urlFor(post.author.image)
                      .width(AUTHOR_IMAGE_WIDTH)
                      .url()}
                    className="w-14 h-14 rounded-md grayscale mr-2"
                    width={AUTHOR_IMAGE_WIDTH}
                    height={AUTHOR_IMAGE_WIDTH}
                  />
                  <span className="text-sm">{post.author.name}</span>
                </div>
              )}
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
