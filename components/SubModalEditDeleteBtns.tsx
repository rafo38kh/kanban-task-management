"use client";

import { StatesContext } from "@/contexts/StatesContextProvider";
import { useContext } from "react";

type SubModalEditDeleteBtnsProps = {
  handleEditModal: () => void;
  handleDeletModal: () => void;
  firstTextBtn: string;
  secondTextBtn: string;
};

export default function SubModalEditDeleteBtns({
  handleEditModal,
  handleDeletModal,
  firstTextBtn,
  secondTextBtn,
}: SubModalEditDeleteBtnsProps) {
  const { subModalCordinats } = useContext(StatesContext);

  const rect = subModalCordinats?.getBoundingClientRect() as DOMRect;

  return (
    <div
      style={{
        top: rect?.y + rect?.height + 10,
        right: rect.x - rect.right + 10,
      }}
      className="fixed  right-0 top-0 flex w-40 flex-col items-start justify-center gap-2 rounded-lg bg-white p-4 dark:bg-kanbanDarkGreyBG"
    >
      <button
        type="button"
        onClick={handleEditModal}
        className="text-sm font-bold text-kanbanLightGrey"
      >
        {firstTextBtn}
      </button>
      <button
        onClick={handleDeletModal}
        type="button"
        className="text-sm font-bold text-kanbanRed"
      >
        {secondTextBtn}
      </button>
    </div>
  );
}
