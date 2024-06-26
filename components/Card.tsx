"use client";

import { useContext } from "react";
import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";
import { useAppContext } from "@/contexts/AppContextProvider";

type CardProps = {
  id: string;
  title: string;
  subtaskCount: number;
};

export default function Card({ id, title, subtaskCount }: CardProps) {
  const { setIsModalOpen, setModalType } = useContext(ModalContext);
  const { setCurTaskId } = useAppContext();

  return (
    <button
      type="button"
      onClick={() => {
        setCurTaskId(id);
        setIsModalOpen(true);
        setModalType(ModalTypes.Main);
      }}
      className="flex w-[17.5rem] flex-col items-start justify-center  gap-2 rounded-lg bg-white p-4 transition-all duration-200 hover:bg-kanbanVeryLightGrey dark:bg-kanbanGrey dark:hover:bg-kanbanDarkGrey"
    >
      <h1 className="font-bold text-black dark:text-white">{title}</h1>
      <span className="text-xs font-bold text-kanbanLightGrey">
        {subtaskCount} of 3 substasks
      </span>
    </button>
  );
}
