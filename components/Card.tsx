import { forwardRef } from "react";
import { ReactElement } from "react";

export const Card = forwardRef(
  (
    {
      children,
      className,
    }: { children: ReactElement | ReactElement[]; className?: string },
    ref
  ) => {
    return (
      <div
        ref={ref as any}
        className={`flex flex-col break-inside-avoid ${
          className ? className : ""
        }`}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
