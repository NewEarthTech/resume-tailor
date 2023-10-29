import type { Metadata } from "next";

import { NavBar } from "@/components/layout/nav-bar";

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
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-8">
      <NavBar />
      {children}
    </div>
  );
}
