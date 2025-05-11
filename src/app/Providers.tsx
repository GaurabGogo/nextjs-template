"use client";

import React, { ReactNode } from "react";
import { store, persistor } from "../redux/store";
import { Provider as ReduxProvider } from "react-redux";
import ErrorBoundary from "../components/pages/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import NProgressHandler from "./NProgressHandler";
import { PersistGate } from "redux-persist/integration/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeDataProvider from "@/context/theme-data-provider";
import ThemeProvider from "./ThemeProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <HeroUIProvider>
        <ToastContainer />
        <NProgressHandler />
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NuqsAdapter>
              <QueryClientProvider client={queryClient}>
                <AntdRegistry>
                  <NextThemesProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <ThemeDataProvider>
                      <ThemeProvider>{children}</ThemeProvider>
                    </ThemeDataProvider>
                  </NextThemesProvider>
                </AntdRegistry>
              </QueryClientProvider>
            </NuqsAdapter>
          </PersistGate>
        </ReduxProvider>
      </HeroUIProvider>
    </ErrorBoundary>
  );
};

export default Providers;
