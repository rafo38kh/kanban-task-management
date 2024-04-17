"use client";
import {
  useState,
  useMemo,
  Dispatch,
  ReactNode,
  createContext,
  SetStateAction,
} from "react";

enum ModalTypes {
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

type StatesContext = {
  isEditDeleteBtns: boolean;
  setIsEditDeleteBtns: Dispatch<SetStateAction<boolean>>;
  isSideBarshow: boolean;
  setIsSideBarShow: Dispatch<SetStateAction<boolean>>;
  isAddNewBoardModalOpen: boolean;
  setIsAddNewBoardModalOpen: Dispatch<SetStateAction<boolean>>;
  isEditTaskModalOpen: boolean;
  setIsEditTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  isAddNewTaskModalOpen: boolean;
  setIsAddNewTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  isDeletTaskModalOpen: boolean;
  setIsDeletTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  isMainChangesModalOpen: boolean;
  setIsMainChangesModalOpen: Dispatch<SetStateAction<boolean>>;
  isEditBoardModalOpen: boolean;
  setIsEditBoardModalOpen: Dispatch<SetStateAction<boolean>>;
  isEditDeletBoardModal: boolean;
  setIsEditDeletBoardModal: Dispatch<SetStateAction<boolean>>;
  isDeletBoardModalOpen: boolean;
  setIsDeletBoardModalOpen: Dispatch<SetStateAction<boolean>>;
  subModalCordinats: HTMLElement | null;
  setSubModalCordinats: Dispatch<SetStateAction<HTMLElement | null>>;
};

export const StatesContext = createContext<StatesContext>({
  isEditDeleteBtns: false,
  setIsEditDeleteBtns: () => {},
  isSideBarshow: false,
  setIsSideBarShow: () => {},
  isAddNewBoardModalOpen: false,
  setIsAddNewBoardModalOpen: () => {},
  isEditTaskModalOpen: false,
  setIsEditTaskModalOpen: () => {},
  isAddNewTaskModalOpen: false,
  setIsAddNewTaskModalOpen: () => {},
  isDeletTaskModalOpen: false,
  setIsDeletTaskModalOpen: () => {},
  isMainChangesModalOpen: false,
  setIsMainChangesModalOpen: () => {},
  isEditBoardModalOpen: false,
  setIsEditBoardModalOpen: () => {},
  isEditDeletBoardModal: false,
  setIsEditDeletBoardModal: () => {},
  isDeletBoardModalOpen: false,
  setIsDeletBoardModalOpen: () => {},
  subModalCordinats: null,
  setSubModalCordinats: () => {},
});

type StatesContextProvider = { children: ReactNode | ReactNode[] };

const StatesContextProvider = ({ children }: StatesContextProvider) => {
  const [isEditDeleteBtns, setIsEditDeleteBtns] = useState(false);
  const [isSideBarshow, setIsSideBarShow] = useState(false);
  const [isAddNewBoardModalOpen, setIsAddNewBoardModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
  const [isDeletTaskModalOpen, setIsDeletTaskModalOpen] = useState(false);
  const [isEditDeletBoardModal, setIsEditDeletBoardModal] = useState(false);
  const [isDeletBoardModalOpen, setIsDeletBoardModalOpen] = useState(false);
  const [isMainChangesModalOpen, setIsMainChangesModalOpen] = useState(true);
  const [subModalCordinats, setSubModalCordinats] =
    useState<HTMLElement | null>(null);

  const value = useMemo(
    () => ({
      isEditDeleteBtns,
      setIsEditDeleteBtns,
      isSideBarshow,
      setIsSideBarShow,
      isAddNewBoardModalOpen,
      setIsAddNewBoardModalOpen,
      isEditTaskModalOpen,
      setIsEditTaskModalOpen,
      isAddNewTaskModalOpen,
      setIsAddNewTaskModalOpen,
      isDeletTaskModalOpen,
      setIsDeletTaskModalOpen,
      isMainChangesModalOpen,
      setIsMainChangesModalOpen,
      isEditBoardModalOpen,
      setIsEditBoardModalOpen,
      isEditDeletBoardModal,
      setIsEditDeletBoardModal,
      isDeletBoardModalOpen,
      setIsDeletBoardModalOpen,
      subModalCordinats,
      setSubModalCordinats,
    }),
    [
      isEditDeleteBtns,
      setIsEditDeleteBtns,
      isSideBarshow,
      setIsSideBarShow,
      isAddNewBoardModalOpen,
      setIsAddNewBoardModalOpen,
      isEditTaskModalOpen,
      setIsEditTaskModalOpen,
      isAddNewTaskModalOpen,
      setIsAddNewTaskModalOpen,
      isDeletTaskModalOpen,
      setIsDeletTaskModalOpen,
      isMainChangesModalOpen,
      setIsMainChangesModalOpen,
      isEditBoardModalOpen,
      setIsEditBoardModalOpen,
      isEditDeletBoardModal,
      setIsEditDeletBoardModal,
      isDeletBoardModalOpen,
      setIsDeletBoardModalOpen,
      subModalCordinats,
      setSubModalCordinats,
    ],
  );
  return (
    <StatesContext.Provider value={value}> {children} </StatesContext.Provider>
  );
};

export default StatesContextProvider;
