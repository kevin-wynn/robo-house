export const DividerHeader = ({
  text,
  align,
  underline,
}: {
  text: string;
  align: "left" | "center" | "right";
  underline?: boolean;
}) => {
  return (
    <h2
      className={`text-xl md:text-4xl font-serif mb-6 text-${align} ${
        underline ? "border-b-2 border-neutral-400" : ""
      }`}
    >
      {text}
    </h2>
  );
};
