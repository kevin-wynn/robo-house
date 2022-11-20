import { Wrapper } from "../components/Wrapper";

export default function Contact() {
  return (
    <Wrapper image>
      <div className="flex flex-col justify-center items-center w-full h-96 p-6 md:p-0 md:min-h-screen text-quicksilver">
        <p>I'll get a proper form to fill out here one day.</p>
        <p>In the mean time just email me:</p>
        <p>
          <a className="text-blood" href="mailto:kevin@robo-house.com">
            kevin@robo-house.com
          </a>
        </p>
      </div>
    </Wrapper>
  );
}
