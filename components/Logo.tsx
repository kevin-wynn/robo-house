import Link from "next/link";

export const Logo = () => {
  return (
    <div className="text-3xl tracking-wider uppercase">
      <Link
        href="/"
        className="paths hero glitch layers"
        data-text="ROBO HOUSE"
      >
        <span className="">Robo h</span>
        <span className="text-blood">o</span>
        <span className="">use</span>
      </Link>
      <div className="border-blood md:w-56 border-b-2 ml-32"></div>
    </div>
  );
};
