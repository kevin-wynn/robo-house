import { Header } from "./Header";

export const Wrapper = ({
  image,
  children,
}: {
  image: boolean;
  children: any;
}) => {
  // TODO: typing
  return (
    <div
      className={`w-screen h-full min-h-screen bg-cover text-cultured ${
        image ? "bg-leaves" : "bg-black"
      }`}
    >
      <Header />
      {children}
    </div>
  );
};
