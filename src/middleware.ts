import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/resume/(.*)", "/api/resume(.*)", "/api/users(.*)"],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(sign-in)(.*)",
    "/(sign-up)(.*)",
    "/(dashboard)(.*)",
    "/(resume)(.*)",
    "/(api|trpc)(.*)",
  ],
};
