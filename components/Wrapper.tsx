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
}: {
  children: ReactElement | ReactElement[];
  style?: string;
  header?: boolean;
  footer?: boolean;
  user?: User | undefined;
}) => {
  return (
    <div className={`flex justify-start w-full font-normal ${style}`}>
      <div className="flex flex-col w-full items-center justify-between">
        {header && <Header user={user} />}
        {children}
        {footer && <Footer />}
      </div>
    </div>
  );
};
