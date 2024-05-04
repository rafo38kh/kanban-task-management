"use client";
import { ReactNode } from "react";

import AuthContextProvider from "../contexts/AuthContextProvider";
import ModalContextProvider from "@/contexts/ModalContextProvider";
import { ThemeContextProvider } from "@/contexts/ThemeContextProvider";

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
