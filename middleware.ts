import { NextResponse, type NextRequest } from "next/server";
import { getLoggedInUser } from "./lib/actions/users.action";

const loggedIn = async () => {
  const user = await getLoggedInUser();
  return user;
};

export async function middleware(request: NextRequest) {
  const user = await loggedIn();
  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/payment", "/pod"],
};
