"use client";

import { useContext } from "react";
import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";

export default function Card() {
  const { setIsModalOpen, setModalType } = useContext(ModalContext);

  return (
    <button
      type="button"
      onClick={() => {
        setIsModalOpen(true);
        setModalType(ModalTypes.Main);
      }}
      className="flex w-[17.5rem] flex-col items-start justify-center  gap-2 rounded-lg bg-white p-4 transition-all duration-200 hover:bg-kanbanVeryLightGrey dark:bg-kanbanGrey dark:hover:bg-kanbanDarkGrey"
    >
      <h1 className="font-bold text-black dark:text-white">
        Build UI for onboarding flow
      </h1>
      <span className="text-xs font-bold text-kanbanLightGrey">
        0 of 3 substasks
      </span>
    </button>
  );
}
