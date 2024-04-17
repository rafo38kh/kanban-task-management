"use client";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ModalContext, ModalTypes } from "../contexts/ModalContextProvider";
import SubModal from "./Modals/SubModal";

type TopNavigationProps = {
  setIsSideBarShow: Dispatch<SetStateAction<boolean>>;
  isSideBarshow: boolean;
};

export default function TopNavigation({
  setIsSideBarShow,
  isSideBarshow,
}: TopNavigationProps) {
  const [isEditDeletBoardModal, setIsEditDeletBoardModal] = useState(false);

  const { setModalType, setIsModalOpen, setClickTarget } =
    useContext(ModalContext);

  const handleAddNewTask = () => {
    setIsModalOpen(true);
    setModalType(ModalTypes.NewTask);
  };

  const handleOpenEditDeleteBoardBtns = (e: MouseEvent) => {
    setIsEditDeletBoardModal((prevState) => !prevState);
    setClickTarget(e.target as HTMLElement);
  };

  const handleEditBoardModal = () => {
    setIsEditDeletBoardModal(false);
    setIsModalOpen(true);
    setModalType(ModalTypes.EditBoard);
  };

  const handleDeletBoardModal = () => {
    setIsEditDeletBoardModal(false);
    setIsModalOpen(true);
    setModalType(ModalTypes.DeleteBoard);
  };

  return (
    <div className="flex w-full items-center justify-between bg-kanbanVeryLightGrey p-4 dark:bg-kanbanDarkGrey">
      <div className="start flex w-full items-center justify-start gap-4">
        <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
          <g fill="#635FC7" fillRule="evenodd">
            <rect width="6" height="25" rx="2" />
            <rect opacity=".75" x="9" width="6" height="25" rx="2" />
            <rect opacity=".5" x="18" width="6" height="25" rx="2" />
          </g>
        </svg>
        <button
          onClick={() => setIsSideBarShow((prevState) => !prevState)}
          type="button"
          className="flex items-center justify-center gap-2"
        >
          <span className="text-black dark:text-white">Platform Launch</span>
          {isSideBarshow ? (
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="M9 6 5 2 1 6"
              />
            </svg>
          ) : (
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          className="rounded-full bg-kanbanPurpule p-2 px-4"
          onClick={handleAddNewTask}
        >
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            />
          </svg>
        </button>

        <button type="button" onClick={(e) => handleOpenEditDeleteBoardBtns(e)}>
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
        </button>
      </div>
      {isEditDeletBoardModal && (
        <SubModal
          handleEditModal={handleEditBoardModal}
          handleDeletModal={handleDeletBoardModal}
          firstTextBtn={"Edit Board"}
          secondTextBtn={"Delete Board"}
        />
      )}
    </div>
  );
}
