"use client";
import { useRef, useState, MouseEvent, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";

import api from "@/lib/api";

import { useAppContext } from "@/contexts/AppContextProvider";
import { ModalContext, ModalTypes } from "../../contexts/ModalContextProvider";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import SubModal from "./SubModal";

import { ColumnNames, TaskData } from "@/types/SharedTypes";

export default function MainChanges() {
  const subModalRef = useRef(null);

  const { curBoardId, curTaskId, setCurTaskId } = useAppContext();
  const { setClickTarget, setModalType, setIsModalOpen } =
    useContext(ModalContext);

  const queryClient = useQueryClient();
  const parsedUser = useGetUsersInfo();

  const [isEditDeletBoardModal, setIsEditDeletBoardModal] = useState(false);
  const [isTaskStatusItemsShow, setIsTaskStatusItemsShow] = useState(false);

  const [subtaskId, setSubtaskId] = useState([]);

  const {
    error: editError,
    mutate: editTask,
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
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => {
        console.error("Error editing task:", error);
      },
    },
  );

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
    data: taskData,
    error: taskError,
    isError: isTaskError,
    isLoading: isTaskLoading,
  } = useQuery<TaskData>({
    queryKey: ["task", curTaskId],
    queryFn: async () =>
      await api.getTask(parsedUser.userID, curBoardId, curTaskId),
    onSuccess: (data) => {
      setTaskState(data);
    },
  });

  const {
    data: subtaskData,
    error: subtaskError,
    mutate: subtaskMutate,
    isError: subtaskIsError,
    isLoading: subtaskIsLoading,
  } = useMutation(
    ({
      userId,
      body,
    }: {
      userId: string;
      body: {
        subtask_id: string;
      };
    }) => api.changeSubtask(userId, body),
    {
      onSuccess: (data) => {
        console.log("subtask mutated successfully", data);
        setSubtaskId((prevState) => prevState?.filter((id) => id === data?.id));
        queryClient.invalidateQueries({ queryKey: ["task"] });
      },
      onError: (error) => {
        console.error("Error mutating subtask:", error);
      },
    },
  );

  const [taskState, setTaskState] = useState<TaskData>({
    title: "",
    subtasks: [],
    description: "",
    current_status: "",
    parent_board_id: "",
    completed_subtasks: "",
  });

  const handleConfirmClick = (status: string) => {
    const body = {
      title: taskState?.title,
      description: taskState?.description,
      current_status: status,
      parent_board_id: taskState?.parent_board_id || curBoardId,
      subtasks: taskState?.subtasks?.map((subtask) => subtask?.title),
    };
    editTask({ body, taskId: curTaskId, userId: parsedUser?.userID });
  };

  const handleOpenEditDeleteTaskBtns = (e: MouseEvent) => {
    setIsEditDeletBoardModal((prevState) => !prevState);
    setClickTarget(e.target as HTMLElement);
  };

  const handleEditTaskModal = () => {
    setIsEditDeletBoardModal(false);
    setIsModalOpen(true);
    setModalType(ModalTypes.EditTask);
  };

  const handleDeletTaskModal = () => {
    setIsEditDeletBoardModal(false);
    setIsModalOpen(true);
    setModalType(ModalTypes.DeleteTask);
  };

  const handleCheckboxChange = (id: string) => {
    setSubtaskId((prevState) => [...prevState, id]);
    subtaskMutate({
      userId: parsedUser?.userID,
      body: { subtask_id: id },
    });
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-start justify-between gap-4">
        <h1
          className={
            isTaskLoading
              ? "mb-2 h-6 w-20 animate-pulse rounded-lg bg-slate-600"
              : "max-h-20 overflow-scroll text-xl font-bold"
          }
        >
          {taskData?.title}
        </h1>
        {isTaskLoading ? (
          <span className="animate-pulse rounded-full bg-slate-600 p-2"></span>
        ) : (
          <button
            className="p-2"
            type="button"
            onClick={(e) => handleOpenEditDeleteTaskBtns(e)}
          >
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fillRule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </button>
        )}
      </div>
      <p
        className={
          isTaskLoading
            ? "h-6 w-full animate-pulse rounded-lg bg-slate-600"
            : "my-6 max-h-24 overflow-scroll break-words text-xs text-kanbanLightGrey md:max-h-52"
        }
      >
        {taskData?.description}
      </p>
      <span className="text-xs font-bold text-white">
        Subtasks ({taskData?.completed_subtasks} of {taskData?.subtasks?.length}
        )
      </span>
      <ul className="max-h-24 overflow-scroll md:max-h-52">
        {isTaskLoading ? (
          <>
            {Array?.from({ length: 3 })?.map((_) => (
              <li
                key={uuidv4()}
                className="my-2 flex animate-pulse flex-row items-center justify-start gap-2 rounded-md bg-kanbanLightGreyBG p-3 dark:bg-kanbanDarkGreyBG"
              >
                <span className="rounded-lg bg-slate-600 p-2"></span>
                <span className="w-3/4 rounded-lg bg-slate-600 p-2"></span>
              </li>
            ))}
          </>
        ) : (
          <>
            {taskData?.subtasks?.map((subtask) => (
              <li
                key={subtask?.id}
                onClick={() => handleCheckboxChange(subtask?.id)}
                className={`my-2 flex cursor-pointer flex-row items-center justify-start gap-2 rounded-md bg-kanbanLightGreyBG p-3 hover:bg-[#d8d7f1] dark:bg-kanbanDarkGreyBG dark:hover:bg-[#39395b]`}
              >
                <input
                  type="checkbox"
                  disabled={
                    subtaskId?.includes(subtask?.id) && subtaskIsLoading
                  }
                  checked={subtask?.completed}
                  onChange={() => handleCheckboxChange(subtask?.id)}
                  className="accent-kanbanPurpule focus:accent-kanbanPurpuleHover"
                />
                <span
                  className={`max-w-[26rem] overflow-scroll text-xs font-bold ${subtask?.completed ? "text-kanbanLightGrey line-through dark:text-kanbanLightGrey" : "dark:text-white"}`}
                >
                  {subtaskId?.includes(subtask?.id) && subtaskIsLoading
                    ? "loading..."
                    : subtask?.title}
                </span>
              </li>
            ))}
          </>
        )}
      </ul>

      <div className="relative my-6 flex flex-col gap-2">
        <span className="text-xs font-bold text-white">Current Status</span>
        {isColumnNamesLoading ? (
          <span className="w-full animate-pulse rounded-lg bg-slate-600 p-2"></span>
        ) : (
          <button
            type="button"
            className="flex items-center justify-between truncate rounded-md border border-kanbanLightGrey p-[0.44rem] text-left"
            onClick={() => setIsTaskStatusItemsShow((prevState) => !prevState)}
          >
            {taskState?.current_status}
            {isTaskStatusItemsShow ? (
              <svg
                className=""
                width="10"
                height="7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="#635FC7"
                  strokeWidth="2"
                  fill="none"
                  d="M9 6 5 2 1 6"
                />
              </svg>
            ) : (
              <svg
                className=""
                width="10"
                height="7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="#635FC7"
                  strokeWidth="2"
                  fill="none"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            )}
          </button>
        )}
        {isTaskStatusItemsShow && (
          <ul
            className={`absolute top-16 z-50 grid max-h-44 w-full gap-2 overflow-y-scroll rounded-md bg-white p-4 dark:bg-kanbanDarkGrey md:max-w-[26rem]`}
          >
            {columnNames?.map((column) => (
              <li className="" key={column?.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTaskState((prevState) => ({
                      ...prevState,
                      current_status: column?.column_name,
                    }));
                    setIsTaskStatusItemsShow(false);
                    handleConfirmClick(column?.column_name);
                  }}
                  className="h-max break-words rounded-md p-[0.44rem] px-4 text-left text-kanbanLightGrey hover:text-kanbanGrey dark:hover:text-kanbanLightGreyBG"
                >
                  {column?.column_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isEditDeletBoardModal && (
        <SubModal
          ref={subModalRef}
          firstTextBtn={"Edit Task"}
          secondTextBtn={"Delete Task"}
          handleEditModal={handleEditTaskModal}
          handleDeletModal={handleDeletTaskModal}
          setIsEditDeletBoardModal={setIsEditDeletBoardModal}
        />
      )}
    </div>
  );
}
