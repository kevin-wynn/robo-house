import React from "preact/compat";
import en from "../i18n/en.json";
import { useStore } from "@nanostores/preact";
import { fun } from "../stores/fun";

export const SkillsList = () => {
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
    <div>
      <h3 class="font-bold text-xl mb-2">
        {en[funLevel].chapter.skills.title}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 max-w-3xl">
        {en[funLevel].chapter.skills.content.map((item) => (
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
    </div>
  );
};
