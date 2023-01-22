import Link from "next/link";
import { urlFor } from "../helpers/PostHelper";
import { Tag } from "./Tag";

const POST_IMAGE_WIDTH = 600;

export const PostItem = ({
  post,
  horizontal,
  animate,
}: {
  post: any;
  horizontal: boolean;
  animate: boolean;
}) => {
  const { slug, mainImage, title, publishedAt, tagline, tags } = post;
  return (
    <li
      className={`list-none flex flex-col font-light mb-12 p-2 rounded-md ${
        animate ? "hover:-translate-y-6 duration-300" : ""
      }`}
    >
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
        <p className="text-sm mb-4">
          {title}
          <span className="text-sm ml-2">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </p>
        <p className="text-sm">{tagline}</p>
      </Link>
      <div>
        {/* TODO: Typing */}
        {tags?.map((tag: any) => (
          <Tag key={tag._id} tag={tag} />
        ))}
      </div>
    </li>
  );
};
