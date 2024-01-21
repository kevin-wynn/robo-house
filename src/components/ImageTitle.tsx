import React from "preact/compat";
import { fun } from "../stores/fun";
import { useStore } from "@nanostores/preact";
import { FunToggle } from "./FunToggle";

export const ImageTitle = () => {
  const $fun = useStore(fun);

  const MinorText = () => {
    switch ($fun) {
      case 1: // fun
        return (
          <div>
            <h2 class="text-md text-gray-300 font-thin">
              I used to be a chef what happened to me
            </h2>
            <h2 class="text-sm text-gray-200 font-thin">
              Used to be cool and listen to punk rock...
            </h2>
            <h2 class="text-xs text-gray-100 font-thin">
              Used to have friends
            </h2>
          </div>
        );
      case 0: // boring
      default:
        return (
          <div>
            <h2 class="text-md text-gray-300 font-thin">
              I used to be a culinary innovator
            </h2>
            <h2 class="text-sm text-gray-200 font-thin">
              Used to also be a trendsetter in tech
            </h2>
            <h2 class="text-xs text-gray-100 font-thin">
              And engaged in a professional network
            </h2>
          </div>
        );
    }
  };

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
          <h1 class="text-5xl md:text-6xl">Kevin Wynn</h1>
          <FunToggle />
          <h2 class="text-xl md:text-2xl mt-2 text-gray-400 font-thin">
            Senior Software Engineer
          </h2>
          <MinorText />
        </div>
      </div>
    </div>
  );
};
