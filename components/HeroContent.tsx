import { ReactElement } from "react";

export const HeroContent = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return (
    <div className="justify-center items-start w-full flex">{children}</div>
  );
};
