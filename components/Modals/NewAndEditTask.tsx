import { ChangeEvent, useState } from "react";

import Button from "../Button";

type Subtask = {
  id: string;
  subtask: string;
};

type TaskData = {
  taskTitle: string;
  taskDescription: string;
  subtasks: Subtask[];
  status: string;
};

type ModalTaskInformationProps = {
  isEdit: boolean;
  boardTitle: string;
  // disabled: string;
  // content?: myam object vorn or kexni sax datan
};

export default function NewAndEditTask({
  isEdit,
  boardTitle,
  // disabled,
}: ModalTaskInformationProps) {
  const initialTaskData: TaskData = {
    taskTitle: "Initial Task Title",
    taskDescription: "Initial Task Description",
    subtasks: [
      { id: "1", subtask: "Subtask 1" },
      { id: "2", subtask: "Subtask 2" },
      { id: "3", subtask: "Subtask 3" },
    ],
    status: "Initial Status",
  };

  const [taskData, setTaskData] = useState<TaskData>(
    isEdit
      ? initialTaskData
      : {
          taskTitle: "",
          taskDescription: "",
          subtasks: [
            { id: "4", subtask: "Subtask 4" },
            { id: "5", subtask: "Subtask 5" },
            { id: "6", subtask: "Subtask 6" },
          ],
          status: "",
        },
  );

  console.log("taskData", taskData);

  const handleChange = (
    key: keyof TaskData,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    setTaskData({
      ...taskData,
      [key]: e.target.value,
    });
  };

  const handleDletTask = (id: string) => {
    setTaskData((prevState) => ({
      ...prevState,
      subtasks: prevState?.subtasks.filter((el) => el.id !== id),
    }));
  };

  const handleAddNewTask = () => {
    setTaskData((prevState) => ({
      ...prevState,
      subtasks: [
        ...prevState?.subtasks,
        { id: Math.random().toFixed(1), subtask: "" },
      ],
    }));
  };

  // const handleDletTask = (id: string) => {
  //   setTaskData((prevState) => ({
  //     ...prevState,
  //     subtasks: [...prevState?.subtasks.filter((el) => el.id !== id)],
  //   }));
  // };

  // const handleAddSubtask = () => {
  //   setTaskData((prevState) => ({
  //     ...prevState,
  //     subtasks: [
  //       ...prevState.subtasks,
  //       { id: String(prevState.subtasks.length + 1), subtask: "" },
  //     ],
  //   }));
  // };

  console.log("taskData", taskData);

  return (
    <>
      {/* <button type="button" onClick={handleClose}>
        Close
      </button> */}
      <h1 className="mb-6 text-xl font-bold">{boardTitle}</h1>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Title</span>
        <input
          type="text"
          value={taskData?.taskTitle}
          placeholder="e.g. Take coffee break"
          onChange={(e) => handleChange("taskTitle", e)}
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
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
          onChange={(e) => handleChange("taskDescription", e)}
        ></textarea>
      </div>
      <div>
        <span className="text-xs font-bold">Subtasks</span>

        {taskData?.subtasks?.map((subtask) => (
          <div
            key={subtask?.id}
            className="mb-5 mt-2 flex flex-row items-center justify-between gap-4"
          >
            <input
              type="text"
              value={subtask.subtask}
              placeholder="e.g. Make coffee"
              className="w-full rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
              onChange={(e) =>
                setTaskData((prevState) => ({
                  ...prevState,
                  subtasks: prevState?.subtasks.map((task) =>
                    task.id === subtask?.id
                      ? { ...task, subtask: e.target.value }
                      : task,
                  ),
                }))
              }
            />
            <button
              type="button"
              className="group"
              onClick={() => handleDletTask(subtask?.id)}
            >
              <svg
                className="group-hover:stroke-kanbanRed"
                width="15"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
              >
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
        text={"+ Add New Subtask"}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule transition-all duration-200 hover:bg-kanbanLightGreyBG"
        }
        onClick={() => {
          handleAddNewTask();
          console.log("+ Add New Subtask");
        }}
      />
      <div className="my-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Status</span>
        <input
          value={taskData?.status}
          className="rounded-md border-[1px] border-kanbanLightGrey/20 bg-transparent p-2 text-xs"
          type="text"
          onChange={(e) => handleChange("status", e)}
        />
      </div>
      <Button
        disabled={
          taskData?.taskTitle.length === 0 || taskData.status.length === 0
        }
        text={"Create Task"}
        styles={
          "bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200 text-kanbanVeryLightGrey disabled:pointer-events-none disabled:opacity-50"
        }
        onClick={() => {
          console.log("Create Task");
        }}
      />
    </>
  );
}
