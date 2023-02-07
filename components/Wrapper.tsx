import { ReactElement } from "react";
import { User } from "../types/User";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Wrapper = ({
  children,
  style,
  header = false,
  footer = false,
  user,
  footerDark = false,
  dashboard = false,
}: {
  children: ReactElement | ReactElement[];
  style?: string;
  header?: boolean;
  footer?: boolean;
  user?: User | undefined;
  footerDark?: boolean;
  dashboard?: boolean;
}) => {
  return (
    <div
      className={`flex justify-start min-h-screen w-full font-normal text-neutral-800 ${style}`}
    >
      <div className="flex flex-col w-full items-center justify-between">
        {header && <Header dashboard={dashboard} user={user} />}
        {children}
        {footer && <Footer dashboard={dashboard} footerDark={footerDark} />}
      </div>
    </div>
  );
};
