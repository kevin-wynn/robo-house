import Link from "next/link";

export const Footer = ({
  dashboard = false,
  footerDark = false,
}: {
  dashboard: boolean;
  footerDark?: boolean;
}) => {
  return (
    <div
      className={`w-full max-w-4xl mt-12 p-6 flex justify-center border-t-1 ${
        footerDark || dashboard ? "border-grey" : "border-white"
      }`}
    >
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center md:justify-around text-sm">
        <Link
          className={`hover:text-grey duration-300 ${
            footerDark || dashboard ? "text-black" : "text-stone"
          }`}
          href="/"
        >
          Robo House
        </Link>
        <Link
          className={`hover:text-grey duration-300 ${
            footerDark || dashboard ? "text-black" : "text-stone"
          }`}
          href="/posts"
        >
          Posts
        </Link>
        <Link
          className={`hover:text-grey duration-300 ${
            footerDark || dashboard ? "text-black" : "text-stone"
          }`}
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className={`hover:text-grey duration-300 ${
            footerDark || dashboard ? "text-black" : "text-stone"
          }`}
          href="/about"
        >
          About
        </Link>
        <p
          className={`${footerDark || dashboard ? "text-black" : "text-stone"}`}
        >
          © 2022 Kevin Wynn, Robo House, LLC
        </p>
      </div>
    </div>
  );
};
