import { PostItem } from "./PostItem";

export const PostList = ({
  posts,
  style,
  animate,
}: {
  posts: any;
  style?: string;
  animate?: boolean;
}) => {
  return (
    <div
      className={`h-auto w-full p-6 mt-24 max-w-screen-xl grid grid-cols-1 md:grid-cols-3 gap-8 ${
        style ? style : ""
      }`}
    >
      {!posts && <p>No posts found</p>}
      {posts &&
        posts.length > 0 &&
        posts.map((post: any) => (
          <PostItem
            key={post._id}
            post={post}
            animate={animate ? true : false}
          />
        ))}
    </div>
  );
};
