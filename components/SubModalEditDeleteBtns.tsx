"use client";
import { StatesContext } from "../contexts/StatesContextProvider";

import { useContext } from "react";

export default function SubModalEditDeleteBtns() {
  const {
    setIsEditTaskModalOpen,
    setIsDeletTaskModalOpen,
    setIsMainChangesModalOpen,
  } = useContext(StatesContext);

  const handleEditTaskModal = () => {
    setIsMainChangesModalOpen(false);
    setIsEditTaskModalOpen(true);
  };

  const handleDeletTaskModal = () => {
    setIsMainChangesModalOpen(false);
    setIsDeletTaskModalOpen(true);
  };

  return (
    <div className="absolute right-5 top-52 flex w-40 flex-col items-start justify-center gap-2 rounded-lg bg-white p-4 dark:bg-kanbanDarkGreyBG">
      <button
        onClick={handleEditTaskModal}
        type="button"
        className="text-sm font-bold text-kanbanLightGrey"
      >
        Edit Task
      </button>
      <button
        onClick={handleDeletTaskModal}
        type="button"
        className="text-sm font-bold text-kanbanRed"
      >
        Delete Task
      </button>
    </div>
  );
}
