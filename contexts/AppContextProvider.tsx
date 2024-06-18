"use client";
import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

type AppContextProviderProps = {
  children: ReactNode;
};

type AppContext = {
  curBoardId: string;
  setCurBoardId: Dispatch<SetStateAction<string>>;
  curTaskId: string;
  setCurTaskId: Dispatch<SetStateAction<string>>;
};

const initialContext: AppContext = {
  curBoardId: null,
  setCurBoardId: () => {},
  curTaskId: null,
  setCurTaskId: () => {},
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
  const [curBoardId, setCurBoardId] = useState("");
  const [curTaskId, setCurTaskId] = useState("");

  const value: AppContext = {
    curBoardId,
    setCurBoardId,
    curTaskId,
    setCurTaskId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
