import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/ma-cave(.*)",
  "/mon-carnet(.*)",
  "/mes-vins(.*)",
  "/mes-listes(.*)",
  "/scan(.*)",
  "/favoris(.*)",
  "/panier(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  const hostname = req.nextUrl.hostname;
  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1";

  if (pathname === "/" && !isLocal) {
    return NextResponse.rewrite(
      new URL("/disponible-bientot", req.url)
    );
  }

  if (pathname === "/en" && !isLocal) {
    return NextResponse.rewrite(
      new URL("/en/disponible-bientot", req.url)
    );
  }

  if (isProtectedRoute(req) || isAdminRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
