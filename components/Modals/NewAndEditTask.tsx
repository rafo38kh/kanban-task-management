"use client";
import { ChangeEvent, useContext, useState } from "react";
import { useAppContext } from "@/contexts/AppContextProvider";
import Button from "../Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "@/lib/api";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { ColumnNames, TaskData } from "@/types/SharedTypes";
import { ModalContext } from "@/contexts/ModalContextProvider";

type ModalTaskInformationProps = {
  isEdit: boolean;
  boardTitle: string;
};

export default function NewAndEditTask({
  isEdit,
  boardTitle,
}: ModalTaskInformationProps) {
  const [isTaskStatusItemsShow, setIsTaskStatusItemsShow] = useState(false);

  const { setIsModalOpen } = useContext(ModalContext);
  const queryClient = useQueryClient();
  const parsedUser = useGetUsersInfo();
  const { curBoardId, curTaskId } = useAppContext();

  const {
    error,
    isError,
    isLoading,
    mutate: postTask,
    data: postTaskData,
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
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => {
        console.error("Error creating task:", error);
      },
    },
  );

  const {
    error: editeError,
    isError: editIsError,
    isLoading: editIsLoading,
    mutate: editTask,
    data: editTaskData,
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
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => {
        console.error("Error editing task:", error);
      },
    },
  );

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

  console.log(columnNames, "columnNames");

  const [taskData, setTaskData] = useState<TaskData>(
    isEdit
      ? task
      : {
          description: "",
          title: "",
          current_status: columnNames?.at(0)?.column_name,
          subtasks: [],
          parent_board_id: "",
        },
  );

  console.log(taskData?.subtasks, "taskData");

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
    setTaskData((prevState) => ({
      ...prevState,
      subtasks: prevState?.subtasks.filter((el) => el.id !== id),
    }));
  };

  const handleAddNewSubtask = () => {
    setTaskData((prevState) => ({
      ...prevState,
      subtasks: [
        ...prevState?.subtasks,
        {
          id: (prevState?.subtasks?.at(-1)?.id + 1 || 1)?.toString(),
          title: "",
          completed: false,
          parent_task_id: "",
        },
      ],
    }));
  };

  const handleConfirmClick = () => {
    const body = {
      subtasks: [],
      title: taskData?.title,
      description: taskData?.description,
      current_status: taskData?.current_status,
      parent_board_id: taskData?.parent_board_id || curBoardId,
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
          value={taskData?.description}
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
          </div>
        ))}
      </div>
      <Button
        disabled={false}
        text={"+ Add New Subtask"}
        onClick={handleAddNewSubtask}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule transition-all duration-200 hover:bg-kanbanLightGreyBG"
        }
      />
      <div className="relative my-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Status</span>
        <button
          type="button"
          className="flex items-center justify-between rounded-md border border-kanbanLightGrey p-[0.44rem] text-left"
          onClick={() => setIsTaskStatusItemsShow((prevState) => !prevState)}
        >
          {taskData?.current_status}
          {/* {tasksData[0]?.current} */}
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
            className={`absolute top-16 z-50 grid h-44 w-full max-w-[26rem] gap-2 overflow-y-scroll rounded-md bg-kanbanDarkGrey p-4`}
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
                  className="h-max w-full rounded-md border border-kanbanLightGrey p-[0.44rem] px-4 text-left"
                >
                  {column?.column_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        disabled={taskData?.title?.length === 0 || !taskData?.current_status}
        text={isEdit ? "Save Changes" : "Create Task"}
        styles={
          "bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200 text-kanbanVeryLightGrey disabled:pointer-events-none disabled:opacity-50"
        }
        onClick={handleConfirmClick}
      />
    </>
  );
}
