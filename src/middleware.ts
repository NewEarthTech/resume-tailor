import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth: () => {},
  debug: true,
  publicRoutes: ["/", "/resume/(.*)"],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(sign-in)(.*)",
    "/(sign-up)(.*)",
    "/(dashboard)(.*)",
    "/(resume)(.*)",
  ],
};
