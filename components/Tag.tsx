export const Tag = ({ tag }: { tag: any }) => {
  return (
    <a
      className="inline-block my-2 px-2 py-1 rounded-full mr-4 font-medium text-xs hover:opacity-70 duration-200 font-sans"
      key={tag._id}
      style={{ backgroundColor: tag.tagColor.hex }}
      href={`/tag/${tag.slug.current}`}
    >
      {tag.tag}
    </a>
  );
};
