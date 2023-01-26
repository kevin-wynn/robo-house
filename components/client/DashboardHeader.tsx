import { User } from "../../types/User";

export const DashboardHeader = ({ user }: { user: User }) => {
  return (
    <div className="w-full bg-black p-12">
      <h2 className="text-stone text-2xl font-black font-heavy">
        👋 Welcome back {user.name}
      </h2>
      <p className="text-stone text-sm">
        {user.username} {user.company ? "- " : ""} {user.company}
      </p>
    </div>
  );
};
