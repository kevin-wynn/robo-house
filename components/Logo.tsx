import Link from "next/link";

export const Logo = () => {
  return (
    <div className="text-3xl tracking-widest text-white">
      <Link href="/" className="hover:text-spice duration-300">
        <span className="font-serif italic font-bold">robo house</span>
      </Link>
    </div>
  );
};
