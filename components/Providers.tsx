"use client";
import { ReactNode, useState } from "react";

import AuthContextProvider from "../contexts/AuthContextProvider";
import ModalContextProvider from "@/contexts/ModalContextProvider";
import { ThemeContextProvider } from "@/contexts/ThemeContextProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import AppContextProvider from "@/contexts/AppContextProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ThemeContextProvider>
          <ModalContextProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </ModalContextProvider>
        </ThemeContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}
