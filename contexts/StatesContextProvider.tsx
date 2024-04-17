"use client";
import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

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
});

type StatesContextProvider = { children: ReactNode | ReactNode[] };

const StatesContextProvider = ({ children }: StatesContextProvider) => {
  const [isEditDeleteBtns, setIsEditDeleteBtns] = useState(false);
  const [isSideBarshow, setIsSideBarShow] = useState(false);
  const [isAddNewBoardModalOpen, setIsAddNewBoardModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
  const [isDeletTaskModalOpen, setIsDeletTaskModalOpen] = useState(false);
  const [isMainChangesModalOpen, setIsMainChangesModalOpen] = useState(false);

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
    ],
  );
  return (
    <StatesContext.Provider value={value}> {children} </StatesContext.Provider>
  );
};

export default StatesContextProvider;
