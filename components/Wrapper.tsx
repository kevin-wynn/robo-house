import { Footer } from "./Footer";
import { Header } from "./Header";

export const Wrapper = ({
  image,
  children,
}: {
  image: boolean;
  children: any;
}) => {
  return (
    <div className="w-screen h-full min-h-screen text-cultured bg-black">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
