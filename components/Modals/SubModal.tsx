"use client";

import { useContext, forwardRef } from "react";

import { ModalContext } from "@/contexts/ModalContextProvider";

import useClickOutside from "@/hooks/useClickOutside";

type SubModalEditDeleteBtnsProps = {
  firstTextBtn: string;
  secondTextBtn: string;
  handleEditModal: () => void;
  handleDeletModal: () => void;
  setIsEditDeletBoardModal: (isEditDeletBoardModal: boolean) => void;
};

const SubModal = forwardRef<HTMLDivElement, SubModalEditDeleteBtnsProps>(
  (
    {
      firstTextBtn,
      secondTextBtn,
      handleEditModal,
      handleDeletModal,
      setIsEditDeletBoardModal,
    },
    ref,
  ) => {
    const { clickTarget } = useContext(ModalContext);

    const rect = clickTarget?.getBoundingClientRect() as DOMRect;

    useClickOutside(ref as any, () => setIsEditDeletBoardModal(false));

    return (
      <div
        ref={ref}
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
  },
);

SubModal.displayName = "SubModal";

export default SubModal;
