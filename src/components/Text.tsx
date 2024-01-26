import React from "preact/compat";
import en from "../i18n/en.json";

export const Text = () => {
  return (
    <div class="flex flex-col max-w-3xl mt-12">
      <div class="mb-4">
        <h3 class="font-bold text-xl mb-2 text-gray-600">
          {en.chapter["1"].title}
        </h3>
        <p class="mb-2 text-gray-500">{en.chapter["1"].content}</p>
      </div>
      <div class="mb-4">
        <h3 class="font-bold text-xl mb-2 text-gray-600">
          {en.chapter["2"].title}
        </h3>
        <p class="mb-2 text-gray-500">{en.chapter["2"].content["1"]}</p>
        <p class="mb-2 text-gray-500">{en.chapter["2"].content["2"]}</p>
      </div>
      <div class="mb-4">
        <h3 class="font-bold text-xl mb-2 text-gray-600">
          {en.chapter["3"].title}
        </h3>
        <p class="mb-2 text-gray-500">{en.chapter["3"].content["1"]}</p>
        <p class="mb-2 text-gray-500">{en.chapter["3"].content["2"]}</p>
      </div>
      <div class="mb-4">
        <h3 class="font-bold text-xl mb-2 text-gray-600">
          {en.chapter["4"].title}
        </h3>
        <p class="mb-2 text-gray-500">{en.chapter["4"].content}</p>
      </div>
      <div>
        <h3 class="font-bold text-xl">
          <a class="text-blue-500 underline" href="mailto:kevin@robo-house.com">
            kevin@robo-house.com
          </a>
        </h3>
      </div>
    </div>
  );
};
