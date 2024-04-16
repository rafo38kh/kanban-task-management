"use client";
import { ReactNode } from "react";
import { ThemeContextProvider } from "@/contexts/ThemeContextProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
