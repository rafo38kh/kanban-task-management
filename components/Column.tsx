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
    <>
      <div className="mb-4 flex min-w-[17.5rem] items-center justify-start gap-2 text-sm uppercase text-kanbanLightGrey">
        <span
          style={{ backgroundColor: column?.color }}
          className="rounded-full p-2"
        />
        <span className="truncate tracking-widest">{column?.column_name}</span>
        <span>({filteredTaskData?.length})</span>
      </div>
      <ul className="flex h-full flex-col gap-4 overflow-y-scroll pt-0">
        {filteredTaskData?.length ? (
          filteredTaskData.map((cardItem) => (
            <Card
              color={column?.color}
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
  );
}
