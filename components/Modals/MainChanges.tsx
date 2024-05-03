"use client";
import { MouseEvent, useContext, useState } from "react";
import { ModalContext, ModalTypes } from "../../contexts/ModalContextProvider";
import SubModal from "./SubModal";

export default function MainChanges() {
  const [isEditDeletBoardModal, setIsEditDeletBoardModal] = useState(false);

  const { handleClose, setClickTarget, setModalType, setIsModalOpen } =
    useContext(ModalContext);

  const handleOpenEditDeleteTaskBtns = (e: MouseEvent) => {
    setIsEditDeletBoardModal((prevState) => !prevState);
    setClickTarget(e.target as HTMLElement);
  };

  const handleEditTaskModal = () => {
    setIsEditDeletBoardModal(false);
    setIsModalOpen(true);
    setModalType(ModalTypes.EditTask);
  };

  const handleDeletTaskModal = () => {
    setIsEditDeletBoardModal(false);
    setIsModalOpen(true);
    setModalType(ModalTypes.DeleteTask);
  };

  return (
    <div className="relative">
      <button onClick={handleClose}>close</button>
      <div className="flex flex-row items-center justify-between gap-4">
        <h1 className=" text-xl font-bold ">
          Research pricing points of various competitors and trial different
          business models
        </h1>

        <button type="button" onClick={(e) => handleOpenEditDeleteTaskBtns(e)}>
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
        </button>
      </div>
      <p className="my-6 text-xs  text-kanbanLightGrey">
        We know what we're planning to build for version one. Now we need to
        finalise the first pricing model we'll use. Keep iterating the subtasks
        until we have a coherent proposition.
      </p>
      <span className="text-xs font-bold text-kanbanLightGrey">
        Subtasks (2 of 3)
      </span>
      <div className="my-2 flex flex-row items-center justify-start gap-2 rounded-md bg-kanbanLightGreyBG p-3 dark:bg-kanbanDarkGreyBG">
        <input
          type="checkbox"
          className="accent-kanbanPurpule focus:accent-kanbanPurpuleHover"
        />
        <span className="text-xs font-bold text-kanbanLightGrey">
          Research competitor pricing and business models
        </span>
      </div>
      <div className="my-2 flex flex-row items-center justify-start gap-2 rounded-md bg-kanbanLightGreyBG p-3 dark:bg-kanbanDarkGreyBG">
        <input
          type="checkbox"
          className="accent-kanbanPurpule focus:accent-kanbanPurpuleHover"
        />
        <span className="text-xs font-bold text-kanbanLightGrey">
          Research competitor pricing and business models
        </span>
      </div>
      <div className="my-2 flex flex-row items-center justify-start gap-2 rounded-md bg-kanbanLightGreyBG p-3 dark:bg-kanbanDarkGreyBG">
        <input
          type="checkbox"
          className="accent-kanbanPurpule focus:accent-kanbanPurpuleHover"
        />
        <span className="text-xs font-bold text-kanbanLightGrey">
          Research competitor pricing and business models
        </span>
      </div>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold text-kanbanLightGrey">
          Current Status
        </span>
        <input
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
          type="text"
          placeholder="Doing"
        />
      </div>
      {isEditDeletBoardModal && (
        <SubModal
          handleEditModal={handleEditTaskModal}
          handleDeletModal={handleDeletTaskModal}
          firstTextBtn={"Edit Task"}
          secondTextBtn={"Delete Task"}
        />
      )}
    </div>
  );
}
