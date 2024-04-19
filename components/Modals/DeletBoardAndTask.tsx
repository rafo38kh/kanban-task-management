"use client";

import Button from "../Button";

type ModalBoardInformationProps = {
  boardTitle: string;
};

export default function DeletBoardAndTask({
  boardTitle,
}: ModalBoardInformationProps) {
  return (
    <>
      <h1 className=" text-xl font-bold text-kanbanRed">{boardTitle}</h1>
      <p className="my-6 text-xs font-bold text-kanbanLightGrey">
        Are you sure you want to delete the board? This action will remove all
        columns and tasks and cannot be reversed.
      </p>
      <Button
        text={"Delete"}
        styles={
          "bg-kanbanRed text-kanbanVeryLightGrey hover:bg-kanbanRedHover transition-all duration-200  mb-8"
        }
        onClick={() => {
          console.log("Create New Board");
        }}
      />
      <Button
        text={"Cancel"}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule hover:bg-white transition-all duration-200 dark:hover:bg-kanbanLightGreyBG"
        }
        onClick={() => {
          console.log("Create New Board");
        }}
      />
    </>
  );
}
