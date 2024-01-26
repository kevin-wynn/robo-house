import React from "preact/compat";

export const ImageTitle = () => {
  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 max-w-3xl">
        <div class="flex md:justify-start justify-center">
          <img
            alt="This is me"
            class="w-56 h-56 rounded-full grayscale"
            src="/me.jpg"
          />
        </div>
        <div class="flex flex-col text-center md:text-left mt-6 md:mt-0 justify-center md:justify-start">
          <h1 class="text-4xl md:text-5xl">Kevin Wynn</h1>
          <div class="my-2">
            Already interested?{" "}
            <a
              class="text-blue-500 underline"
              href="mailto:kevin@robo-house.com"
            >
              Get an email my way
            </a>
          </div>
          <h2 class="text-xl md:text-2xl mt-2 text-gray-400 font-thin">
            Senior Software Engineer
          </h2>
        </div>
      </div>
    </div>
  );
};
