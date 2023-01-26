import { DashboardHeader } from "../../components/client/DashboardHeader";
import { DiscordServer } from "../../components/client/DiscordServer";
import { ProjectsStatus } from "../../components/client/ProjectsStatus";
import { ServerStatus } from "../../components/client/ServerStatus";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { Wrapper } from "../../components/Wrapper";
import { getLoginSession } from "../../helpers/Auth";

export default function AdminDashboard({ user }: { user: any }) {
  return (
    <Wrapper dashboard header footer user={user} style="items-start bg-stone">
      <DashboardHeader user={user} />
      <MaxWidthContent>
        <div className="w-full grid grid-cols-4 gap-4 -mt-6">
          <ServerStatus />
          <ProjectsStatus />
          <DiscordServer />
        </div>
      </MaxWidthContent>
    </Wrapper>
  );
}

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  const session = await getLoginSession(
    req.cookies[process.env.COOKIE_NAME || ""],
    process.env.TOKEN_SECRET || ""
  );
  if (!session.passport.user) {
    return {
      redirect: {
        destination: "/client/login",
      },
    };
  }

  return {
    props: {
      user: session.passport.user,
    },
  };
}
