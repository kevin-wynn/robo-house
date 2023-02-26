import { PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import groq from "groq";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as highlightStyles } from "react-syntax-highlighter/dist/cjs/styles/prism";
import client from "../client";

export const getAllPosts = async () => {
  return await client.fetch(
    groq`*[_type == "post" && publishedAt < now()]{...,tags[]->, author->} | order(publishedAt desc)`
  );
};

export const getPostBySlug = async (slug: string) => {
  const query = groq`*[_type == "post" && slug.current == $slug]{..., tags[]->, author->}[0]`;
  return await client.fetch(query, { slug });
};

export const getAllPostsForTag = async (tag: string) => {
  const query = groq`*[_type == "post" && publishedAt < now() && $tag in tags[]->slug.current]{...,tags[]->, author->} | order(publishedAt desc)`;
  return await client.fetch(query, { tag });
};

export const urlFor = (source: any) => {
  return imageUrlBuilder(client).image(source);
};

export const ptComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }: { children: any }) => (
      <ul className="list-disc mb-6 text-sm leading-6">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: any }) => <li>{children}</li>,
  },
  block: {
    h2: ({ children }: { children: any }) => {
      return <h2 className="text-3xl font-serif mb-6">{children}</h2>;
    },
    h3: ({ children }: { children: any }) => {
      return <h3 className="text-4xl font-serif mb-6">{children}</h3>;
    },
    h4: ({ children }: { children: any }) => {
      return <h4 className="font-serif text-2xl">{children}</h4>;
    },
    normal: ({ value }: { value: any }) => {
      return (
        <p className="text-sm leading-6 mb-2">
          {value.children.map((item: any) => {
            // TODO: typing
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
        <div className="overflow-auto">
          <SyntaxHighlighter language={value.language} style={highlightStyles}>
            {value.code}
          </SyntaxHighlighter>
        </div>
      );
    },
  },
} as any;
