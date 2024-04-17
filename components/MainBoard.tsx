"use client";
import { useContext } from "react";
import Button from "./Button";
import ModalBoardInformation from "./ModalBoardInformation";
import ModalDelateInformation from "./ModalDelateInformation";
import ModalMainChanges from "./ModalMainChanges";
import ModalWrapper from "./ModalWrapper";
import { StatesContext } from "@/contexts/StatesContextProvider";
import ModalTaskInformation from "./ModalTaskInformation";

export default function EmptyBoard() {
  const {
    isAddNewBoardModalOpen,
    isEditTaskModalOpen,
    isDeletTaskModalOpen,
    isMainChangesModalOpen,
  } = useContext(StatesContext);

  return (
    <div className="flex max-w-64 flex-col items-center justify-center gap-8 text-center text-kanbanLightGrey">
      <span>This board is empty. Create a new column to get started.</span>
      <Button
        textColor={"text-white"}
        text={"+ Add New Column"}
        bgColor={"bg-kanbanPurpule"}
        margin={""}
        onClick={() => {
          console.log("+ Add New Column");
        }}
      />
      {isAddNewBoardModalOpen && (
        <ModalWrapper>
          <ModalBoardInformation
            boardType={"Add New Board"}
            buttonText={"Create New Board"}
          />
        </ModalWrapper>
      )}

      {isEditTaskModalOpen && (
        <ModalWrapper>
          <ModalTaskInformation
            boardType={"Edit Task"}
            buttonText={"Save Changes"}
          />
        </ModalWrapper>
      )}

      {isDeletTaskModalOpen && (
        <ModalWrapper>
          <ModalDelateInformation
            boardType={"Delete this task?"}
            buttonText={""}
          />
        </ModalWrapper>
      )}
      {isMainChangesModalOpen && (
        <ModalWrapper>
          <ModalMainChanges />
        </ModalWrapper>
      )}
    </div>
  );
}
