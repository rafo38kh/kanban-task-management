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
        <li className="flex h-full w-[17.5rem] items-center justify-center pl-4">
          <button
            type="button"
            className="mt-auto h-[calc(100%_-_3.5rem)] w-[17.5rem] rounded-lg bg-kanbanVeryLightGrey font-bold text-kanbanLightGrey transition-all duration-200 hover:text-kanbanPurpule dark:bg-[#23242f]"
          >
            + New Column
          </button>
        </li>
      </ul>
      <ModalWrapper isOpen={isModalOpen}>{getModalContent()}</ModalWrapper>
      {!isSideNavOpen && (
        <button
          onClick={handleOpenSideNav}
          type="button"
          className="absolute bottom-8 left-0 hidden h-12 w-14 rounded-r-full bg-kanbanPurpule p-4 transition-all duration-200 hover:bg-kanbanPurpuleHover md:block"
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

    // <div className="flex h-full w-full items-center justify-center p-8">
    //   <div className="flex max-w-[30rem] flex-col items-center justify-center gap-8 text-center text-kanbanLightGrey">
    //     <span>This board is empty. Create a new column to get started.</span>
    //     <Button
    //       onClick={() => {}}
    //       styles={
    //         "text-white bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200"
    //       }
    //       text={"+ Add New Column"}
    //     />
    //     <ModalWrapper isOpen={isModalOpen}>{getModalContent()}</ModalWrapper>
    //   </div>
    // </div>
  );
}
