import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import api from "@/lib/api";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import { Subtask } from "@/types/SharedTypes";

type SubtaskProps = {
  subtask: Subtask;
};

export default function EachSubtask({ subtask }: SubtaskProps) {
  const [subtaskId, setSubtaskId] = useState([]);

  const queryClient = useQueryClient();
  const parsedUser = useGetUsersInfo();

  const {
    data: subtaskData,
    error: subtaskError,
    mutate: subtaskMutate,
    isError: subtaskIsError,
    isLoading: subtaskIsLoading,
  } = useMutation(
    ({ userId, body }: { userId: string; body: { subtask_id: string } }) =>
      api.changeSubtask(userId, body),
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

  const handleCheckboxChange = (id: string) => {
    setSubtaskId((prevState) => [...prevState, id]);
    subtaskMutate({
      userId: parsedUser?.userID,
      body: { subtask_id: id },
    });
  };

  return (
    <li
      key={subtask?.id}
      onClick={() => handleCheckboxChange(subtask?.id)}
      className={`my-2 flex cursor-pointer flex-row items-center justify-start gap-2 rounded-md bg-kanbanLightGreyBG p-3 hover:bg-[#d8d7f1] dark:bg-kanbanDarkGreyBG dark:hover:bg-[#39395b]`}
    >
      <input
        type="checkbox"
        checked={subtask?.completed}
        onChange={() => handleCheckboxChange(subtask?.id)}
        disabled={subtaskId?.includes(subtask?.id) && subtaskIsLoading}
        className="accent-kanbanPurpule focus:accent-kanbanPurpuleHover"
      />
      <span
        className={`max-w-[26rem] overflow-scroll text-xs font-bold ${
          subtask?.completed
            ? "text-kanbanLightGrey line-through dark:text-kanbanLightGrey"
            : "dark:text-white"
        }`}
      >
        {subtaskId?.includes(subtask?.id) && subtaskIsLoading
          ? "loading..."
          : subtask?.title}
      </span>
    </li>
  );
}
