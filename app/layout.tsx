import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { headers } from 'next/headers'

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontMontserrat } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "./_components/Sidebar";
import { Topbar } from "./_components/Topbar";
import { Navbar1 } from "./_components/Navbar1";
import { SearchEngine } from "./_components/SearchEngine";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie')!;

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontMontserrat.className,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }} cookies={cookies}>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-grow">
              <Topbar />
              <main className="flex-grow overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
