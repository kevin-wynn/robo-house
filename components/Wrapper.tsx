import { ReactElement } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Wrapper = ({
  children,
  style,
  header = false,
  footer = false,
  user,
  footerDark = false,
}: {
  children: ReactElement | ReactElement[];
  style?: string;
  header?: boolean;
  footer?: boolean;
  user?: any;
  footerDark?: boolean;
}) => {
  return (
    <div
      className={`flex justify-start min-h-screen font-normal text-black ${style}`}
    >
      <div className="flex flex-col w-full items-center justify-between">
        {header && <Header user={user} />}
        {children}
        {footer && <Footer footerDark={footerDark} />}
      </div>
    </div>
  );
};
