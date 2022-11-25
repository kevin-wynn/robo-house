import Link from "next/link";
import { urlFor } from "../helpers/PostHelper";

const POST_IMAGE_WIDTH = 600;

export const PostItem = ({ post }: { post: any }) => {
  // TODO: typing
  const { slug, mainImage, title, publishedAt, tagline } = post;
  return (
    <li className="list-none flex flex-col font-light mb-12">
      <Link
        className="text-2xl"
        href="/post/[slug]"
        as={`/post/${slug.current}`}
      >
        <div className="mb-2 h-32 relative">
          {mainImage && (
            <img
              alt={title}
              src={urlFor(mainImage).width(POST_IMAGE_WIDTH).url()}
              className="absolute h-full w-full object-cover object-center"
            />
          )}
        </div>
        <p className="border-b-blood border-b-2">
          {title}
          <span className="text-quicksilver text-sm ml-2">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </p>
        <p className="text-quicksilver text-sm">{tagline}</p>
      </Link>
    </li>
  );
};
