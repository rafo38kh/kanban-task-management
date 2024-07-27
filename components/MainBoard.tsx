"use client";
import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContextProvider";
import { ModalContext } from "@/contexts/ModalContextProvider";

import SignIn from "./SignIn";
import ColumnsList from "./ColumnsList";
import ModalWrapper from "./Modals/ModalWrapper";
import { useQuery } from "react-query";
import { BoardName } from "@/types/SharedTypes";
import api from "@/lib/api";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import MainBoardLoading from "./MainBoardLoading";

type MainBoardProps = {};

export default function MainBoard({}: MainBoardProps) {
  const { isAuth } = useContext(AuthContext);
  const { isModalOpen, getModalContent, setIsModalOpen } =
    useContext(ModalContext);

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

  return (
    <div className="h-full overflow-hidden overflow-x-auto">
      {isAuth ? (
        <>
          {isBoardNameLoading ? <MainBoardLoading /> : <ColumnsList />}
          <ModalWrapper isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
            {getModalContent()}
          </ModalWrapper>
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
