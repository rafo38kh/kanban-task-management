"use client";
import { ChangeEvent, useState } from "react";
import { useAppContext } from "@/contexts/AppContextProvider";
import Button from "../Button";
import { useQuery } from "react-query";
import api from "@/lib/api";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { TaskData } from "@/types/SharedTypes";

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
  const [isTaskStatusItemsShow, setIsTaskStatusItemsShow] = useState(false);

  const { curBoardId } = useAppContext();
  const parsedUser = useGetUsersInfo();

  // const {
  //   data: columnsData,
  //   error: columnsError,
  //   isError: isColumnsError,
  //   isLoading: isColumnsLoading,
  // } = useQuery({
  //   queryKey: ["columns", curBoardId],
  //   queryFn: async () => await api.getColumns(parsedUser.userID, curBoardId),
  // });

  // console.log("columnsData", columnsData);
  const {
    data: tasksData,
    error: tasksError,
    isError: isTasksError,
    isLoading: isTasksLoading,
  } = useQuery<TaskData>({
    queryKey: ["tasks", curBoardId],
    queryFn: async () => await api.getTasks(parsedUser.userID, curBoardId),
  });

  console.log("tasksData", tasksData);

  const [taskData, setTaskData] = useState<TaskData>(
    isEdit
      ? tasksData
      : {
          name: "",
          description: "",
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

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{boardTitle}</h1>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Title</span>
        <input
          type="text"
          value={taskData?.name}
          placeholder="e.g. Take coffee break"
          onChange={(e) => handleChange("name", e)}
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-[0.69rem] text-xs"
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
          onChange={(e) => handleChange("description", e)}
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
              className="w-full rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-[0.69rem] text-xs"
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
        onClick={handleAddNewTask}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule transition-all duration-200 hover:bg-kanbanLightGreyBG"
        }
      />
      <div className="relative my-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Status</span>
        {isEdit ? (
          tasksData && (
            <>
              <button
                type="button"
                className="flex items-center justify-between rounded-md border border-kanbanLightGrey p-[0.44rem] text-left"
                onClick={() =>
                  setIsTaskStatusItemsShow((prevState) => !prevState)
                }
              >
                {tasksData[0]?.name}
                {isTaskStatusItemsShow ? (
                  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke="#635FC7"
                      strokeWidth="2"
                      fill="none"
                      d="M9 6 5 2 1 6"
                    />
                  </svg>
                ) : (
                  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke="#635FC7"
                      strokeWidth="2"
                      fill="none"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                )}
              </button>
              {isTaskStatusItemsShow && (
                <ul
                  className={`absolute top-16 grid h-44 w-full max-w-[26rem] gap-2 overflow-y-scroll rounded-md bg-kanbanDarkGrey p-4`}
                >
                  {tasksData?.status?.map((task) => (
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          // TODO: Set state
                        }}
                        className="h-max w-full rounded-md border border-kanbanLightGrey p-[0.44rem] px-4 text-left"
                      >
                        {task?.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )
        ) : (
          <input
            value={taskData?.status}
            className="rounded-md border-[1px] border-kanbanLightGrey/20 bg-transparent p-2 text-xs"
            type="text"
            onChange={(e) => handleChange("status", e)}
          />
        )}
      </div>
      <Button
        disabled={taskData?.name?.length === 0 || taskData?.status.length === 0}
        text={"Create Task"}
        styles={
          "bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200 text-kanbanVeryLightGrey disabled:pointer-events-none disabled:opacity-50"
        }
        onClick={() => {
          console.log("edit task");
        }}
      />
    </>
  );
}
