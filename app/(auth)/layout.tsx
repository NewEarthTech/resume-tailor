import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Logo } from "@/components/ui/logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Tailor",
  description: "Build a resume with your whole history",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-8 p-5">
      <Logo className="sticky top-0 -z-10" />
      <main className="self-center">{children}</main>
    </div>
  );
}
