import { PostItem } from "./PostItem";

export const PostList = ({
  posts,
  styles,
  horizontal,
  animate,
}: {
  posts: any;
  horizontal: boolean;
  styles?: string;
  animate?: boolean;
}) => {
  return (
    <div
      className={`h-auto w-full p-6 mt-24 ${
        horizontal
          ? "grid grid-cols-6 gap-4"
          : "max-w-screen-xl grid grid-cols-2 gap-6"
      } ${styles ? styles : ""}`}
    >
      {!posts && <p>No posts found</p>}
      {posts &&
        posts.length > 0 &&
        posts.map((post: any) => (
          <PostItem
            key={post._id}
            post={post}
            horizontal={horizontal}
            animate={animate ? true : false}
          />
        ))}
    </div>
  );
};
