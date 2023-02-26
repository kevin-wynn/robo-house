import Link from "next/link";
import { urlFor } from "../helpers/PostHelper";
import { Tag } from "./Tag";
import { Tag as TagType } from "../types/Tag";
import Image from "next/image";

const POST_IMAGE_WIDTH = 600;
const AUTHOR_IMAGE_WIDTH = 200;

export const PostItem = ({ post }: { post: any }) => {
  const { slug, mainImage, title, publishedAt, tagline, tags } = post;
  return (
    <div className="flex flex-col font-light break-inside-avoid h-full mb-4 justify-between">
      <div>
        <Link
          className="text-2xl flex flex-col justify-start"
          href="/post/[slug]"
          as={`/post/${slug.current}`}
        >
          {mainImage && (
            <Image
              alt={title}
              src={urlFor(mainImage).width(POST_IMAGE_WIDTH).url()}
              className="w-full object-cover object-center h-44 mb-4 grayscale"
              width={POST_IMAGE_WIDTH}
              height={POST_IMAGE_WIDTH}
            />
          )}
          <p className="text-3xl font-serif">{title}</p>
          <span className="text-sm font-thin my-2 ">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </Link>
        <div>
          {tags?.map((tag: TagType) => (
            <Tag key={tag._id} tag={tag} />
          ))}
        </div>
        <Link
          className="text-2xl"
          href="/post/[slug]"
          as={`/post/${slug.current}`}
        >
          <p className="text-sm min-h-fit">{tagline}</p>
        </Link>
      </div>
      <div>
        {post.author && (
          <div className="mt-4 flex flex-row items-end">
            <Image
              alt={post.author.name}
              src={urlFor(post.author.image).width(AUTHOR_IMAGE_WIDTH).url()}
              className="w-14 h-14 rounded-md grayscale mr-2"
              width={AUTHOR_IMAGE_WIDTH}
              height={AUTHOR_IMAGE_WIDTH}
            />
            <span className="text-sm">{post.author.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
