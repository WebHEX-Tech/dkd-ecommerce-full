import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequest) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "superAdmin" || token?.role === "admin",
    },
  }
);

export const config = { matcher: ['/dashboard'] };
