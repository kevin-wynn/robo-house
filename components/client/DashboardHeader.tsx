import Link from "next/link";
import { User } from "../../types/User";

export const DashboardHeader = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col items-start w-full bg-black p-12">
      <div className="flex justify-center items-start flex-col">
        <h2 className="text-stone text-2xl font-black font-heavy">
          👋 Welcome back {user.name}
        </h2>
        <p className="text-stone text-sm">
          {user.username} {user.company ? "- " : ""} {user.company}
        </p>
      </div>
      <div className="flex justify-center items-center flex-row">
        <Link href="/client" className="text-stone text-xs mt-4 underline mr-4">
          home
        </Link>
        <Link
          href="/client/timesheets"
          className="text-stone text-xs mt-4 underline mr-4"
        >
          timesheets
        </Link>
        <Link
          href="/client/projects"
          className="text-stone text-xs mt-4 underline mr-4"
        >
          projects
        </Link>
        <Link
          href="/client/invoices"
          className="text-stone text-xs mt-4 underline mr-4"
        >
          invoices
        </Link>
      </div>
    </div>
  );
};
