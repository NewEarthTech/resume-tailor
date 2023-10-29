import type { Metadata } from "next";

import { NavBar } from "@/components/layout/header/nav-bar";

export const metadata: Metadata = {
  title: "Resume Tailor",
  description: "Build a resume with your whole history",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <NavBar />
      {children}
    </div>
  );
}
