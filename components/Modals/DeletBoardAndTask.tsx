"use client";

import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";

import api from "@/lib/api";

import { useAppContext } from "@/contexts/AppContextProvider";
import { ModalContext } from "@/contexts/ModalContextProvider";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import Button from "../Button";

export enum ModalBoardDeleteType {
  board = "board",
  task = "task",
}

type ModalBoardInformationProps = {
  type: ModalBoardDeleteType;
};

export default function DeletBoardAndTask({
  type,
}: ModalBoardInformationProps) {
  const parsedUser = useGetUsersInfo();
  const { setIsModalOpen } = useContext(ModalContext);
  const { curBoardId, curTaskId } = useAppContext();

  const queryClient = useQueryClient();

  const { mutate: deleteBoardMutation } = useMutation(
    ({ userId, boardId }: { userId: string; boardId: string }) =>
      api.deleteBoard(userId, boardId!),
    {
      onSuccess: () => {
        setIsModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["boardNames"] });
      },
      onError: (error) => {
        console.error(
          `Error deleting ${type === ModalBoardDeleteType.board ? "board" : "task"}:`,
          error,
        );
      },
    },
  );

  const { mutate: deleteTaskMutation } = useMutation(
    ({ userId, taskId }: { userId: string; taskId: string }) =>
      api.deleteTask(userId, taskId!),
    {
      onSuccess: () => {
        console.log("Task deleted successfully");
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.error(
          `Error deleting ${type === ModalBoardDeleteType.board ? "board" : "task"}:`,
          error,
        );
      },
    },
  );

  const boardTitle =
    type === ModalBoardDeleteType.task
      ? "Delete this task?"
      : "Delete this board?";

  return (
    <>
      <h1 className="text-xl font-bold text-kanbanRed">{boardTitle}</h1>
      <p className="my-6 text-xs font-bold text-kanbanLightGrey">
        Are you sure you want to delete the{" "}
        {type === ModalBoardDeleteType.task ? "task" : "board"}? This action
        cannot be reversed.
      </p>
      <Button
        disabled={false}
        text={"Delete"}
        styles={
          "bg-kanbanRed text-kanbanVeryLightGrey hover:bg-kanbanRedHover transition-all duration-200 mb-8"
        }
        onClick={() => {
          type === ModalBoardDeleteType.board
            ? deleteBoardMutation({
                userId: parsedUser!.userID,
                boardId: curBoardId,
              })
            : deleteTaskMutation({
                userId: parsedUser!.userID,
                taskId: curTaskId,
              });
        }}
      />
      <Button
        disabled={false}
        text={"Cancel"}
        styles={
          "bg-kanbanVeryLightGrey text-kanbanPurpule hover:bg-white transition-all duration-200 dark:hover:bg-kanbanLightGreyBG"
        }
        onClick={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
