import Image from "next/image";
import Link from "next/link";

export const DiscordServer = () => {
  return (
    <div className="w-full bg-white p-6 flex flex-col justify-center items-center h-64 text-center">
      <span className="text-sm mb-4">
        Join the Discord server to get in touch with me quickly.
      </span>
      <Link target={"_blank"} href="https://discord.gg/4WZuHumX">
        <Image
          src="/images/logos/discord-logo.png"
          width="60"
          height="60"
          alt="Discord logo"
        />
      </Link>
      <span className="text-sm mt-4">
        Read about how my Discord server works&nbsp;
        <Link className="text-blue" href="/client/discord/">
          here
        </Link>
        .
      </span>
    </div>
  );
};
