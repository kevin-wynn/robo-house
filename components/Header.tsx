import Link from "next/link";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <div className="w-full flex justify-center p-2 pt-4 antialiased font-light mb-8">
      <Logo />
      <div>
        <ul className="flex flex-row list-none font-light text-quicksilver subpixel-antialiased text-md mt-4 tracking-wider uppercase ml-4">
          <li className="mr-2">
            <Link
              href="/posts"
              className="text-sm hover:text-blood duration-300"
            >
              Posts
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/contact"
              className="text-sm hover:text-blood duration-300"
            >
              Contact
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/about"
              className="text-sm hover:text-blood duration-300"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
