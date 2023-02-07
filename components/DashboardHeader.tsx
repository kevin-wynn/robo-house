import { User } from "../types/User";
import { AdminDashboardLinks } from "./admin/DashboardLinks";
import { ClientDashboardLinks } from "./client/DashboardLinks";

export const DashboardHeader = ({
  user,
  admin = false,
}: {
  user: User;
  admin?: boolean;
}) => {
  return (
    <div className="flex flex-col items-start w-full bg-neutral-800 p-12">
      <div className="flex justify-center items-start flex-col">
        <h2 className="text-stone text-2xl font-black font-heavy">
          👋 Welcome back {user.name}
        </h2>
        <p className="text-stone text-sm">
          {user.username} {user.company ? "- " : ""} {user.company}
        </p>
      </div>
      {admin ? <AdminDashboardLinks /> : <ClientDashboardLinks />}
    </div>
  );
};
