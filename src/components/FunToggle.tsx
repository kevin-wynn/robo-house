import React from "preact/compat";
import { useStore } from "@nanostores/preact";
import { fun } from "../stores/fun";

export const FunToggle = () => {
  const $fun = useStore(fun);
  const handleClick = (funLevelToSet: 0 | 1) => {
    fun.set(funLevelToSet);
  };

  return (
    <div>
      <span class="text-gray-500">
        <span class="mr-1">Do you want...</span>
        <button
          onClick={() => handleClick(1)}
          type="button"
          class={`${$fun && "text-orange-500"} mr-1 underline`}
        >
          Fun
        </button>
        <span class="mr-1">or</span>
        <button
          onClick={() => handleClick(0)}
          type="button"
          class={`${!$fun && "text-orange-500"} mr-1 underline`}
        >
          Corproate
        </button>
        <span>?</span>
      </span>
    </div>
  );
};
