"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WagmiProvider, cookieToInitialState, type Config } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import utils from "@/utils"

export interface ProvidersProps {
  cookies: string;
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const queryClient = new QueryClient()

export function Providers({ children, themeProps, cookies }: ProvidersProps) {
  const router = useRouter();
  const initialState = cookieToInitialState(utils.wagmi.wagmiConfig as Config, cookies);

  return (
    <WagmiProvider config={utils.wagmi.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
