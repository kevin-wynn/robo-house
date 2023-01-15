import Link from "next/link";
import { urlFor } from "../helpers/PostHelper";

const POST_IMAGE_WIDTH = 600;

export const PostItem = ({ post }: { post: any }) => {
  // TODO: typing
  const { slug, mainImage, title, publishedAt, tagline, tags } = post;
  return (
    <li className="list-none flex flex-col font-light mb-12">
      <div className="mb-2 h-32 relative">
        <Link
          className="text-2xl"
          href="/post/[slug]"
          as={`/post/${slug.current}`}
        >
          {mainImage && (
            <img
              alt={title}
              src={urlFor(mainImage).width(POST_IMAGE_WIDTH).url()}
              className="absolute h-full w-full object-cover object-center"
            />
          )}
        </Link>
      </div>
      <Link
        className="text-2xl"
        href="/post/[slug]"
        as={`/post/${slug.current}`}
      >
        <p className="border-b-blood border-b-2">
          {title}
          <span className="text-quicksilver text-sm ml-2">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </p>
        <p className="text-quicksilver text-sm">{tagline}</p>
      </Link>
      <div>
        {/* TODO: Typing */}
        {tags?.map((tag: any) => (
          <a
            className="inline-block my-2 px-2 py-2 rounded-lg mr-4 font-medium text-xs text-white hover:opacity-70 duration-200"
            key={tag._id}
            style={{ backgroundColor: tag.tagColor.hex }}
            href={`/tag/${tag.slug.current}`}
          >
            {tag.tag}
          </a>
        ))}
      </div>
    </li>
  );
};
