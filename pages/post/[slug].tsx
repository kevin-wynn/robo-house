import { PortableText } from "@portabletext/react";
import client from "../../client";
import { Wrapper } from "../../components/Wrapper";
import { ptComponents, urlFor } from "../../helpers/PostHelper";

const POST_IMAGE_WIDTH = 400;

const Post = ({ post }: { post: any }) => {
  // TODO: typing
  if (post) {
    return (
      <Wrapper>
        <div className="flex flex-col justify-center items-center w-full md:h-full md:min-h-screen mt-8 p-6 md:p-0">
          <div className="mb-8">
            <img
              width={400}
              height={400}
              alt="main blog image"
              src={urlFor(post?.mainImage).width(POST_IMAGE_WIDTH).url()}
            />
          </div>
          <h2 className="text-4xl mb-4 border-b-blood border-b-2 text-quicksilver">
            {post?.title}
          </h2>
          <div className="max-w-full md:max-w-4xl text-quicksilver">
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
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]
  `,
    { slug }
  );
  return {
    props: {
      post,
    },
  };
}

export default Post;
