import Image from "next/image";
import { ReactElement } from "react";
import { MaxWidthContent } from "./MaxWidthContent";

export const DescriptorContent = ({
  imageURL,
  imageAlt,
  content,
  imagePosition,
}: {
  imagePosition: "left" | "right";
  imageURL: string;
  imageAlt: string;
  content: ReactElement;
}) => (
  <MaxWidthContent maxWidth="max-w-screen-xl">
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-48 p-12 md:p-24">
      {imagePosition === "left" ? (
        <>
          <div className="w-full flex justify-center items-center">
            <Image src={imageURL} alt={imageAlt} width="600" height="600" />
          </div>
          <div>{content}</div>
        </>
      ) : (
        <>
          <div>{content}</div>
          <div className="w-full flex justify-center items-center">
            <Image src={imageURL} alt={imageAlt} width="600" height="600" />
          </div>
        </>
      )}
    </div>
  </MaxWidthContent>
);
