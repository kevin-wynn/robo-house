import { DividerHeader } from "./DividerHeader";
import { MaxWidthContent } from "./MaxWidthContent";
import { PostItem } from "./PostItem";

export const PostList = ({
  posts,
  style,
  title,
}: {
  posts: any;
  style?: string;
  title?: string;
}) => {
  return (
    <>
      <div>
        {title && (
          <div className="w-full flex justify-center items-center mt-12">
            <DividerHeader align="center" text={title} />
          </div>
        )}
      </div>
      <MaxWidthContent maxWidth="max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full">
          {!posts && <p>No posts found</p>}
          {posts &&
            posts.length > 0 &&
            posts.map((post: any) => <PostItem key={post._id} post={post} />)}
        </div>
      </MaxWidthContent>
    </>
  );
};
