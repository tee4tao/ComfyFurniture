import { NextResponse, type NextRequest } from "next/server";
import { getLoggedInUser } from "./lib/actions/users.action";

export function middleware(request: NextRequest) {
  const loggedIn = async () => {
    const user = await getLoggedInUser();
    return user;
  };
  const hasUser = async () => {
    const user = await loggedIn();
    if (!user) {
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      return response;
    }
    return NextResponse.next();
  };
  hasUser();
  // return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/checkout",
};
