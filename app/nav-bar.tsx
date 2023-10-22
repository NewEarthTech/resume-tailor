import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function NavBar() {
  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-transparent px-6 py-4">
      <a
        className="text-lg font-bold text-gray-700 dark:text-gray-200"
        href="#"
      >
        Logo
      </a>
      <div className="hidden items-center space-x-6 md:flex">
        <a
          className="text-gray-700 transition-colors hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300"
          href="#"
        >
          Home
        </a>
        <a
          className="text-gray-700 transition-colors hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300"
          href="#"
        >
          About
        </a>
        <a
          className="text-gray-700 transition-colors hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300"
          href="#"
        >
          Services
        </a>
        <a
          className="text-gray-700 transition-colors hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300"
          href="#"
        >
          Contact
        </a>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="ghost">
            <svg
              className=" h-6 w-6"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-64" side="left">
          <nav className="grid items-start px-4 text-lg font-medium">
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              Home
            </a>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              About
            </a>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              Services
            </a>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              Contact
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
