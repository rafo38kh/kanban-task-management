"use client";
import {
  useMemo,
  Dispatch,
  useState,
  ReactNode,
  createContext,
  SetStateAction,
  useLayoutEffect,
} from "react";

import MainChanges from "@/components/Modals/MainChanges";
import NewAndEditTask from "@/components/Modals/NewAndEditTask";
import NewAndEditBoard from "@/components/Modals/NewAndEditBoard";
import DeletBoardAndTask, {
  ModalBoardDeleteType,
} from "@/components/Modals/DeletBoardAndTask";

export enum ModalTypes {
  Main = "main_modal",
  NewTask = "new_task",
  SubTask = "sub_task",
  SubBoard = "sub_board",
  EditTask = "edit_task",
  NewBoard = "new_board",
  EditBoard = "edit_board",
  DeleteTask = "delete_task",
  DeleteBoard = "delete_board",
}

type ModalContext = {
  isSideBarshow: boolean;
  setIsSideBarShow: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  modalType: ModalTypes | null;
  setModalType: Dispatch<SetStateAction<ModalTypes | null>>;
  clickTarget: HTMLElement | null;
  setClickTarget: Dispatch<SetStateAction<HTMLElement | null>>;
  getModalContent: () => JSX.Element | null;
};

export const ModalContext = createContext<ModalContext>({
  isSideBarshow: false,
  setIsSideBarShow: () => {},
  modalType: null,
  isModalOpen: false,
  setModalType: () => {},
  clickTarget: null,
  setIsModalOpen: () => {},
  setClickTarget: () => {},
  getModalContent: () => null,
});

type ModalContextProvider = { children: ReactNode | ReactNode[] };

const ModalContextProvider = ({ children }: ModalContextProvider) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideBarshow, setIsSideBarShow] = useState(false);
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const [clickTarget, setClickTarget] = useState<HTMLElement | null>(null);

  const getModalContent = () => {
    switch (modalType) {
      case ModalTypes.Main:
        return <MainChanges />;
      case ModalTypes.NewTask:
        return <NewAndEditTask isEdit={false} boardTitle={"Add New Task"} />;
      case ModalTypes.EditTask:
        return <NewAndEditTask isEdit={true} boardTitle={"Edit Task"} />;
      case ModalTypes.NewBoard:
        return (
          <NewAndEditBoard
            isEdit={false}
            boardTitle={"Add New Board"}
            boardBtnText="Create New Board"
          />
        );
      case ModalTypes.EditBoard:
        return (
          <NewAndEditBoard
            isEdit={true}
            boardTitle={"Edit Board"}
            boardBtnText="Save Changes"
          />
        );
      case ModalTypes.DeleteTask:
        return <DeletBoardAndTask type={ModalBoardDeleteType.task} />;
      case ModalTypes.DeleteBoard:
        return <DeletBoardAndTask type={ModalBoardDeleteType.board} />;
      default:
        return null;
    }
  };

  const value = useMemo(
    () => ({
      isSideBarshow,
      setIsSideBarShow,
      modalType,
      isModalOpen,
      setModalType,
      setIsModalOpen,
      clickTarget,
      setClickTarget,
      getModalContent,
    }),
    [
      isSideBarshow,
      setIsSideBarShow,
      modalType,
      isModalOpen,
      setModalType,
      setIsModalOpen,
      clickTarget,
      setClickTarget,
      getModalContent,
    ],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
