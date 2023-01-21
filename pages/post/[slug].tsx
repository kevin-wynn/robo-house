import { PortableText } from "@portabletext/react";
import client from "../../client";
import { Wrapper } from "../../components/Wrapper";
import { getPostBySlug, ptComponents, urlFor } from "../../helpers/PostHelper";

const POST_IMAGE_WIDTH = 2400;

const Post = ({ post }: { post: any }) => {
  // TODO: typing
  if (post) {
    return (
      <Wrapper>
        <div className="flex flex-col items-center w-full md:h-full md:min-h-screen mt-8 p-6 md:p-0">
          <div className="mb-8 relative w-full">
            <img
              alt="main blog image"
              src={urlFor(post?.mainImage).width(POST_IMAGE_WIDTH).url()}
              className="absolte object-cover object-center h-40 md:h-96 w-full"
            />
          </div>
          <h2 className="text-4xl mb-4 border-b-blood border-b-2">
            {post?.title}
          </h2>
          <div className="mb-4">
            {/* TODO: Typing */}
            {post?.tags?.map((tag: any) => (
              <a
                className="inline-block my-2 px-2 py-2 rounded-lg mr-4 font-medium text-xs hover:opacity-70 duration-200"
                key={tag._id}
                style={{ backgroundColor: tag.tagColor.hex }}
                href={`/tag/${tag.slug.current}`}
              >
                {tag.tag}
              </a>
            ))}
          </div>
          <div className="max-w-full md:max-w-4xl">
            <PortableText value={post?.body} components={ptComponents} />
          </div>
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
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const post = await getPostBySlug(slug);
  return {
    props: {
      post,
    },
  };
}

export default Post;
