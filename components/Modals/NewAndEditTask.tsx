"use client";
import { ChangeEvent, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import api from "@/lib/api";

import { useAppContext } from "@/contexts/AppContextProvider";
import { ModalContext } from "@/contexts/ModalContextProvider";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import Button from "../Button";

import { ColumnNames, TaskData } from "@/types/SharedTypes";

type ModalTaskInformationProps = {
  isEdit: boolean;
  boardTitle: string;
};

export default function NewAndEditTask({
  isEdit,
  boardTitle,
}: ModalTaskInformationProps) {
  const { setIsModalOpen } = useContext(ModalContext);
  const {
    curTaskId,
    curBoardId,
    setCurTaskId,
    currentColumnId,
    setCurrentColumnId,
  } = useAppContext();

  const parsedUser = useGetUsersInfo();
  const queryClient = useQueryClient();

  const [isTaskStatusItemsShow, setIsTaskStatusItemsShow] = useState(false);

  const {
    data: task,
    error: tasksError,
    isError: isTaskError,
    isLoading: isTaskLoading,
  } = useQuery<TaskData>({
    queryKey: ["task", curTaskId],
    queryFn: async () =>
      await api.getTask(parsedUser.userID, curBoardId, curTaskId),
  });

  const {
    data: columnNames,
    error: columnNamesError,
    isError: isColumnNamesError,
    isLoading: isColumnNamesLoading,
  } = useQuery<ColumnNames[]>({
    queryKey: ["columnNames", curBoardId],
    queryFn: async () =>
      await api.getColumnNames(parsedUser.userID, curBoardId),
  });

  const {
    mutate: postTask,
    data: postTaskData,
    error: postTaskError,
    isError: postTaskIsError,
    isLoading: postTaskIsLoading,
  } = useMutation(
    ({
      userId,
      body,
    }: {
      userId: string;
      body: {
        title: string;
        description: string;
        current_status: string;
        parent_board_id: string;
        subtasks?: string[];
      };
    }) => api.postTask(userId, body),
    {
      onSuccess: (data) => {
        console.log("Task created successfully", data);
        setIsModalOpen(false);
        setCurrentColumnId("");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => {
        console.error("Error creating task:", error);
      },
    },
  );

  const {
    mutate: editTask,
    error: editeError,
    data: editTaskData,
    isError: editIsError,
    isLoading: editIsLoading,
  } = useMutation(
    ({
      userId,
      taskId,
      body,
    }: {
      userId: string;
      taskId: string;
      body: {
        title: string;
        description: string;
        current_status: string;
        parent_board_id: string;
        subtasks?: string[];
      };
    }) => api.editTask(userId, taskId, body),
    {
      onSuccess: (data) => {
        console.log("Task edited successfully", data);
        setIsModalOpen(false);
        setCurTaskId("");
        setCurrentColumnId("");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => {
        console.error("Error editing task:", error);
      },
    },
  );

  const [taskData, setTaskData] = useState<TaskData>(
    isEdit
      ? task
      : {
          description: "",
          title: "",
          current_status: currentColumnId
            ? columnNames?.find((column) => column?.id === currentColumnId)
                ?.column_name
            : columnNames?.at(0)?.column_name,
          subtasks: [],
          parent_board_id: "",
          completed_subtasks: "",
        },
  );

  const isSubtaskEmpty = taskData?.subtasks?.every(
    (subtask) => subtask?.title !== "",
  );

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

  const handleDeleteTask = (id: string) => {
    setTaskData({
      ...taskData,
      subtasks: taskData?.subtasks.filter((el) => el.id !== id),
    });
  };

  const handleAddNewSubtask = () => {
    setTaskData((prevState) => ({
      ...prevState,
      subtasks: [
        ...(prevState?.subtasks || []),
        {
          id: (prevState?.subtasks?.at(-1)?.id + 1 || 1)?.toString(),
          title: "",
          completed: false,
          parent_task_id: curTaskId,
        },
      ],
    }));
  };

  const handleConfirmClick = () => {
    const body = {
      title: taskData?.title,
      description: taskData?.description,
      current_status: taskData?.current_status,
      parent_board_id: taskData?.parent_board_id || curBoardId,
      subtasks: taskData?.subtasks?.map((subtask) => subtask?.title),
    };

    isEdit
      ? editTask({ body, taskId: curTaskId, userId: parsedUser?.userID })
      : postTask({ body, userId: parsedUser?.userID });
  };

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{boardTitle}</h1>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Title</span>
        <input
          type="text"
          value={taskData?.title}
          placeholder="e.g. Take coffee break"
          onChange={(e) => handleChange("title", e)}
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-[0.69rem] text-xs"
        />
      </div>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Description</span>
        <textarea
          rows={4}
          value={taskData?.description}
          onChange={(e) => handleChange("description", e)}
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
          placeholder="e.g. It’s always good to take a break. This
          15 minute break will  recharge the batteries
          a little."
        />
      </div>
      <span className="text-xs font-bold">Subtasks</span>
      <ul className="mt-4 flex max-h-60 w-full flex-col items-center justify-between gap-3 overflow-scroll">
        {taskData?.subtasks?.map((subtask) => (
          <li
            key={subtask?.id}
            className="flex w-full flex-row items-center justify-between gap-4"
          >
            <input
              type="text"
              value={subtask?.title}
              placeholder="e.g. Make coffee"
              className="w-full rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-[0.69rem] text-xs"
              onChange={(e) =>
                setTaskData((prevState) => ({
                  ...prevState,
                  subtasks: prevState?.subtasks.map((s) =>
                    s.id === subtask?.id ? { ...s, title: e.target.value } : s,
                  ),
                }))
              }
            />
            <button
              type="button"
              className="group"
              onClick={() => handleDeleteTask(subtask?.id)}
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
          </li>
        ))}
      </ul>
      <Button
        isLoading={false}
        text={"+ Add New Subtask"}
        disabled={isEdit ? editIsLoading : postTaskIsLoading}
        onClick={handleAddNewSubtask}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule transition-all duration-200 hover:bg-kanbanLightGreyBG disabled:pointer-events-none disabled:opacity-50 mt-4"
        }
      />
      <div className="relative my-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Status</span>
        <button
          type="button"
          className="flex items-center justify-between rounded-md border border-kanbanLightGrey p-[0.44rem] text-left"
          onClick={() => setIsTaskStatusItemsShow((prevState) => !prevState)}
        >
          {currentColumnId
            ? columnNames?.find((column) => column?.id === currentColumnId)
                ?.column_name
            : taskData?.current_status}
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
            className={`absolute top-16 z-50 grid h-44 w-full max-w-[26rem] gap-2 overflow-y-scroll rounded-md bg-white p-4 dark:bg-kanbanDarkGrey`}
          >
            {columnNames?.map((column) => (
              <li key={column?.id}>
                <button
                  type="button"
                  onClick={() => {
                    setIsTaskStatusItemsShow(false);
                    setTaskData((prevState) => ({
                      ...prevState,
                      current_status: column?.column_name,
                    }));
                  }}
                  className="h-max w-full rounded-md p-[0.44rem] px-4 text-left text-kanbanLightGrey hover:text-kanbanGrey dark:hover:text-kanbanLightGreyBG"
                >
                  {column?.column_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        isLoading={isEdit ? editIsLoading : postTaskIsLoading}
        disabled={
          taskData?.title?.length === 0 ||
          !taskData?.current_status ||
          !isSubtaskEmpty
        }
        text={isEdit ? "Save Changes" : "Create Task"}
        styles={
          "bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200 text-kanbanVeryLightGrey disabled:pointer-events-none disabled:opacity-50"
        }
        onClick={handleConfirmClick}
      />
    </>
  );
}
