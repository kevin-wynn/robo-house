import Link from "next/link";
import { Tag as TagType } from "../types/Tag";

export const Tag = ({ tag }: { tag: TagType }) => {
  return (
    <Link
      className="inline-block my-2 px-2 py-1 rounded-full mr-4 font-medium text-xs hover:opacity-70 duration-200 text-stone"
      key={tag._id}
      style={{ backgroundColor: tag.tagColor.hex }}
      href={`/tag/${tag.slug.current}`}
    >
      {tag.tag}
    </Link>
  );
};
