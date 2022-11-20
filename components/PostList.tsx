import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../helpers/PostHelper";

const POST_IMAGE_WIDTH = 300;

export const PostList = ({
  posts,
  styles,
}: {
  posts: any;
  styles?: string;
}) => {
  // TODO: typing
  return (
    <div
      className={`pa-4 py-8 flex justify-center items-center ${
        styles ? styles : ""
      }`}
    >
      {posts.length > 0 &&
        posts.map(
          ({
            _id,
            title,
            slug,
            tagline,
            publishedAt,
            mainImage,
          }: {
            _id: string;
            title: string;
            slug: {
              current: string;
            };
            mainImage: {
              asset: {
                _ref: string;
              };
            };
            tagline: string;
            publishedAt: string;
          }) =>
            slug && (
              <li className="list-none flex flex-col font-light" key={_id}>
                <Link
                  className="text-2xl"
                  href="/post/[slug]"
                  as={`/post/${slug.current}`}
                >
                  <div className="mb-2">
                    {mainImage && (
                      <Image
                        width={300}
                        height={300}
                        alt="main blog image"
                        src={urlFor(mainImage).width(POST_IMAGE_WIDTH).url()}
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
            )
        )}
    </div>
  );
};
