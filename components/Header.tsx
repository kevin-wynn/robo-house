import Link from "next/link";
import Router from "next/router";
import { User } from "../types/User";
import { Logo } from "./Logo";

export const Header = ({ user }: { user: User | undefined }) => {
  return (
    <div className="z-20 flex p-4 h-24 flex-col-reverse sm:flex-row w-full items-center justify-center font-light">
      <div className="w-full flex justify-center items-center md:justify-start">
        <ul className="flex flex-row justify-center flex-wrap list-none tracking-widest">
          <li className="mr-6">
            <Link
              href="/"
              className={`text-sm hover:text-neutral-400 duration-300`}
            >
              home
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/blog"
              className={`text-sm hover:text-neutral-400 duration-300`}
            >
              blog
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/contact"
              className={`text-sm hover:text-neutral-400 duration-300`}
            >
              contact
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/about"
              className={`text-sm hover:text-neutral-400 duration-300`}
            >
              about
            </Link>
          </li>
          {user ? (
            <>
              <li className="mr-6">
                <Link
                  href="/client"
                  className={`text-sm hover:text-neutral-400 duration-300`}
                >
                  dashboard
                </Link>
              </li>
              <li className="mr-6">
                <button
                  className={`text-sm hover:text-neutral-400 duration-300`}
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
              </li>
            </>
          ) : (
            <>
              <li className="mr-6">
                <Link
                  href="/client/login"
                  className={`text-sm hover:text-neutral-400 duration-300`}
                >
                  login
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  href="/client/signup"
                  className={`text-sm hover:text-neutral-400 duration-300`}
                >
                  new clients
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex p-6 md:p-2 md:ml-6">
        <Logo />
      </div>
    </div>
  );
};
