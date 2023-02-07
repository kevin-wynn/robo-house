import { ReactElement, useEffect } from "react";
import Image from "next/image";

export const Modal = ({
  openModal,
  setOpenModal,
  children,
}: {
  openModal: any;
  setOpenModal: any;
  children: ReactElement;
}) => {
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          setOpenModal(false);
        }
      },
      false
    );
  });
  return (
    <div
      className={`bg-neutral-800 top-0 left-0 absolute bg-opacity-20 z-40 flex justify-center items-center w-full h-full ${
        openModal ? "visible" : "hidden"
      }`}
    >
      <div className="bg-white z-50 w-1/2 min-h-1/2 p-6 relative">
        <button
          className="absolute top-4 right-4"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <Image
            src="/icons/close.svg"
            alt="Close modal"
            width="25"
            height="25"
          />
        </button>
        {children}
      </div>
    </div>
  );
};
