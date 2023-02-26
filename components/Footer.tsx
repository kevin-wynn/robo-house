import Link from "next/link";

export const Footer = () => {
  return (
    <div
      className={`w-full max-w-4xl mt-12 p-6 flex justify-center border-t-1 border-grey`}
    >
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center md:justify-around text-sm">
        <Link className={`hover:text-neutral-400 duration-300`} href="/">
          Robo House
        </Link>
        <Link className={`hover:text-neutral-400 duration-300`} href="/blog">
          Blog
        </Link>
        <Link className={`hover:text-neutral-400 duration-300`} href="/contact">
          Contact
        </Link>
        <Link className={`hover:text-neutral-400 duration-300`} href="/about">
          About
        </Link>
        <p>© 2022 Kevin Wynn, Robo House, LLC</p>
      </div>
    </div>
  );
};
