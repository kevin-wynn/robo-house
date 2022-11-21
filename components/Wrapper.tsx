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
    <div className="flex justify-center min-h-screen text-quicksilver">
      <div className="flex flex-col w-full max-w-screen-xl justify-between items-center">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};
