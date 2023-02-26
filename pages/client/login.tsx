import Link from "next/link";
import { HeroContent } from "../../components/HeroContent";
import { LoginForm } from "../../components/LoginForm";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { Wrapper } from "../../components/Wrapper";

//todo: take user to dashboard if they are already logged in
// ideally they wont ever make it to this page since the logout button in the header will be showin instead
// just in case someone goes directly here

export default function Login() {
  return (
    <Wrapper header footer style="min-h-screen items-start">
      <div className="flex flex-col md:flex-row w-full p-8">
        <div className="w-full md:w-1/2">
          <HeroContent>
            <div className="p-6 w-full flex flex-col">
              <div className="text-5xl md:text-8xl font-serif tracking-tighter">
                Welcome back.
              </div>
              <MaxWidthContent maxWidth="max-w-screen-md">
                <p className="text-xl mt-4 md:mt-6 tracking-wider mb-8">
                  Drop a line to get your next project started. Need your
                  infrastructure worked on, migrated to Kubernetes? Reinforced
                  in any way? Got a marketing site you need set up? Done! Need
                  an application built? Easy!
                </p>
              </MaxWidthContent>
            </div>
          </HeroContent>
        </div>
        <div className="w-full md:w-1/2">
          <LoginForm />
          <div className="mt-6">
            Not a client yet?&nbsp;
            <Link className="underline" href="/client/signup">
              Sign up today and get started
            </Link>
            .
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
