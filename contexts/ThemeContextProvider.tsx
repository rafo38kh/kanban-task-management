"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type ThemeContextProviderProps = { children: ReactNode };

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
