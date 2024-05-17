import { NextResponse } from 'next/server';


// const allowedOrigins = ['https://passmg-nextjs.onrender.com'];
// // Define CORS options
// const corsOptions = {
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// };


// This function can be marked `async` if using `await` inside
export function middleware(request) {

  const path = request.nextUrl.pathname;
  const matcher = [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/verifyemail"
  ]

  if (matcher.find((item) => item == path)) {

    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

    const token = request.cookies.get("token")?.value || ""

    if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  // else {
  //   const isPreflight = request.method === 'OPTIONS';

  //   const origin = request.headers.get('origin') ?? '';
  //   const isAllowedOrigin = allowedOrigins.includes(origin);

  //   const preflightHeaders = {
  //     ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
  //     ...corsOptions,
  //   };

  //   if (isPreflight) {
  //     return NextResponse.json({}, { headers: preflightHeaders });
  //   }

  //   // Handle simple requests
  //   const response = NextResponse.next();

  //   if (isAllowedOrigin) {
  //     response.headers.set('Access-Control-Allow-Origin', origin);
  //   }

  //   Object.entries(corsOptions).forEach(([key, value]) => {
  //     response.headers.set(key, value);
  //   });

  //   return response;
  // }
}

// See "Matching Paths" below to learn more
// export const config = {
// matcher: [
//   "/",
//   "/login",
//   "/signup",
//   "/profile",
//   "/verifyemail"
// ]
// }