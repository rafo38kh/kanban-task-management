"use client";
import Image from "next/image";
import { useContext, useRef } from "react";
import { useQuery } from "react-query";
import { createPortal } from "react-dom";

import api from "@/lib/api";

import { AuthContext } from "@/contexts/AuthContextProvider";
import { useAppContext } from "@/contexts/AppContextProvider";
import { ModalContext, ModalTypes } from "../contexts/ModalContextProvider";

import useClickOutside from "@/hooks/useClickOutside";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import SwitchTheme from "./SwitchTheme";

import { BoardName } from "@/types/SharedTypes";

export default function MobileNavigation() {
  const mobileMenuRef = useRef(null);

  const { setCurBoardId } = useAppContext();
  const { isAuth, logOut } = useContext(AuthContext);

  const parsedUser = useGetUsersInfo();

  const { setIsModalOpen, setModalType, setIsSideBarShow } =
    useContext(ModalContext);

  const {
    data: bordNameData,
    error: boardNameError,
    isError: isBoardNameError,
    isLoading: isBoardNameLoading,
  } = useQuery<BoardName[]>({
    queryKey: ["boardNames"],
    queryFn: async () => await api.getBoardNames(parsedUser!.userID),
  });

  useClickOutside(mobileMenuRef, () => setIsSideBarShow(false));

  const handleAddNewBoard = () => {
    setIsSideBarShow(false);
    setIsModalOpen(true);
    setModalType(ModalTypes.NewBoard);
  };

  return createPortal(
    <div
      ref={mobileMenuRef}
      className="fixed left-1/2 top-32 z-50 flex w-full max-w-[90%] -translate-x-1/2 flex-col items-center gap-4 rounded-lg bg-white p-6 dark:bg-kanbanGrey"
    >
      <div className="w-full">
        <div className="flex items-center justify-start gap-2 font-bold tracking-widest text-kanbanLightGrey">
          <span className="uppercase">All boards</span>
          <span>({bordNameData?.length})</span>
        </div>
        {isAuth && (
          <ul className="h-full max-h-36 w-full overflow-scroll">
            {bordNameData?.map((board) => (
              <button
                onClick={() => setCurBoardId(board?.id)}
                type="button"
                key={board?.id}
                className="h-full w-full rounded-r-full py-3"
              >
                <li className="flex flex-row items-center justify-start gap-2">
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                      fill="#828FA3"
                    />
                  </svg>
                  <span className="text-kanbanLightGrey">{board?.name}</span>
                </li>
              </button>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleAddNewBoard}
        type="button"
        className="mr-auto flex items-center gap-2 text-kanbanPurpule"
      >
        <svg
          className="stroke-kanbanPurpule"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
        </svg>
        + Create New Board
      </button>

      <div className="mt-6 flex w-full items-center justify-between rounded-lg bg-kanbanVeryLightGrey p-4 py-2 dark:bg-kanbanDarkGreyBG md:hidden">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="aspect-square w-8 overflow-hidden rounded-full lg:flex">
            {parsedUser?.profilePhoto && (
              <Image
                height={100}
                width={100}
                alt="Picture of the author"
                src={parsedUser?.profilePhoto}
              />
            )}
          </div>
          <span>{parsedUser?.name}</span>
        </div>
        <button
          onClick={logOut}
          className="flex items-center justify-center gap-2 whitespace-nowrap stroke-kanbanLightGrey text-xs text-kanbanLightGrey transition-all duration-200 hover:stroke-black dark:hover:stroke-white"
        >
          Logout
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H15"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M19 12L15 8M19 12L15 16M19 12H9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      <div className="w-full rounded-lg bg-kanbanVeryLightGrey px-6 py-2 text-center dark:bg-kanbanDarkGreyBG">
        <SwitchTheme />
      </div>
    </div>,
    document.body,
  );
}
