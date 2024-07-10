"use client";
import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContextProvider";
import { ModalContext } from "@/contexts/ModalContextProvider";

import SignIn from "./SignIn";
import ColumnsList from "./ColumnsList";
import ModalWrapper from "./Modals/ModalWrapper";

type MainBoardProps = {};

export default function MainBoard({}: MainBoardProps) {
  const { isAuth } = useContext(AuthContext);
  const { isModalOpen, getModalContent, setIsModalOpen } =
    useContext(ModalContext);

  return (
    <div className="overflow-hidden overflow-x-auto">
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
    </div>
  );
}
