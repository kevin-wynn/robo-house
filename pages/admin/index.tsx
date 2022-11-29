import { Wrapper } from "../../components/Wrapper";

export default function Home() {
  return (
    <Wrapper>
      <div className="flex flex-col h-full lg:flex-row justify-center items-center w-full p-2 md:p-0">
        <h1>Admin...</h1>
      </div>
    </Wrapper>
  );
}

export async function getStaticProps() {
  //   const posts = await getAllPosts();
  //   return {
  //     props: {
  //       posts,
  //     },
  //   };
  return { props: {} };
}
