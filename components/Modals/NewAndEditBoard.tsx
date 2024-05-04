"use client";

import { useContext } from "react";
import Button from "../Button";
import { ModalContext } from "@/contexts/ModalContextProvider";

type ModalBoardInformationProps = {
  isEdit: boolean;
  boardTitle: string;
  boardBtnText: string;
};

export default function NewAndEditBoard({
  boardTitle,
  boardBtnText,
}: ModalBoardInformationProps) {
  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{boardTitle}</h1>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Board Name</span>
        <input
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
          type="text"
          placeholder="e.g. Web Design"
        />
      </div>
      <div>
        <span className="text-xs font-bold">Board Columns</span>
        <div className="mb-5 mt-2 flex flex-row items-center justify-between gap-4">
          <input
            className="w-full rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
            type="text"
            placeholder="e.g. Make coffee"
          />
          <button>
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </button>
        </div>
        <div className="mb-5 flex flex-row items-center justify-between gap-4">
          <input
            className="w-full rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
            type="text"
            placeholder="e.g. Drink coffee & smile"
          />
          <button>
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </button>
        </div>
      </div>
      <Button
        disabled={undefined}
        text={"+ Add New Column"}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule transition-all duration-200 hover:bg-kanbanLightGreyBG mb-8"
        }
        onClick={() => {
          console.log("+ Add New Column");
        }}
      />
      <span className="h-6 w-full"></span>
      <Button
        disabled={false}
        text={boardBtnText}
        styles={
          "bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200 text-kanbanVeryLightGrey"
        }
        onClick={() => {
          console.log("Create New Board");
        }}
      />
    </>
  );
}
