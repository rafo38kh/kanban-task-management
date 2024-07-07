"use client";
import {
  useState,
  Dispatch,
  useContext,
  MouseEvent,
  SetStateAction,
} from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { AuthContext } from "@/contexts/AuthContextProvider";
import { ModalContext, ModalTypes } from "../contexts/ModalContextProvider";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import SubModal from "./Modals/SubModal";

type TopNavigationProps = {
  isSideBarshow: boolean;
  isSideNavOpen: boolean;
  setIsSideBarShow: Dispatch<SetStateAction<boolean>>;
};

export default function TopNavigation({
  isSideBarshow,
  isSideNavOpen,
  setIsSideBarShow,
}: TopNavigationProps) {
  const { isAuth, logOut } = useContext(AuthContext);
  const { setModalType, setIsModalOpen, setClickTarget } =
    useContext(ModalContext);

  const { theme } = useTheme();
  const parsedUser = useGetUsersInfo();

  const [isEditDeletBoardModal, setIsEditDeletBoardModal] = useState(false);

  const handleAddNewTask = () => {
    setIsModalOpen(true);
    setModalType(ModalTypes.NewTask);
  };

  const handleOpenEditDeleteBoardBtns = (e: MouseEvent) => {
    setClickTarget(e.target as HTMLElement);
    setIsEditDeletBoardModal((prevState) => !prevState);
  };

  const handleEditBoardModal = () => {
    setIsModalOpen(true);
    setIsEditDeletBoardModal(false);
    setModalType(ModalTypes.EditBoard);
  };

  const handleDeletBoardModal = () => {
    setIsModalOpen(true);
    setIsEditDeletBoardModal(false);
    setModalType(ModalTypes.DeleteBoard);
  };

  const getLogo = (fillColor: string) => {
    return (
      <svg
        className="hidden md:block"
        width="153"
        height="26"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd">
          <path
            d="M44.56 25v-5.344l1.92-2.112L50.928 25h5.44l-6.304-10.432 6.336-7.04h-5.92l-5.92 6.304V.776h-4.8V25h4.8Zm19.36.384c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM81.968 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Zm24.16.384c1.707 0 3.232-.405 4.576-1.216a8.828 8.828 0 0 0 3.184-3.296c.779-1.387 1.168-2.923 1.168-4.608 0-1.707-.395-3.248-1.184-4.624a8.988 8.988 0 0 0-3.2-3.28c-1.344-.81-2.848-1.216-4.512-1.216-2.112 0-3.787.619-5.024 1.856V.776h-4.8V25h4.48v-1.664c.619.661 1.392 1.168 2.32 1.52a8.366 8.366 0 0 0 2.992.528Zm-.576-4.32c-1.301 0-2.363-.443-3.184-1.328-.821-.885-1.232-2.043-1.232-3.472 0-1.408.41-2.56 1.232-3.456.821-.896 1.883-1.344 3.184-1.344 1.323 0 2.41.453 3.264 1.36.853.907 1.28 2.053 1.28 3.44 0 1.408-.427 2.56-1.28 3.456-.853.896-1.941 1.344-3.264 1.344Zm17.728 4.32c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM141.328 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Z"
            fill={fillColor}
            fillRule="nonzero"
          />
          <g transform="translate(0 1)" fill="#635FC7">
            <rect width="6" height="25" rx="2" />
            <rect opacity=".75" x="9" width="6" height="25" rx="2" />
            <rect opacity=".5" x="18" width="6" height="25" rx="2" />
          </g>
        </g>
      </svg>
    );
  };

  return (
    <div className="flex h-full w-full flex-shrink-0 items-center justify-between border border-transparent border-b-kanbanVeryLightGrey bg-white px-6 py-9 dark:border-b-kanbanGrey dark:bg-kanbanDarkGrey ">
      <div className="flex w-full items-baseline justify-start gap-4">
        {!isSideNavOpen && getLogo(theme === "dark" ? "#F4F7FD" : "#000112")}
        <svg
          className="md:hidden"
          width="24"
          height="25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#635FC7" fillRule="evenodd">
            <rect width="6" height="25" rx="2" />
            <rect opacity=".75" x="9" width="6" height="25" rx="2" />
            <rect opacity=".5" x="18" width="6" height="25" rx="2" />
          </g>
        </svg>
        <span className="hidden text-2xl font-bold text-black dark:text-white md:inline-block">
          Platform Launch
        </span>

        <button
          onClick={() => setIsSideBarShow((prevState) => !prevState)}
          type="button"
          className="flex items-center justify-center gap-2 md:hidden"
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
      <div className="flex items-center justify-center gap-2 md:gap-6">
        {isAuth && (
          <div className="flex flex-row items-center gap-2 md:hidden">
            <div className="aspect-square w-9 overflow-hidden rounded-full lg:flex">
              {parsedUser?.profilePhoto && (
                <Image
                  height={100}
                  width={100}
                  alt="Picture of the author"
                  src={parsedUser?.profilePhoto}
                />
              )}
            </div>
            <button
              onClick={logOut}
              className="whitespace-nowrap stroke-kanbanLightGrey transition-all duration-200 hover:stroke-black dark:hover:stroke-white"
            >
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M19 12L15 8M19 12L15 16M19 12H9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        )}

        <button
          disabled={!isAuth}
          type="button"
          className="rounded-full bg-kanbanPurpule p-2 px-4 transition-all duration-200 hover:bg-kanbanPurpuleHover disabled:pointer-events-none disabled:opacity-50 md:w-40"
          onClick={handleAddNewTask}
        >
          <span className="hidden text-white md:inline">+ Add New Task</span>
          <svg
            className="md:hidden"
            width="12"
            height="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            />
          </svg>
        </button>

        <button
          disabled={!isAuth}
          type="button"
          className="p-4 disabled:cursor-not-allowed"
          onClick={(e) => handleOpenEditDeleteBoardBtns(e)}
        >
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
