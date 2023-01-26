import Link from "next/link";

export const Logo = ({ dashboard }: { dashboard: boolean }) => {
  return (
    <div className="text-3xl tracking-widest text-orange w-52">
      <Link href="/" className="hover:text-grass duration-300">
        <span
          className={`italic font-black ${
            dashboard ? "text-black" : "text-stone"
          } font-heavy`}
        >
          robo house
        </span>
      </Link>
    </div>
  );
};
