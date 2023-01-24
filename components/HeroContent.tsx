import { ReactElement } from "react";

export const HeroContent = ({
  content,
  image,
}: {
  content: ReactElement;
  image: ReactElement;
}) => {
  return (
    <div className="justify-center min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="w-full text-white p-8 md:p-2">{content}</div>
      <div className="w-full">{image}</div>
    </div>
  );
};
