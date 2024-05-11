"use client";

import { ChangeEvent, useContext, useState } from "react";
import Button from "../Button";
import { ModalContext } from "@/contexts/ModalContextProvider";

type Column = {
  id: string;
  column: string;
};

type BoardData = {
  boardName: string;
  boardColumns: Column[];
};

type ModalBoardInformationProps = {
  isEdit: boolean;
  boardTitle: string;
  boardBtnText: string;
};

export default function NewAndEditBoard({
  isEdit,
  boardTitle,
  boardBtnText,
}: ModalBoardInformationProps) {
  const initialBoardkData: BoardData = {
    boardName: "Initial Board Name",
    boardColumns: [
      { id: "1", column: "column 1" },
      { id: "2", column: "column 2" },
    ],
  };

  const [boardData, setBoardData] = useState<BoardData>(
    isEdit
      ? initialBoardkData
      : {
          boardName: "",
          boardColumns: [
            { id: "1", column: "column 3" },
            { id: "2", column: "column 4" },
          ],
        },
  );

  const handleChange = (
    key: keyof BoardData,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setBoardData({
      ...boardData,
      [key]: e.target.value,
    });
  };

  const handleAddNewColumn = () => {
    setBoardData((prevState) => ({
      ...prevState,
      boardColumns: [...prevState?.boardColumns, { id: "", column: "" }],
    }));
  };

  const handleDeletColumn = (id: string) => {
    setBoardData((prevState) => ({
      ...prevState,
      boardColumns: [...prevState?.boardColumns.filter((el) => el.id !== id)],
    }));
  };
  console.log("boardData", boardData);

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{boardTitle}</h1>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold">{boardData?.boardName}</span>
        <input
          value={boardData?.boardName}
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
          type="text"
          placeholder="e.g. Web Design"
          onChange={(e) => handleChange("boardName", e)}
        />
      </div>
      <div>
        <span className="text-xs font-bold">Board Columns</span>
        {boardData?.boardColumns.map((column) => (
          <div
            key={column?.id}
            className="mb-5 mt-2 flex flex-row items-center justify-between gap-4"
          >
            <input
              value={column?.column}
              className="w-full rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
              type="text"
              placeholder="e.g. Make coffee"
              onChange={(e) => {
                const updatedBoardColumn = boardData?.boardColumns?.map(
                  (item) =>
                    item.id === column.id
                      ? { ...item, column: e.target.value }
                      : item,
                );
                setBoardData((prevState) => ({
                  ...prevState,
                  boardColumns: updatedBoardColumn,
                }));
              }}
            />
            <button type="button" onClick={() => handleDeletColumn(column?.id)}>
              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                <g fill="#828FA3" fillRule="evenodd">
                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                </g>
              </svg>
            </button>
          </div>
        ))}
      </div>
      <Button
        disabled={false}
        text={"+ Add New Column"}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule transition-all duration-200 hover:bg-kanbanLightGreyBG mb-8"
        }
        onClick={() => {
          handleAddNewColumn();
          console.log("+ Add New Column");
        }}
      />
      <span className="h-6 w-full"></span>
      <Button
        disabled={boardData?.boardName?.length === 0}
        text={boardBtnText}
        // styles={
        //   "bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200 text-kanbanVeryLightGrey"
        // }
        styles={
          "bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200 text-kanbanVeryLightGrey disabled:pointer-events-none disabled:opacity-50"
        }
        onClick={() => {
          console.log("Create New Board");
        }}
      />
    </>
  );
}
