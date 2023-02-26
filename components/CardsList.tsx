import { ReactElement } from "react";

export const CardsList = ({
  children,
  cols,
}: {
  children: ReactElement | ReactElement[];
  cols: number;
}) => {
  return (
    <div
      className={`p-4 min-h-screen gap-12 grid grid-cols-1 md:grid-cols-${cols.toString()}`}
    >
      {children}
    </div>
  );
};
