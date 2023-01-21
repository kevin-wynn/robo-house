import Link from "next/link";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row w-full items-center justify-center p-2 sm:p-4 md:p-6 lg:p-12 antialiased font-light">
      <div>
        <ul className="flex flex-row list-none tracking-widest">
          <li className="mr-6">
            <Link href="/" className="text-sm hover:text-spice duration-300">
              home
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/posts"
              className="text-sm hover:text-spice duration-300"
            >
              posts
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/contact"
              className="text-sm hover:text-spice duration-300"
            >
              contact
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/about"
              className="text-sm hover:text-spice duration-300"
            >
              about
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-1 border-sand hidden md:block w-full"></div>
      <div className="flex p-6 md:p-2 md:ml-6 w-80">
        <Logo />
      </div>
    </div>
  );
};
