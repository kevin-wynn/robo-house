export const MaxWidthContent = ({
  children,
  maxWidth,
}: {
  children: any;
  maxWidth?:
    | "max-w-screen-xl"
    | "max-w-screen-lg"
    | "max-w-screen-md"
    | "max-w-screen-sm";
}) => {
  return (
    <div
      className={`flex flex-col w-full justify-between items-center ${
        maxWidth || "max-w-screen-xl"
      }`}
    >
      {children}
    </div>
  );
};
