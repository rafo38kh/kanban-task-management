"use client";
import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContextProvider";
import { ModalContext } from "@/contexts/ModalContextProvider";

import SignIn from "./SignIn";
import ColumnsList from "./ColumnsList";
import ModalWrapper from "./Modals/ModalWrapper";

export default function MainBoard() {
  const { isAuth } = useContext(AuthContext);
  const { isModalOpen, getModalContent, setIsModalOpen } =
    useContext(ModalContext);

  return (
    <>
      {isAuth ? (
        <>
          <ColumnsList />
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
