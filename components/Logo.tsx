import Link from "next/link";

export const Logo = () => {
  return (
    <div className="text-3xl tracking-widest text-orange">
      <Link href="/" className="hover:text-grass duration-300">
        <span className="italic font-black text-white font-heavy">
          robo house
        </span>
      </Link>
    </div>
  );
};
