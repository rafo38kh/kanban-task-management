"use client";

import Button from "./Button";

type ModalBoardInformationProps = {
  boardType: string;
  buttonText: string;
};

export default function ModalBoardInformation({
  boardType,
  buttonText,
}: ModalBoardInformationProps) {
  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{boardType}</h1>
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
        textColor={"text-kanbanPurpule"}
        text={"+ Add New Column"}
        bgColor={"bg-kanbanVeryLightGrey"}
        margin={"mb-6"}
        onClick={() => {
          console.log("+ Add New Column");
        }}
      />
      <span className="h-6 w-full"></span>
      <Button
        textColor={"text-kanbanVeryLightGrey"}
        text={buttonText}
        bgColor={"bg-kanbanPurpule"}
        margin={""}
        onClick={() => {
          console.log("Create New Board");
        }}
      />
    </>
  );
}
