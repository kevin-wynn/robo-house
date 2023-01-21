import { useState } from "react";

// TODO: set up stuff for onclicks if type is button
export const Button = ({
  type,
  children,
  disabled,
  loading,
}: {
  type: "button" | "submit" | "reset" | undefined;
  disabled: boolean;
  children: any;
  loading?: boolean;
}) => {
  const [hoverEffect, setHoverEffect] = useState(false);
  return (
    <button
      disabled={disabled}
      type={type}
      className={`px-4 py-4 button hero rounded-sm tracking-wider font-normal border-blood hover:border-red-900 border-2 ${
        hoverEffect ? "layers glitch" : ""
      }`}
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
      data-text={children}
    >
      {loading ? (
        <div className="flex flex-row">
          <svg
            className="w-5 h-5 mr-3 -ml-1 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {type === "submit" ? <span>Submitting</span> : <span>Loading</span>}
        </div>
      ) : (
        children
      )}
    </button>
  );
};
