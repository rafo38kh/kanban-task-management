import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";

import Column from "./Column";
import { useContext } from "react";
import { useQuery } from "react-query";
import api from "@/lib/api";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { useAppContext } from "@/contexts/AppContextProvider";

export default function ColumnsList() {
  const { setIsModalOpen, setModalType } = useContext(ModalContext);
  const parsedUser = useGetUsersInfo();
  const { curBoardId } = useAppContext();

  const {
    data: columnsData,
    error: columnsError,
    isError: isColumnsError,
    isLoading: isColumnsLoading,
  } = useQuery({
    queryKey: ["columns", curBoardId],
    queryFn: async () => await api.getColumns(parsedUser.userID, curBoardId),
  });

  const handleAddNewBoard = () => {
    setIsModalOpen(true);
    setModalType(ModalTypes.EditBoard);
  };

  return (
    <ul className="relative flex h-screen w-[calc(100&_-_264px)] overflow-scroll p-4">
      {columnsData?.map((column, idx) => (
        <li key={idx} className="h-full">
          <Column column={column} />
        </li>
      ))}
      <li className="flex h-full w-[17.5rem] items-center justify-center pl-4">
        <button
          type="button"
          className="mt-auto h-[calc(100%_-_3.5rem)] w-[17.5rem] rounded-lg bg-kanbanVeryLightGrey font-bold text-kanbanLightGrey transition-all duration-200 hover:text-kanbanPurpule dark:bg-[#23242f]"
          onClick={handleAddNewBoard}
        >
          + New Column
        </button>
      </li>
    </ul>
  );
}
