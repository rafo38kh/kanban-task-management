"use client";
import { ReactNode } from "react";
import ModalContextProvider from "@/contexts/ModalContextProvider";
import { ThemeContextProvider } from "@/contexts/ThemeContextProvider";
import AuthContextProvider from "../contexts/AuthContextProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeContextProvider>
      <ModalContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ModalContextProvider>
    </ThemeContextProvider>
  );
}
