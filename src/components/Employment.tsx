import React from "preact/compat";
import en from "../i18n/en.json";

export const Employment = () => {
  return (
    <div>
      <h3 class="font-bold text-xl mb-2">{en.employment.title}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 max-w-3xl">
        {en.employment.content.map((item) => (
          <div class="mb-4 md:mr-4">
            <div class="flex flex-col">
              <a class="flex items-center" href={item.website}>
                <img
                  class="max-h-16 max-w-16 my-4 mr-4 md:m-4"
                  src={item.logo}
                  alt={item.title}
                />
                <p class="font-bold mb-2 text-gray-600">{item.title}</p>
              </a>

              <p class="mb-2 text-sm text-gray-500">{item.content}</p>
              <p class="mb-2 text-sm text-gray-500">
                {item.tenure} - {item.job}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
