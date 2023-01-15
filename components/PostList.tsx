import { PostItem } from "./PostItem";

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
      className={`flex flex-col justify-center h-auto ${styles ? styles : ""}`}
    >
      {!posts && <p>No posts found</p>}
      {posts &&
        posts.length > 0 &&
        posts.map((post: any) => <PostItem key={post._id} post={post} />)}
    </div>
  );
};
