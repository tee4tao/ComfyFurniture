import { NextResponse, type NextRequest } from "next/server";
import { getLoggedInUser } from "./lib/actions/users.action";

const loggedIn = async () => {
  const user = await getLoggedInUser();
  return user;
};
// const hasUser = async () => {
//   const user = await loggedIn();
//   if (user) {
//     return true;
//   } else {
//     return false;
//   }
// };

export async function middleware(request: NextRequest) {
  const user = await loggedIn();
  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
  //   const user = await loggedIn();
  //   if (!user) {
  //     const response = NextResponse.redirect(new URL("/sign-in", request.url));
  //     return response;
  //   }
  //   return NextResponse.next();
  // };
  // hasUser();
  // return NextResponse.redirect(new URL("/", request.url));

  // hasUser().then((result) => {
  //   if (!result) {
  //     return NextResponse.redirect(new URL("/sign-in", request.url));
  //   }
  //   return NextResponse.next();
  // });

  // const user = false;
  // if (!user) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/payment"],
};
