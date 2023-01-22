import { Footer } from "./Footer";
import { Header } from "./Header";

export const Wrapper = ({
  children,
  style,
  header = false,
  footer = false,
  user,
}: {
  children: any;
  style?: any;
  header?: boolean;
  footer?: boolean;
  user?: any;
}) => {
  return (
    <div
      className={`flex justify-start min-h-screen font-normal text-sand ${style}`}
    >
      <div className="flex flex-col w-full items-center">
        {header && <Header user={user} />}
        {children}
        {footer && <Footer />}
      </div>
    </div>
  );
};
