import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function Hero() {
  const { userId } = auth();
  const href = userId ? "/resume" : "/sign-up";
  return (
    <section className="group relative flex h-[90dvh] flex-col justify-center overflow-hidden text-center ">
      <Image
        alt="A giant document is being discussed by two men wearing suits and holding tailor tools"
        src="/hero.webp"
        fill={true}
        className="bg-black object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105 md:object-[center_bottom]"
        priority
      />
      <div className="relative flex h-full flex-col items-center justify-center text-white backdrop-brightness-50 transition-[backdrop-filter] duration-1000 ease-in-out group-hover:backdrop-brightness-[.65] dark:backdrop-brightness-75">
        <h1 className="mb-2 text-4xl font-bold">Resume Tailor</h1>
        <p className="mb-12 text-xl">Craft your perfect resume in no time</p>
        <Button
          className="mx-auto py-7 font-bold capitalize tracking-widest"
          variant="default"
          size="lg"
          asChild
        >
          <Link href={href}>Get Started</Link>
        </Button>
      </div>
    </section>
  );
}
