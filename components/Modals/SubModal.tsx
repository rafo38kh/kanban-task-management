"use client";

import { useContext } from "react";

import { ModalContext } from "@/contexts/ModalContextProvider";

type SubModalEditDeleteBtnsProps = {
  firstTextBtn: string;
  secondTextBtn: string;
  handleEditModal: () => void;
  handleDeletModal: () => void;
};

export default function SubModal({
  firstTextBtn,
  secondTextBtn,
  handleEditModal,
  handleDeletModal,
}: SubModalEditDeleteBtnsProps) {
  const { clickTarget } = useContext(ModalContext);

  const rect = clickTarget?.getBoundingClientRect() as DOMRect;

  // useClickOutside(clickTarget as any, () => setClickTarget(null));

  return (
    <div
      style={{
        left: rect?.left - 150,
        top: rect?.y + rect?.height + 20,
      }}
      className="fixed z-50 flex w-40 flex-col items-start justify-center gap-2 rounded-lg bg-white p-4 dark:bg-kanbanDarkGreyBG"
    >
      <button
        type="button"
        onClick={handleEditModal}
        className="text-sm font-bold text-kanbanLightGrey"
      >
        {firstTextBtn}
      </button>
      <button
        type="button"
        onClick={handleDeletModal}
        className="text-sm font-bold text-kanbanRed"
      >
        {secondTextBtn}
      </button>
    </div>
  );
}
