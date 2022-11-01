export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen text-sm">
      <h1 className="font-bold text-lg">Robo House</h1>
      <p>
        We are currently undergoing a very large upgrade. Please stay tuned.
      </p>
      <a href="mailto:admin@robo-house.com" className="text-blue-700">
        Find out more by contacting us directly.
      </a>
    </div>
  );
}
