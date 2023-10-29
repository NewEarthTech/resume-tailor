import Link from "next/link";
import {
  Facebook,
  Linkedin,
  LucideIcon,
  PencilRuler,
  Twitter,
} from "lucide-react";

function SocialLink({
  Icon,
  children,
  href,
}: {
  Icon: LucideIcon;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link className=" hover:text-blue-300" href={href}>
      <Icon />
      <span className="sr-only">{children}</span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground p-12 text-background">
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-between sm:flex-row">
        <div className="mb-7 w-full text-center sm:w-full sm:text-left md:mb-9">
          <PencilRuler className="inline" />
          <span className="ml-2 text-xl font-semibold">Resume Tailor</span>
        </div>
        <nav className="flex space-x-4 py-6 md:py-0">
          <Link className=" hover:text-blue-300" href="#">
            About
          </Link>
          <Link className=" hover:text-blue-300" href="#">
            Privacy
          </Link>
          <Link className=" hover:text-blue-300" href="#">
            Terms
          </Link>
        </nav>
        <div className="flex space-x-4 py-7 md:p-0">
          {Object.entries({
            facebook: Facebook,
            twitter: Twitter,
            linkedin: Linkedin,
          }).map(([key, value]) => (
            <SocialLink Icon={value} href={"#"} key={key}>
              {key}
            </SocialLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
