"use client";

import { ThemeProvider } from "next-themes";

export function ThemeContextProvider({ children }: any) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
