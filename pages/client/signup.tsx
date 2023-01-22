import { Wrapper } from "../../components/Wrapper";
const signup =
  "https://github.com/vercel/next.js/blob/canary/examples/with-passport-and-next-connect/pages/signup.js";

export default function About({ about }: { about: any }) {
  return (
    <Wrapper header footer>
      <div className="flex flex-col justify-center items-center w-full md:h-full md:min-h-screen mt-8 p-6 md:p-0">
        signup
      </div>
    </Wrapper>
  );
}
