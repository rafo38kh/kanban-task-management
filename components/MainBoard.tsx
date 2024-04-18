"use client";
import { useContext } from "react";
import Button from "./Button";

import ModalWrapper from "./Modals/ModalWrapper";
import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";
import Column from "./Column";

export default function MainBoard() {
  const columns = ["", "", ""];

  const { setIsModalOpen, isModalOpen, setModalType, getModalContent } =
    useContext(ModalContext);

  return (
    <div className="h-full w-full">
      <ul className="flex h-full flex-row">
        {columns?.map((el) => (
          <li className="h-full">
            <Column />
          </li>
        ))}
      </ul>
      <ModalWrapper isOpen={isModalOpen}>{getModalContent()}</ModalWrapper>\
    </div>

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
