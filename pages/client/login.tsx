import Link from "next/link";
import { LoginForm } from "../../components/LoginForm";
import { Wrapper } from "../../components/Wrapper";

//todo: take user to dashboard if they are already logged in
// ideally they wont ever make it to this page since the logout button in the header will be showin instead
// just in case someone goes directly here

export default function Login() {
  return (
    <Wrapper
      header
      footer
      style="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-900 via-orange-500 to-indigo-700"
    >
      <LoginForm redirectURL="/client" />
      <div className="text-stone">
        Not a client yet?&nbsp;
        <Link className="underline" href="/client/signup">
          Sign up today and get started
        </Link>
        .
      </div>
    </Wrapper>
  );
}
