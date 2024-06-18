"use client";
import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContextProvider";
import { ModalContext } from "@/contexts/ModalContextProvider";

import SignIn from "./SignIn";
import ColumnsList from "./ColumnsList";
import ModalWrapper from "./Modals/ModalWrapper";
import { useQuery, useQueryClient } from "react-query";
import { BoardName } from "@/types/SharedTypes";
import api from "@/lib/api";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { useAppContext } from "@/contexts/AppContextProvider";

type MainBoardProps = {};

export default function MainBoard({}: MainBoardProps) {
  const { isAuth } = useContext(AuthContext);
  const { setCurBoardId } = useAppContext();
  const { isModalOpen, getModalContent, setIsModalOpen } =
    useContext(ModalContext);

  const parsedUser = useGetUsersInfo();
  const queryClient = useQueryClient();

  const {
    data: boardNameData,
    error: boardNameError,
    isError: isBoardNameError,
    isLoading: isBoardNameLoading,
  } = useQuery<BoardName[]>({
    queryKey: ["boardNames"],
    queryFn: async () => await api.getBoardNames(parsedUser!.userID),
    onSuccess: (data) => {
      console.log("Board fetched successfully", data);

      setCurBoardId(data?.at(0)?.id);
    },
  });

  return (
    <>
      {isAuth ? (
        <>
          <ColumnsList />
          <ModalWrapper isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
            {getModalContent()}
          </ModalWrapper>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}
