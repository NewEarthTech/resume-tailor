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
    <footer className="bg-foreground p-4 text-background">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="mb-4 w-full sm:mb-0 sm:w-auto">
          <PencilRuler className="inline" />
          <span className="ml-2 text-xl font-semibold">Resume Tailor</span>
        </div>
        <nav className="flex space-x-4">
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
        <div className="flex space-x-4">
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
