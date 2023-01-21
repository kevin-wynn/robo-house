import { Footer } from "./Footer";
import { Header } from "./Header";

export const Wrapper = ({
  children,
  style,
  header = false,
  footer = false,
}: {
  children: any;
  style?: any;
  header?: boolean;
  footer?: boolean;
}) => {
  return (
    <div
      className={`flex justify-start min-h-screen font-normal text-sand ${style}`}
    >
      <div className="flex flex-col w-full items-center">
        {header && <Header />}
        {children}
        {footer && <Footer />}
      </div>
    </div>
  );
};
