import { useState } from "react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { DiscordServer } from "../../components/client/DiscordServer";
import { InvoicesStatus } from "../../components/client/harvest/InvoicesStatus";
import { ProjectsStatus } from "../../components/client/harvest/ProjectsStatus";
import { ServerStatus } from "../../components/client/ServerStatus";
import { WordpressSiteStatus } from "../../components/client/WordpressSiteStatus";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { Wrapper } from "../../components/Wrapper";
import { getLoginSession } from "../../helpers/Auth";
import { getWordpressSite } from "../../helpers/client/WordpressHelper";

export default function AdminDashboard({
  user,
  userWordpressSite,
}: {
  user: any;
  userWordpressSite: any;
}) {
  const [wordpressSite, setWordpressSite] = useState(userWordpressSite);
  return (
    <Wrapper
      dashboard
      header
      footer
      user={user}
      style="items-start bg-neutral-100"
    >
      <DashboardHeader user={user} />
      <MaxWidthContent>
        <div className="w-full grid grid-cols-4 gap-4 -mt-6 items-stretch">
          {process.env.NEXT_PUBLIC_FEATURE_FLAG_HOSTING === "true" && (
            <ServerStatus
              wordpressSite={wordpressSite}
              setWordpressSite={setWordpressSite}
              user={user}
            />
          )}
          <InvoicesStatus user={user} />
          <ProjectsStatus user={user} />
          <DiscordServer />
          {(wordpressSite.active || wordpressSite.building) && (
            <WordpressSiteStatus wordpressSite={wordpressSite} />
          )}
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
  if (!session?.passport?.user) {
    return {
      redirect: {
        destination: "/client/login",
      },
    };
  }

  const userWordpressSite = await getWordpressSite(session.passport.user);

  return {
    props: {
      user: session.passport.user,
      userWordpressSite,
    },
  };
}
