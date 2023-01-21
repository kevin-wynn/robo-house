import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full max-w-4xl min-h-48 mt-12 p-6 flex justify-center border-t-blood border-t-2">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center md:justify-around text-sm">
        <Link href="/">Robo House</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/about">About</Link>
        <p>© 2022 Kevin Wynn, Robo House, LLC</p>
      </div>
    </div>
  );
};
