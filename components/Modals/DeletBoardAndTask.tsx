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
        textColor={"text-kanbanVeryLightGrey"}
        text={"Delete"}
        bgColor={"bg-kanbanRed"}
        margin={"mb-6"}
        onClick={() => {
          console.log("Create New Board");
        }}
      />
      <Button
        textColor={"text-kanbanPurpule"}
        text={"Cancel"}
        bgColor={"bg-kanbanVeryLightGrey"}
        margin={""}
        onClick={() => {
          console.log("Create New Board");
        }}
      />
    </>
  );
}
