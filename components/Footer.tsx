import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full min-h-48 mt-12 p-6 text-quicksilver flex justify-center">
      <div className="max-w-4xl w-full flex justify-around text-sm border-t-blood border-t-2">
        <div className="w-1/3 flex h-32 items-end p-4">
          <ul>
            <li>
              <Link href="/">Robo House</Link>
            </li>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <a href="mailto:kevin@robo-house.com">Email Me</a>
            </li>
          </ul>
        </div>
        <div className="w-1/3 md:flex h-32 items-end p-4 hidden"></div>
        <div className="w-1/3 flex h-32 items-end p-4">
          <p>© 2022 Kevin Wynn, Robo House, LLC</p>
        </div>
      </div>
    </div>
  );
};
