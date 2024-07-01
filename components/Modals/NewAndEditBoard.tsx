"use client";

import { ChangeEvent, useContext, useState } from "react";
import Button from "../Button";
import { ModalContext } from "@/contexts/ModalContextProvider";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "@/lib/api";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { useAppContext } from "@/contexts/AppContextProvider";
import { BoardName } from "@/types/SharedTypes";

type Column = {
  id: string;
  color: string;
  column_name: string;
  parent_board_id: string;
};

type BoardData = {
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
  const { curBoardId, setCurBoardId } = useAppContext();

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
    error,
    isError,
    isLoading,
    mutate: postBoard,
    data: postBoardData,
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
        setIsModalOpen(false);
        setCurBoardId("");
        queryClient.invalidateQueries({ queryKey: ["board"] });
      },
      onError: (error) => {
        console.error("Error editing board:", error);
      },
    },
  );

  console.log(editBoardData, "editBoardData");

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
              color: "green",
              column_name: "column 2",
              parent_board_id: "",
            },
          ],
        },
  );

  console.log(boardData?.boardColumns, "boardData?.boardColumns");

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
          id: isEdit
            ? ""
            : (prevState?.boardColumns?.at(-1)?.id + 1 || 1)?.toString(),
          color: "",
          column_name: "",
          parent_board_id: curBoardId,
          // user_id: parsedUser!.userID,
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
          <li
            key={column?.id}
            className="mb-5 mt-2 flex flex-row items-center justify-between gap-4"
          >
            <input
              value={column?.column_name}
              className="w-full rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
              type="text"
              placeholder="e.g. Make coffee"
              onChange={(e) => {
                const updatedBoardColumn = boardData?.boardColumns?.map(
                  (item) =>
                    item.id === column.id
                      ? { ...item, column_name: e.target.value }
                      : item,
                );
                setBoardData((prevState) => ({
                  ...prevState,
                  boardColumns: updatedBoardColumn,
                }));
              }}
            />
            <button
              type="button"
              onClick={() => {
                handleDeletColumn(column?.id);
              }}
            >
              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
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
        disabled={false}
        text={"+ Add New Column"}
        onClick={handleAddNewColumn}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule transition-all duration-200 hover:bg-kanbanLightGreyBG mt-4 mb-8"
        }
      />
      <span className="h-6 w-full"></span>
      <Button
        disabled={boardData?.boardName?.length === 0 || !isColumnNameEmpty}
        text={boardBtnText}
        // styles={
        //   "bg-kanbanPurpule hover:bg-kanbanPurpuleHover transition-all duration-200 text-kanbanVeryLightGrey"
        // }
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
                  // columns: [
                  //   {
                  //     id: "1",
                  //     color: "red",
                  //     column_name: "test edit",
                  //     parent_board_id: curBoardId,
                  //   },
                  // ],
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
