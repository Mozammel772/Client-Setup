// /* eslint-disable @typescript-eslint/no-explicit-any */
// import jwt, { JwtPayload } from "jsonwebtoken";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import {
//   getDefaultDashboardRoute,
//   getRouteOwner,
//   isAuthRoute,
//   UserRole,
// } from "./lib/auth-utils";
// import { verifyResetPasswordToken } from "./lib/jwtHanlders";
// import { getNewAccessToken } from "./services/auth/auth.service";
// import { getUserInfo } from "./services/auth/getUserInfo";
// import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // 🔁 prevent infinite refresh loop
//   const hasTokenRefreshedParam =
//     request.nextUrl.searchParams.has("tokenRefreshed");

//   if (hasTokenRefreshedParam) {
//     const url = request.nextUrl.clone();
//     url.searchParams.delete("tokenRefreshed");
//     return NextResponse.redirect(url);
//   }

//   const accessToken = (await getCookie("accessToken")) || null;
//   let userRole: UserRole | null = null;

//   // ===============================
//   // ✅ STEP 1: VERIFY ACCESS TOKEN
//   // ===============================
//   if (accessToken) {
//     try {
//       const verifiedToken = jwt.verify(
//         accessToken,
//         process.env.JWT_ACCESS_SECRET as string,
//       ) as JwtPayload;

//       userRole = verifiedToken.role;
//     } catch (error: any) {
//       // 🔥 যদি token expire হয় → refresh try করো
//       if (error.name === "TokenExpiredError") {
//         const refreshResult = await getNewAccessToken();

//         if (refreshResult?.tokenRefreshed) {
//           const url = request.nextUrl.clone();
//           url.searchParams.set("tokenRefreshed", "true");
//           return NextResponse.redirect(url);
//         }

//         // refresh fail → logout
//         await deleteCookie("accessToken");
//         await deleteCookie("refreshToken");

//         return NextResponse.redirect(new URL("/login", request.url));
//       }

//       // ❌ invalid token
//       await deleteCookie("accessToken");
//       await deleteCookie("refreshToken");

//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   const routerOwner = getRouteOwner(pathname);
//   const isAuth = isAuthRoute(pathname);

//   // ===============================
//   // ✅ RULE 1: Logged in user → auth page
//   // ===============================
//   if (accessToken && isAuth) {
//     return NextResponse.redirect(
//       new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
//     );
//   }

//   // ===============================
//   // ✅ RULE 2: RESET PASSWORD ROUTE
//   // ===============================
//   if (pathname === "/reset-password") {
//     const email = request.nextUrl.searchParams.get("email");
//     const token = request.nextUrl.searchParams.get("token");

//     // 🔐 Logged-in user (needPasswordChange)
//     if (accessToken) {
//       const userInfo = await getUserInfo();

//       if (userInfo.needPasswordChange) {
//         return NextResponse.next();
//       }

//       return NextResponse.redirect(
//         new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
//       );
//     }

//     // 🔗 Email reset link
//     if (email && token) {
//       try {
//         const verifiedToken = await verifyResetPasswordToken(token);

//         if (!verifiedToken.success) {
//           return NextResponse.redirect(
//             new URL("/forgot-password?error=expired-link", request.url),
//           );
//         }

//         if (verifiedToken.payload!.email !== email) {
//           return NextResponse.redirect(
//             new URL("/forgot-password?error=invalid-link", request.url),
//           );
//         }

//         return NextResponse.next();
//       } catch {
//         return NextResponse.redirect(
//           new URL("/forgot-password?error=expired-link", request.url),
//         );
//       }
//     }

//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // ===============================
//   // ✅ RULE 3: PUBLIC ROUTE
//   // ===============================
//   if (routerOwner === null) {
//     return NextResponse.next();
//   }

//   // ===============================
//   // ✅ RULE 4: NOT LOGGED IN
//   // ===============================
//   if (!accessToken) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // ===============================
//   // ✅ RULE 5: FORCE PASSWORD CHANGE
//   // ===============================
//   const userInfo = await getUserInfo();

//   if (userInfo.needPasswordChange) {
//     if (pathname !== "/reset-password") {
//       const resetUrl = new URL("/reset-password", request.url);
//       resetUrl.searchParams.set("redirect", pathname);
//       return NextResponse.redirect(resetUrl);
//     }

//     return NextResponse.next();
//   }

//   if (!userInfo.needPasswordChange && pathname === "/reset-password") {
//     return NextResponse.redirect(
//       new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
//     );
//   }

//   // ===============================
//   // ✅ RULE 6: COMMON ROUTE
//   // ===============================
//   if (routerOwner === "COMMON") {
//     return NextResponse.next();
//   }

//   // ===============================
//   // ✅ RULE 7: ROLE BASED ROUTE
//   // ===============================
//   if (
//     routerOwner === "ADMIN" ||
//     routerOwner === "MODERATOR" ||
//     routerOwner === "USER"
//   ) {
//     if (userRole !== routerOwner) {
//       return NextResponse.redirect(
//         new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
//   ],
// };

// // import jwt, {
// //   JsonWebTokenError,
// //   JwtPayload,
// //   TokenExpiredError,
// // } from "jsonwebtoken";
// // import type { NextRequest } from "next/server";
// // import { NextResponse } from "next/server";
// // import {
// //   getDefaultDashboardRoute,
// //   getRouteOwner,
// //   isAuthRoute,
// //   UserRole,
// // } from "./lib/auth-utils";
// // import { verifyResetPasswordToken } from "./lib/jwtHanlders";
// // import { getNewAccessToken } from "./services/auth/auth.service";
// // import { getUserInfo } from "./services/auth/getUserInfo";
// // import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";

// // // This function can be marked `async` if using `await` inside
// // export async function proxy(request: NextRequest) {
// //   const pathname = request.nextUrl.pathname;
// //   const hasTokenRefreshedParam =
// //     request.nextUrl.searchParams.has("tokenRefreshed");

// //   // If coming back after token refresh, remove the param and continue
// //   if (hasTokenRefreshedParam) {
// //     const url = request.nextUrl.clone();
// //     url.searchParams.delete("tokenRefreshed");
// //     return NextResponse.redirect(url);
// //   }

// //   const accessToken = (await getCookie("accessToken")) || null;

// //   let userRole: UserRole | null = null;
// //   let isValidToken = false;

// //   if (accessToken) {
// //     try {
// //       const verifiedToken = jwt.verify(
// //         accessToken,
// //         process.env.JWT_ACCESS_SECRET as string,
// //       ) as JwtPayload;

// //       userRole = verifiedToken.role;
// //       isValidToken = true;
// //     } catch (error) {
// //       // Handle token errors
// //       if (error instanceof TokenExpiredError) {
// //         console.log("Token expired, attempting to refresh...");

// //         // Try to refresh the token
// //         const refreshResult = await getNewAccessToken();

// //         if (refreshResult?.tokenRefreshed) {
// //           // Token was refreshed, redirect to same page
// //           const url = request.nextUrl.clone();
// //           url.searchParams.set("tokenRefreshed", "true");
// //           return NextResponse.redirect(url);
// //         } else {
// //           // Refresh failed, clear cookies and redirect to login
// //           console.log("Token refresh failed, clearing cookies");
// //           await deleteCookie("accessToken");
// //           await deleteCookie("refreshToken");

// //           // Don't redirect on API routes
// //           if (pathname.startsWith("/api/")) {
// //             return NextResponse.next();
// //           }

// //           const loginUrl = new URL("/login", request.url);
// //           loginUrl.searchParams.set("redirect", pathname);
// //           return NextResponse.redirect(loginUrl);
// //         }
// //       } else if (error instanceof JsonWebTokenError) {
// //         // Invalid token
// //         console.log("Invalid token:", error.message);
// //         await deleteCookie("accessToken");
// //         await deleteCookie("refreshToken");

// //         // Don't redirect on API routes
// //         if (pathname.startsWith("/api/")) {
// //           return NextResponse.next();
// //         }

// //         const loginUrl = new URL("/login", request.url);
// //         loginUrl.searchParams.set("redirect", pathname);
// //         return NextResponse.redirect(loginUrl);
// //       }
// //     }
// //   }

// //   const routerOwner = getRouteOwner(pathname);
// //   const isAuth = isAuthRoute(pathname);

// //   // Rule 1 : User is logged in and trying to access auth route. Redirect to default dashboard
// //   if (isValidToken && isAuth) {
// //     return NextResponse.redirect(
// //       new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
// //     );
// //   }

// //   // Rule 2: Handle /reset-password route BEFORE checking authentication
// //   if (pathname === "/reset-password") {
// //     const email = request.nextUrl.searchParams.get("email");
// //     const token = request.nextUrl.searchParams.get("token");

// //     // Case 1: User has needPasswordChange (newly created admin/doctor)
// //     if (isValidToken) {
// //       try {
// //         const userInfo = await getUserInfo();
// //         if (userInfo.needPasswordChange) {
// //           return NextResponse.next();
// //         }
// //       } catch (error) {
// //         console.log("Error getting user info:", error);
// //       }

// //       // User doesn't need password change and no valid token, redirect to dashboard
// //       return NextResponse.redirect(
// //         new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
// //       );
// //     }

// //     // Case 2: Coming from email reset link (has email and token)
// //     if (email && token) {
// //       try {
// //         // Verify the token
// //         const verifiedToken = await verifyResetPasswordToken(token);

// //         if (!verifiedToken.success) {
// //           return NextResponse.redirect(
// //             new URL("/forgot-password?error=expired-link", request.url),
// //           );
// //         }

// //         // Verify email matches token
// //         if (verifiedToken.success && verifiedToken.payload!.email !== email) {
// //           return NextResponse.redirect(
// //             new URL("/forgot-password?error=invalid-link", request.url),
// //           );
// //         }

// //         // Token and email are valid, allow access without authentication
// //         return NextResponse.next();
// //       } catch {
// //         // Token is invalid or expired
// //         return NextResponse.redirect(
// //           new URL("/forgot-password?error=expired-link", request.url),
// //         );
// //       }
// //     }

// //     // No access token and no valid reset token, redirect to login
// //     const loginUrl = new URL("/login", request.url);
// //     loginUrl.searchParams.set("redirect", pathname);
// //     return NextResponse.redirect(loginUrl);
// //   }

// //   // Rule 3 : User is trying to access open public route
// //   if (routerOwner === null) {
// //     return NextResponse.next();
// //   }

// //   // Rule 4: Check authentication for protected routes
// //   if (!isValidToken) {
// //     // Don't redirect on API routes
// //     if (pathname.startsWith("/api/")) {
// //       return NextResponse.json(
// //         { success: false, message: "Unauthorized" },
// //         { status: 401 },
// //       );
// //     }

// //     const loginUrl = new URL("/login", request.url);
// //     loginUrl.searchParams.set("redirect", pathname);
// //     return NextResponse.redirect(loginUrl);
// //   }

// //   // Rule 5 : User need password change
// //   if (isValidToken) {
// //     try {
// //       const userInfo = await getUserInfo();
// //       if (userInfo.needPasswordChange) {
// //         if (pathname !== "/reset-password") {
// //           const resetPasswordUrl = new URL("/reset-password", request.url);
// //           resetPasswordUrl.searchParams.set("redirect", pathname);
// //           return NextResponse.redirect(resetPasswordUrl);
// //         }
// //         return NextResponse.next();
// //       }

// //       if (
// //         userInfo &&
// //         !userInfo.needPasswordChange &&
// //         pathname === "/reset-password"
// //       ) {
// //         return NextResponse.redirect(
// //           new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
// //         );
// //       }
// //     } catch (error) {
// //       console.log("Error checking user password change status:", error);
// //     }
// //   }

// //   // Rule 6 : User is trying to access common protected route
// //   if (routerOwner === "COMMON") {
// //     return NextResponse.next();
// //   }

// //   // Rule 7 : User is trying to access role based protected route
// //   if (
// //     routerOwner === "ADMIN" ||
// //     routerOwner === "MODERATOR" ||
// //     routerOwner === "USER"
// //   ) {
// //     if (userRole !== routerOwner) {
// //       return NextResponse.redirect(
// //         new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
// //       );
// //     }
// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: [
// //     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
// //   ],
// // };

import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";
import { verifyResetPasswordToken } from "./lib/jwtHanlders";
import { getNewAccessToken } from "./services/auth/auth.service";
import { getUserInfo } from "./services/auth/getUserInfo";
import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasTokenRefreshedParam =
    request.nextUrl.searchParams.has("tokenRefreshed");

  // If coming back after token refresh, remove the param and continue
  if (hasTokenRefreshedParam) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("tokenRefreshed");
    return NextResponse.redirect(url);
  }

  const tokenRefreshResult = await getNewAccessToken();

  // If token was refreshed, redirect to same page to fetch with new token
  if (tokenRefreshResult?.tokenRefreshed) {
    const url = request.nextUrl.clone();
    url.searchParams.set("tokenRefreshed", "true");
    return NextResponse.redirect(url);
  }

  // const accessToken = request.cookies.get("accessToken")?.value || null;

  const accessToken = (await getCookie("accessToken")) || null;

  let userRole: UserRole | null = null;
  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    );

    if (typeof verifiedToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = verifiedToken.role;
  }

  const routerOwner = getRouteOwner(pathname);
  //path = /doctor/appointments => "DOCTOR"
  //path = /my-profile => "COMMON"
  //path = /login => null

  const isAuth = isAuthRoute(pathname);

  // Rule 1 : User is logged in and trying to access auth route. Redirect to default dashboard
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
    );
  }

  // Rule 2: Handle /reset-password route BEFORE checking authentication
  // This route has two valid cases:
  // 1. User coming from email reset link (has email + token in query params)
  // 2. Authenticated user with needPasswordChange=true
  if (pathname === "/reset-password") {
    const email = request.nextUrl.searchParams.get("email");
    const token = request.nextUrl.searchParams.get("token");

    // Case 1: User has needPasswordChange (newly created admin/doctor)
    if (accessToken) {
      const userInfo = await getUserInfo();
      if (userInfo.needPasswordChange) {
        return NextResponse.next();
      }

      // User doesn't need password change and no valid token, redirect to dashboard
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }

    // Case 2: Coming from email reset link (has email and token)
    if (email && token) {
      try {
        // Verify the token
        const verifiedToken = await verifyResetPasswordToken(token);

        if (!verifiedToken.success) {
          return NextResponse.redirect(
            new URL("/forgot-password?error=expired-link", request.url),
          );
        }

        // Verify email matches token
        if (verifiedToken.success && verifiedToken.payload!.email !== email) {
          return NextResponse.redirect(
            new URL("/forgot-password?error=invalid-link", request.url),
          );
        }

        // Token and email are valid, allow access without authentication
        return NextResponse.next();
      } catch {
        // Token is invalid or expired
        return NextResponse.redirect(
          new URL("/forgot-password?error=expired-link", request.url),
        );
      }
    }

    // No access token and no valid reset token, redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rule 3 : User is trying to access open public route
  if (routerOwner === null) {
    return NextResponse.next();
  }

  // Rule 1 & 2 for open public routes and auth routes

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rule 4 : User need password change

  if (accessToken) {
    const userInfo = await getUserInfo();
    if (userInfo.needPasswordChange) {
      if (pathname !== "/reset-password") {
        const resetPasswordUrl = new URL("/reset-password", request.url);
        resetPasswordUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(resetPasswordUrl);
      }
      return NextResponse.next();
    }

    if (
      userInfo &&
      !userInfo.needPasswordChange &&
      pathname === "/reset-password"
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }
  }

  // Rule 5 : User is trying to access common protected route
  if (routerOwner === "COMMON") {
    return NextResponse.next();
  }

  // Rule 6 : User is trying to access role based protected route
  if (
    routerOwner === "ADMIN" ||
    routerOwner === "MODERATOR" ||
    routerOwner === "USER"
  ) {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
