import Link from "next/link";
import Router from "next/router";
import { Logo } from "./Logo";

export const Header = ({ user }: { user: any }) => {
  return (
    <div className="flex p-4 mb-12 text-white flex-col-reverse sm:flex-row w-full items-center justify-center font-light">
      <div className="w-full flex justify-center items-center">
        <ul className="flex flex-row flex-wrap list-none tracking-widest">
          <li className="mr-6">
            <Link
              href="/"
              className="text-sm text-white hover:text-grey duration-300"
            >
              home
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/posts"
              className="text-sm text-white hover:text-grey duration-300"
            >
              posts
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/contact"
              className="text-sm text-white hover:text-grey duration-300"
            >
              contact
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/about"
              className="text-sm text-white hover:text-grey duration-300"
            >
              about
            </Link>
          </li>
          <li className="mr-6">
            {user ? (
              <button
                className="text-sm text-white hover:text-grey duration-300"
                type="button"
                onClick={async () => {
                  const res = await fetch("/api/logout");
                  if (res.status === 200) {
                    Router.push("/");
                  }
                }}
              >
                logout
              </button>
            ) : (
              <Link
                href="/client/login"
                className="text-sm text-white hover:text-grey duration-300"
              >
                login
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="flex p-6 md:p-2 md:ml-6">
        <Logo />
      </div>
    </div>
  );
};
