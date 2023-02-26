import { ReactElement } from "react";

export const CardListColumn = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return <div>{children}</div>;
};
