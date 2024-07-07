"use client";

import { ChangeEvent, useContext, useState } from "react";
import Button from "../Button";
import { ModalContext } from "@/contexts/ModalContextProvider";

import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "@/lib/api";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { useAppContext } from "@/contexts/AppContextProvider";
import { BoardName } from "@/types/SharedTypes";
import ColumnInput from "../ColumnInput";
import { v4 as uuidv4 } from "uuid";
import { colorGenerator } from "@/hepler_functions/ColorGenerator";

export type Column = {
  id: string;
  color: string;
  column_name: string;
  parent_board_id: string;
};

export type BoardData = {
  boardName: string;
  boardColumns: Column[];
};

type ModalBoardInformationProps = {
  isEdit: boolean;
  boardTitle: string;
  boardBtnText: string;
};

export default function NewAndEditBoard({
  isEdit,
  boardTitle,
  boardBtnText,
}: ModalBoardInformationProps) {
  const { curBoardId, setCurBoardId, setCurTaskId } = useAppContext();

  const { setIsModalOpen } = useContext(ModalContext);

  const queryClient = useQueryClient();

  const parsedUser = useGetUsersInfo();

  const {
    data: columnsData,
    error: columnsError,
    isError: isColumnsError,
    isLoading: isColumnsLoading,
  } = useQuery({
    queryKey: ["columns", curBoardId],
    queryFn: async () => await api.getColumns(parsedUser.userID, curBoardId),
  });

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
    mutate: postBoard,
    data: postBoardData,
    error: postBoardError,
    isError: postBoardIsError,
    isLoading: postBoardIsLoading,
  } = useMutation(
    ({
      userId,
      boardName,
      columns,
    }: {
      userId: string;
      boardName: string;
      columns?: { color: string; column_name: string }[];
    }) => api.postBoard(userId, boardName, columns),
    {
      onSuccess: (data) => {
        console.log("Board created successfully", data);
        setIsModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["board"] });

        setCurBoardId(data?.data?.newBoard?.id);
      },
      onError: (error) => {
        console.error("Error creating board:", error);
      },
    },
  );

  const {
    mutate: editBoard,
    data: editBoardData,
    isError: isEditBoard,
    error: errorEditBoard,
    isLoading: isLoadingEditBoard,
  } = useMutation(
    ({
      userId,
      boardId,
      body,
    }: {
      userId: string;
      boardId: string;
      body?: {
        board_name: string;
        columns: Column[];
      };
    }) => api.editBoard(userId, boardId, body),
    {
      onSuccess: (data) => {
        console.log("Board edited successfully", data);
        setCurTaskId("");
        setIsModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["columns"] });
      },
      onError: (error) => {
        console.error("Error editing board:", error);
      },
    },
  );

  const [boardData, setBoardData] = useState<BoardData>(
    isEdit
      ? {
          boardName: bordNameData?.find((board) => board?.id === curBoardId)
            ?.name,
          boardColumns: columnsData,
        }
      : {
          boardName: "",
          boardColumns: [
            {
              id: "1",
              color: "red",
              column_name: "column 1",
              parent_board_id: "",
            },
            {
              id: "2",
              color: "purple",
              column_name: "column 2",
              parent_board_id: "",
            },
          ],
        },
  );

  console.log("boardData", boardData);

  const isColumnNameEmpty = boardData?.boardColumns?.every(
    (names) => names?.column_name !== "",
  );

  const handleChange = (
    key: keyof BoardData,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setBoardData({
      ...boardData,
      [key]: e.target.value,
    });
  };

  const handleAddNewColumn = () => {
    setBoardData((prevState) => ({
      ...prevState,
      boardColumns: [
        ...prevState?.boardColumns,
        {
          id: uuidv4(),
          color: colorGenerator(),
          column_name: "",
          parent_board_id: curBoardId,
          user_id: parsedUser!.userID,
        },
      ],
    }));
  };

  const handleDeletColumn = (id: string) => {
    setBoardData((prevState) => ({
      ...prevState,
      boardColumns: [...prevState?.boardColumns.filter((el) => el.id !== id)],
    }));
  };

  const handleInputOnChange = (e, column: Column) => {
    const updatedBoardColumn = boardData?.boardColumns?.map((item) =>
      item.id === column.id ? { ...item, column_name: e.target.value } : item,
    );
    setBoardData((prevState) => ({
      ...prevState,
      boardColumns: updatedBoardColumn,
    }));
  };

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{boardTitle}</h1>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-bold">Title</span>
        <input
          value={boardData?.boardName}
          className="mt-2 rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
          type="text"
          placeholder="e.g. Web Design"
          onChange={(e) => handleChange("boardName", e)}
        />
      </div>
      <span className="text-xs font-bold">Board Columns</span>
      <ul className="max-h-64 overflow-y-scroll pr-4">
        {boardData?.boardColumns?.map((column) => (
          <ColumnInput
            column={column}
            boardData={boardData}
            setBoardData={setBoardData}
            handleDeletColumn={handleDeletColumn}
            handleInputOnChange={handleInputOnChange}
          />
        ))}
      </ul>
      <Button
        isLoading={isEdit ? isEditBoard : postBoardIsLoading}
        disabled={false}
        text={"+ Add New Column"}
        onClick={handleAddNewColumn}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule transition-all duration-200 hover:bg-kanbanLightGreyBG mt-4 mb-8"
        }
      />
      <span className="h-6 w-full"></span>
      <Button
        isLoading={isEdit ? isEditBoard : postBoardIsLoading}
        disabled={boardData?.boardName?.length === 0 || !isColumnNameEmpty}
        text={boardBtnText}
        styles={
          "bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200 text-kanbanVeryLightGrey disabled:pointer-events-none disabled:opacity-50"
        }
        onClick={() => {
          isEdit
            ? editBoard({
                userId: parsedUser!.userID,
                boardId: curBoardId,
                body: {
                  board_name: boardData?.boardName,
                  columns: boardData?.boardColumns,
                },
              })
            : postBoard({
                userId: parsedUser!.userID,
                boardName: boardData?.boardName,
                columns: boardData?.boardColumns,
              });
        }}
      />
    </>
  );
}
