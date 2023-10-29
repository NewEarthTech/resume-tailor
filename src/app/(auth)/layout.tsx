import type { Metadata } from "next";

import { Logo } from "@/components/ui/logo";

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
      <Logo />
      <main className="">{children}</main>
    </div>
  );
}
