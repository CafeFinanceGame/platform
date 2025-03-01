import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { headers } from 'next/headers'

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontMontserrat } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

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
          <div className="relative flex flex-col h-screen">
            {/* <Navbar /> */}
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
