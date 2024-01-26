import React from "preact/compat";
import en from "../i18n/en.json";

export const SkillsList = () => {
  return (
    <div>
      <h3 class="font-bold text-xl mb-2">{en.chapter.skills.title}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 max-w-3xl">
        {en.chapter.skills.content.map((item) => (
          <div class="mb-4">
            <p class="font-bold mb-2 text-gray-600">{item.title}</p>
            <ul class="ml-4">
              {item.items.map((liItem) => (
                <li class="list-disc text-gray-500">{liItem}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
