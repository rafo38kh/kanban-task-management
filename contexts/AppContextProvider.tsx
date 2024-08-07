"use client";
import {
  Dispatch,
  useState,
  ReactNode,
  useContext,
  createContext,
  SetStateAction,
} from "react";

type AppContextProviderProps = {
  children: ReactNode;
};

type AppContext = {
  curBoardId: string;
  setCurBoardId: Dispatch<SetStateAction<string>>;
  curTaskId: string;
  setCurTaskId: Dispatch<SetStateAction<string>>;
  currentColumnId: string;
  setCurrentColumnId: Dispatch<SetStateAction<string>>;
};

const initialContext: AppContext = {
  curBoardId: null,
  setCurBoardId: () => {},
  curTaskId: null,
  setCurTaskId: () => {},
  currentColumnId: null,
  setCurrentColumnId: () => {},
};

const AppContext = createContext(initialContext);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a MyProvider");
  }

  return context;
};

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [curTaskId, setCurTaskId] = useState("");
  const [curBoardId, setCurBoardId] = useState("");
  const [currentColumnId, setCurrentColumnId] = useState("");

  const value: AppContext = {
    curTaskId,
    curBoardId,
    setCurTaskId,
    setCurBoardId,
    currentColumnId,
    setCurrentColumnId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
