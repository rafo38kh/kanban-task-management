"use client";

import { useContext } from "react";
import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";
import { useAppContext } from "@/contexts/AppContextProvider";

type CardProps = {
  id: string;
  color: string;
  title: string;
  subtaskCount: number;
  completedSubtask: string;
};

export default function Card({
  id,
  title,
  color,
  subtaskCount,
  completedSubtask,
}: CardProps) {
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
      className="flex w-full flex-col items-start justify-center gap-2 rounded-lg border-2 bg-white p-4 transition-all duration-200 hover:bg-kanbanVeryLightGrey dark:bg-kanbanGrey dark:hover:bg-kanbanDarkGrey"
      style={{
        borderTopColor: color,
        borderTopWidth: "2px",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.borderTopColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "transparent";
        e.currentTarget.style.borderTopColor = color;
      }}
    >
      <h1 className="break-words text-left font-bold text-black dark:text-white">
        {title}
      </h1>
      <span className="text-xs font-bold text-kanbanLightGrey">
        {completedSubtask} of {subtaskCount} substasks
      </span>
      <span className="h-[1px] w-full" />
    </button>
  );
}
