import Link from "next/link";
import Image from "next/image";
import { DashboardHeader } from "../../components/client/DashboardHeader";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { Wrapper } from "../../components/Wrapper";
import { getLoginSession } from "../../helpers/Auth";

export default function Discord({ user }: { user: any }) {
  return (
    <Wrapper dashboard header footer user={user} style="items-start bg-stone">
      <DashboardHeader user={user} />
      <MaxWidthContent>
        <div className="w-full bg-white p-6 -mt-6">
          <span className="text-sm">
            <Link href="/client" className="text-slate">
              dashboard home
            </Link>{" "}
            // discord
          </span>
          <h2 className="text-2xl">Let's talk Discord.</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>
              You may have heard of it, you may not. You may also have heard of
              Slack. They're pretty similar. But who hates emails? They get lost
              easily and you're probably not practicing a 0 inbox life like I
              do. Tooting my own horn there... But also, you want to get in
              touch with me quickly, right? Why eamil and wait hours before a
              response when you can just chat me directly? It's faster, it's
              much easier to get to the bottom of what we need to talk about. We
              can have impromptu conversations about projects, it's just way
              easier.
            </p>
            <p>
              I set my hours well enough to establish a healthy connection and
              you, as a client, can know when I'm available and if I'm on
              Discord - I'm available! I encourage all new clients to join my
              Discord server, introduce yourselfs if you want, if not that's
              fine too. But when you join just shoot me a message directly and I
              will create a new private channel for us to chat about your
              projects.
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center p-12">
            <p className="mb-2">Join up!</p>
            <Link target={"_blank"} href="https://discord.gg/4WZuHumX">
              <Image
                src="/images/logos/discord-logo.png"
                width="60"
                height="60"
                alt="Discord logo"
              />
            </Link>
          </div>
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
