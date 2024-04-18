"use client";
import { Dispatch, SetStateAction, useContext } from "react";
import Button from "./Button";

import ModalWrapper from "./Modals/ModalWrapper";
import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";
import Column from "./Column";

type MainBoardProps = {
  setIsSideNavOpen: Dispatch<SetStateAction<boolean>>;
  isSideNavOpen: boolean;
};

export default function MainBoard({
  setIsSideNavOpen,
  isSideNavOpen,
}: MainBoardProps) {
  const columns = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

  const { setIsModalOpen, isModalOpen, setModalType, getModalContent } =
    useContext(ModalContext);

  const handleOpenSideNav = () => {
    setIsSideNavOpen(true);
  };

  return (
    <>
      <ul className="relative flex h-[100vh_-_100px] w-[calc(100&_-_264px)] overflow-scroll p-4">
        {columns?.map((el) => (
          <li className="h-full">
            <Column />
          </li>
        ))}
      </ul>
      <ModalWrapper isOpen={isModalOpen}>{getModalContent()}</ModalWrapper>
      {!isSideNavOpen && (
        <button
          onClick={handleOpenSideNav}
          type="button"
          className="absolute bottom-8 left-0 hidden h-12 w-14 rounded-r-full bg-kanbanPurpule p-4 md:block"
        >
          <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
              fill="#FFF"
            />
          </svg>
        </button>
      )}
    </>

    // <div className="flex max-w-64 flex-col items-center justify-center gap-8 text-center text-kanbanLightGrey">
    //   <span>This board is empty. Create a new column to get started.</span>
    //   <button
    //     onClick={() => {
    //       setIsModalOpen(true);
    //       setModalType(ModalTypes.Main);
    //     }}
    //   >
    //     open main modal
    //   </button>
    //   <button
    //     onClick={() => {
    //       setIsModalOpen(true);
    //       setModalType(ModalTypes.EditTask);
    //     }}
    //   >
    //     open edit modal Taks
    //   </button>
    //   <button
    //     onClick={() => {
    //       setIsModalOpen(true);
    //       setModalType(ModalTypes.EditBoard);
    //     }}
    //   >
    //     open edit modal Board
    //   </button>
    //   <button
    //     onClick={() => {
    //       setIsModalOpen(true);
    //       setModalType(ModalTypes.DeleteBoard);
    //     }}
    //   >
    //     open delete modal Board
    //   </button>
    //   <button
    //     onClick={() => {
    //       setIsModalOpen(true);
    //       setModalType(ModalTypes.DeleteTask);
    //     }}
    //   >
    //     open delete modal task
    //   </button>
    //   <Button
    //     margin={""}
    //     onClick={() => {}}
    //     textColor={"text-white"}
    //     text={"+ Add New Column"}
    //     bgColor={"bg-kanbanPurpule"}
    //   />
    //   <ModalWrapper isOpen={isModalOpen}>{getModalContent()}</ModalWrapper>\
    // </div>
  );
}
