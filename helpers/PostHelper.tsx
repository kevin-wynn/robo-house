import { PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as highlightStyles } from "react-syntax-highlighter/dist/cjs/styles/prism";
import client from "../client";

export const urlFor = (source: any) => {
  return imageUrlBuilder(client).image(source);
};

export const ptComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }: { children: any }) => (
      <ul className="list-disc list-inside mb-6">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: any }) => <li>{children}</li>,
  },
  block: {
    h3: ({ children }: { children: any }) => {
      return (
        <h3 className="text-4xl mb-4 border-b-blood border-b-2">{children}</h3>
      );
    },
    h4: ({ children }: { children: any }) => {
      return <h4 className="font-extrabold text-2xl">{children}</h4>;
    },
    normal: ({ value }: { value: any }) => {
      return (
        <p className="mb-4">
          {value.children.map((item: any) => {
            const markStyles = item.marks.map((mark: any) => {
              switch (mark) {
                case "strong":
                default:
                  return "font-extrabold";
              }
            });
            return (
              <span className={markStyles.flat()} key={item._key}>
                {item.text}
              </span>
            );
          })}
        </p>
      );
    },
  },
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={
            urlFor(value)
              .width(320)
              .height(240)
              .fit("max")
              .auto("format") as any
          }
        />
      );
    },
    code: ({ value }: { value: any }) => {
      return (
        <SyntaxHighlighter language={value.language} style={highlightStyles}>
          {value.code}
        </SyntaxHighlighter>
      );
    },
  },
} as any;