import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Script from "next/script";

import { NavBar } from "@/components/layout/nav-bar";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Tailor",
  description: "Build a resume with your whole history",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${inter.className} flex min-h-screen flex-col items-center justify-start gap-8 bg-muted`}
        >
          <NavBar />
          {children}
        </body>
      </Providers>
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}
