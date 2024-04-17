import { useContext } from "react";

import { ModalContext } from "@/contexts/ModalContextProvider";

import Button from "../Button";

type ModalTaskInformationProps = {
  boardTitle: string;
  // content?: myam object vorn or kexni sax datan
};

export default function NewAndEditTask({
  boardTitle,
}: ModalTaskInformationProps) {
  const { handleClose } = useContext(ModalContext);

  return (
    <>
      <button onClick={handleClose}>Close</button>
      <h1 className="mb-6 text-xl font-bold">{boardTitle}</h1>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Title</span>
        <input
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
          type="text"
          placeholder="e.g. Take coffee break"
        />
      </div>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Description</span>
        <textarea
          rows={4}
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
          placeholder="e.g. It’s always good to take a break. This
          15 minute break will  recharge the batteries
          a little."
        ></textarea>
      </div>
      <div>
        <span className="text-xs font-bold">Subtasks</span>
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
        text={"+ Add New Subtask"}
        bgColor={"bg-kanbanVeryLightGrey"}
        margin={""}
        onClick={() => {
          console.log("+ Add New Subtask");
        }}
      />
      <div className="my-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Status</span>
        <input
          className="rounded-md border-[1px] border-kanbanLightGrey/20 bg-transparent p-2 text-xs"
          type="text"
        />
      </div>
      <Button
        textColor={"text-kanbanVeryLightGrey"}
        text={"Create Task"}
        bgColor={"bg-kanbanPurpule"}
        margin={""}
        onClick={() => {
          console.log("Create Task");
        }}
      />
    </>
  );
}
