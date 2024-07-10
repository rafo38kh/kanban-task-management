import { useContext } from "react";
import { useQuery } from "react-query";

import api from "@/lib/api";

import { useAppContext } from "@/contexts/AppContextProvider";
import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import Card from "./Card";

import { BoardName, ColumnSchemaType, TaskData } from "@/types/SharedTypes";

type ColumnProps = {
  column: ColumnSchemaType;
};

export default function Column({ column }: ColumnProps) {
  const { curBoardId, setCurTaskId, setCurrentColumnId } = useAppContext();
  const { setIsModalOpen, setModalType } = useContext(ModalContext);

  const parsedUser = useGetUsersInfo();

  const {
    data: bordNameData,
    error: boardNameError,
    isError: isBoardNameError,
    isLoading: isBoardNameLoading,
  } = useQuery<BoardName[]>({
    queryKey: ["boardNames"],
    queryFn: async () => await api.getBoardNames(parsedUser!.userID),
  });

  const {
    data: tasksData,
    error: tasksError,
    isError: isTasksError,
    isLoading: isTasksLoading,
  } = useQuery<TaskData[]>({
    queryKey: ["tasks"],
    queryFn: async () => await api.getTasks(parsedUser.userID, curBoardId),
  });

  const filteredTaskData = tasksData?.filter(
    (task) => task?.current_status === column?.column_name,
  );

  return (
    <div className="flex h-[calc(100vh_-_100px)] w-full flex-col gap-8">
      {isTasksLoading || isBoardNameLoading ? (
        <>
          <div className="flex min-w-80 animate-pulse items-center justify-start gap-2 px-4 text-sm uppercase text-kanbanLightGrey">
            <span className="rounded-full bg-slate-600 p-2" />
            <span className="w-1/3 rounded-lg bg-slate-600 p-2" />
          </div>
          <ul className="flex h-full flex-col gap-4 overflow-y-scroll pt-0">
            {Array.from({ length: 6 }).map((_, idx) => (
              <li
                key={idx}
                className="flex w-[17.5rem] animate-pulse flex-col items-start justify-center gap-2 rounded-lg bg-kanbanVeryLightGrey p-4 transition-all duration-200 dark:bg-kanbanDarkGrey"
              >
                <span className="w-1/3 rounded-lg bg-slate-600 p-2" />
                <span className="w-1/2 rounded-full bg-slate-600 p-2" />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="flex min-w-[17.5rem] items-center justify-start gap-2 text-sm uppercase text-kanbanLightGrey">
            <span
              style={{ backgroundColor: column?.color }}
              className="rounded-full p-2"
            />
            <span className="tracking-widest">{column?.column_name}</span>
            <span>({filteredTaskData?.length})</span>
          </div>
          <ul className="overflow-y-scrollpt-0 flex h-full flex-col gap-4">
            {filteredTaskData?.length ? (
              filteredTaskData.map((cardItem) => (
                <Card
                  id={cardItem?.id}
                  key={cardItem?.id}
                  title={cardItem?.title}
                  subtaskCount={cardItem?.subtasks?.length}
                  completedSubtask={cardItem?.completed_subtasks}
                />
              ))
            ) : (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setCurTaskId(curBoardId);
                  setCurrentColumnId(column?.id);
                  setModalType(ModalTypes.NewTask);
                }}
                type="button"
                className="h-20 w-full rounded-lg bg-kanbanVeryLightGrey font-bold text-kanbanLightGrey transition-all duration-200 hover:text-kanbanPurpule dark:bg-[#23242f]"
              >
                + New Task
              </button>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
