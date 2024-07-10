import { useContext } from "react";
import { useQuery } from "react-query";

import api from "@/lib/api";

import { useAppContext } from "@/contexts/AppContextProvider";
import { ModalContext, ModalTypes } from "@/contexts/ModalContextProvider";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import Column from "./Column";

import { ColumnSchemaType } from "@/types/SharedTypes";

export default function ColumnsList() {
  const { setIsModalOpen, setModalType } = useContext(ModalContext);

  const parsedUser = useGetUsersInfo();
  const { curBoardId } = useAppContext();

  const {
    data: columnsData,
    error: columnsError,
    isError: isColumnsError,
    isLoading: isColumnsLoading,
  } = useQuery<ColumnSchemaType[]>({
    queryKey: ["columns", curBoardId],
    queryFn: async () => await api.getColumns(parsedUser.userID, curBoardId),
    enabled: !!curBoardId,
  });

  const handleAddNewBoard = () => {
    setIsModalOpen(true);
    setModalType(ModalTypes.EditBoard);
  };

  return (
    <ul className="relative flex h-screen w-full gap-4 overflow-scroll p-4">
      {columnsData?.map((column) => (
        <li key={column?.id} className="h-full max-w-[17.5rem]">
          <Column column={column} />
        </li>
      ))}

      <li className="flex h-full w-[17.5rem] items-center justify-center">
        <button
          type="button"
          className="mt-auto h-[calc(100%_-_3.3rem)] w-[17.5rem] rounded-lg bg-kanbanVeryLightGrey font-bold text-kanbanLightGrey transition-all duration-200 hover:text-kanbanPurpule dark:bg-[#23242f]"
          onClick={handleAddNewBoard}
        >
          + New Column
        </button>
      </li>
    </ul>
  );
}
