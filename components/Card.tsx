"use client";

import { useContext } from "react";
import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";
import { useAppContext } from "@/contexts/AppContextProvider";
import { useQuery } from "react-query";
import api from "@/lib/api";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { TaskData } from "@/types/SharedTypes";

type CardProps = {
  id: string;
};

export default function Card({ id }: CardProps) {
  const { setIsModalOpen, setModalType } = useContext(ModalContext);
  const { curBoardId, setCurBoardId } = useAppContext();
  const parsedUser = useGetUsersInfo();
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

  return (
    <button
      type="button"
      onClick={() => {
        // setCurBoardId(id);
        setIsModalOpen(true);
        setModalType(ModalTypes.Main);
      }}
      className="flex w-[17.5rem] flex-col items-start justify-center  gap-2 rounded-lg bg-white p-4 transition-all duration-200 hover:bg-kanbanVeryLightGrey dark:bg-kanbanGrey dark:hover:bg-kanbanDarkGrey"
    >
      {/* TODO: Fix this and add actual data */}
      <h1 className="font-bold text-black dark:text-white">
        Build UI for onboarding flow
      </h1>
      <span className="text-xs font-bold text-kanbanLightGrey">
        0 of 3 substasks
      </span>
    </button>
  );
}
