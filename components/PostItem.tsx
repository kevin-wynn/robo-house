import Link from "next/link";
import { urlFor } from "../helpers/PostHelper";
import { Tag } from "./Tag";
import { Tag as TagType } from "../types/Tag";

const POST_IMAGE_WIDTH = 600;

export const PostItem = ({
  post,
  animate,
}: {
  post: any;
  animate: boolean;
}) => {
  const { slug, mainImage, title, publishedAt, tagline, tags } = post;
  return (
    <li
      className={`list-none flex flex-col items-stretch font-light mb-12 p-8 rounded-md bg-white ${
        animate ? "hover:-translate-y-6 duration-300" : ""
      }`}
    >
      <div className="mb-2">
        <Link
          className="text-2xl flex flex-col"
          href="/post/[slug]"
          as={`/post/${slug.current}`}
        >
          <p className="text-md">{title}</p>
          <span className="text-sm font-thin mb-4">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
          {mainImage && (
            <img
              alt={title}
              src={urlFor(mainImage).width(POST_IMAGE_WIDTH).url()}
              className="w-full object-cover object-center h-44 mb-4"
            />
          )}
        </Link>
        <Link
          className="text-2xl"
          href="/post/[slug]"
          as={`/post/${slug.current}`}
        >
          <p className="text-sm h-28">{tagline}</p>
        </Link>
      </div>
      <div className="mt-4">
        {tags?.map((tag: TagType) => (
          <Tag key={tag._id} tag={tag} />
        ))}
      </div>
    </li>
  );
};
