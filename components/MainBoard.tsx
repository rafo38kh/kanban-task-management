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
    isDeletTaskModalOpen,
    isAddNewBoardModalOpen,
    isEditTaskModalOpen,
    isMainChangesModalOpen,
    isEditBoardModalOpen,
    setIsEditBoardModalOpen,
    isDeletBoardModalOpen,
  } = useContext(StatesContext);

  const handleAddNewColumn = () => {
    setIsEditBoardModalOpen(true);
  };

  return (
    <div className="flex max-w-64 flex-col items-center justify-center gap-8 text-center text-kanbanLightGrey">
      <span>This board is empty. Create a new column to get started.</span>
      <Button
        textColor={"text-white"}
        text={"+ Add New Column"}
        bgColor={"bg-kanbanPurpule"}
        margin={""}
        onClick={handleAddNewColumn}
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

      {isDeletBoardModalOpen && (
        <ModalWrapper>
          <ModalDelateInformation
            boardType={"Delete this board?"}
            buttonText={""}
          />
        </ModalWrapper>
      )}

      {isMainChangesModalOpen && (
        <ModalWrapper>
          <ModalMainChanges />
        </ModalWrapper>
      )}
      {isEditBoardModalOpen && (
        <ModalWrapper>
          <ModalBoardInformation
            boardType={"Edit Board"}
            buttonText={"Save Changes"}
          />
        </ModalWrapper>
      )}
    </div>
  );
}
