import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth: () => {},
  debug: false,
  publicRoutes: ["/", "/(.*)", "/resume/(.*)"],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(sign-in)(.*)",
    "/(sign-up)(.*)",
    "/(dashboard)(.*)",
    "/(resume)(.*)",
    "/user(.*)",
  ],
};
