import { LoginForm } from "../../components/LoginForm";
import { Wrapper } from "../../components/Wrapper";

export default function Login() {
  return (
    <Wrapper
      header
      footer
      style="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-900 via-orange-500 to-indigo-700"
    >
      <LoginForm />
    </Wrapper>
  );
}
