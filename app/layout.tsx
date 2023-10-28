import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

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
    <Providers>
      <html lang="en">
        <body
          className={`${inter.className} flex min-h-screen flex-col items-center justify-start gap-8 bg-muted`}
        >
          <NavBar />
          {children}
        </body>
      </html>
    </Providers>
  );
}
