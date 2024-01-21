import React from "preact/compat";
import en from "../i18n/en.json";
import { useStore } from "@nanostores/preact";
import { fun } from "../stores/fun";

export const Text = () => {
  const $fun = useStore(fun);

  let funLevel = "corporate";

  switch ($fun) {
    case 1:
      funLevel = "fun";
      break;
    case 0:
    default:
      funLevel = "corporate";
      break;
  }

  return (
    <div class="flex flex-col max-w-3xl mt-12">
      <div class="mb-4">
        <h3 class="font-bold text-xl mb-2">
          {en[funLevel].chapter["1"].title}
        </h3>
        <p>{en[funLevel].chapter["1"].content}</p>
      </div>
      <div class="mb-4">
        <h3 class="font-bold text-xl mb-2">
          {en[funLevel].chapter["2"].title}
        </h3>
        <p class="mb-2">{en[funLevel].chapter["2"].content["1"]}</p>
        <p>{en[funLevel].chapter["2"].content["2"]}</p>
      </div>
      <div>
        <h3 class="font-bold text-xl mb-2">
          {en[funLevel].chapter["3"].title}
        </h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 max-w-3xl">
        {en[funLevel].chapter["3"].content.map((item) => (
          <div class="mb-4">
            <p class="font-bold mb-2">{item.title}</p>
            <ul class="ml-4">
              {item.items.map((liItem) => (
                <li class="list-disc">{liItem}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div class="mb-4">
        <h3 class="font-bold text-xl mb-2">
          {en[funLevel].chapter["4"].title}
        </h3>
        <p class="mb-2">{en[funLevel].chapter["4"].content["1"]}</p>
        <p class="mb-2">{en[funLevel].chapter["4"].content["2"]}</p>
      </div>
      <div class="mb-4">
        <h3 class="font-bold text-xl mb-2">
          {en[funLevel].chapter["5"].title}
        </h3>
        <p class="mb-2">{en[funLevel].chapter["5"].content}</p>
      </div>
    </div>
  );
};
