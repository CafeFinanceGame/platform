import "@/styles/globals.css";
import "react-circular-progressbar/dist/styles.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { headers } from "next/headers";
import { Howl } from "howler";

import { Providers } from "./providers";
import { Sidebar } from "./_components/Sidebar";
import { Topbar } from "./_components/Topbar";

import { siteConfig } from "@/config/site";
import { fontMontserrat } from "@/config/fonts";
import BackgroundMusic from "./(landing)/_components/BackgroundMusic";

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

const backgroundMusic = new Howl({
  src: ["/assets/music-background.mp3"],
  autoplay: true,
  loop: true,
  volume: 0.5
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie")!;
  backgroundMusic.play();

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontMontserrat.className,
        )}
      >
        <Providers
          cookies={cookies}
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <BackgroundMusic />
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-grow">
              <Topbar />
              <main className="flex-grow overflow-y-auto">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
