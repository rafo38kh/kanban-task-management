"use client";
import { Dispatch, SetStateAction, useContext } from "react";
import Button from "./Button";

import ModalWrapper from "./Modals/ModalWrapper";
import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";
import Column from "./Column";
import { AuthContext } from "@/contexts/AuthContextProvider";
import SignIn from "./SignIn";

export default function MainBoard() {
  const columns = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  const { isAuth } = useContext(AuthContext);
  const { setIsModalOpen, isModalOpen, setModalType, getModalContent } =
    useContext(ModalContext);

  return (
    <>
      {isAuth ? (
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
          <ModalWrapper isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
            {getModalContent()}
          </ModalWrapper>
        </>
      ) : (
        <SignIn />
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
