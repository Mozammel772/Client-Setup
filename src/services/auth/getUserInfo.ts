// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { serverFetch } from "@/lib/server-fetch";
// import { UserInfo } from "@/types/user.interface";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { getCookie } from "./tokenHandlers";

// export const getUserInfo = async (): Promise<UserInfo | any> => {
//   let userInfo: UserInfo | any;
//   try {
//     const response = await serverFetch.get("/auth/me", {
//       next: { tags: ["user-info"], revalidate: 180 },
//     });

//     const result = await response.json();

//     if (result.success) {
//       const accessToken = await getCookie("accessToken");

//       if (!accessToken) {
//         throw new Error("No access token found");
//       }

//       const verifiedToken = jwt.verify(
//         accessToken,
//         process.env.JWT_ACCESS_SECRET as string,
//       ) as JwtPayload;

//       userInfo = {
//         name: verifiedToken.name || "Unknown User",
//         email: verifiedToken.email,
//         role: verifiedToken.role,
//       };
//     }

//     userInfo = {
//       name:
//         result.data.admin?.name ||
//         result.data.doctor?.name ||
//         result.data.patient?.name ||
//         result.data.name ||
//         "Unknown User",
//       ...result.data,
//     };

//     return userInfo;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       id: "",
//       name: "Unknown User",
//       email: "",
//       role: "PATIENT",
//     };
//   }
// };

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { serverFetch } from "@/lib/server-fetch";
// import { UserInfo } from "@/types/user.interface";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { getCookie } from "./tokenHandlers";

// export const getUserInfo = async (): Promise<UserInfo | any> => {
//   try {
//     const response = await serverFetch.get("/user/me", {
//       next: { tags: ["user-info"], revalidate: 180 },
//     });
//     console.log();
//     // Check if response is ok before parsing JSON
//     if (!response.ok) {
//       console.error(`API Error: ${response.status} ${response.statusText}`);

//       // Try to get user info from token instead
//       const accessToken = await getCookie("accessToken");
//       if (accessToken) {
//         try {
//           const verifiedToken = jwt.verify(
//             accessToken,
//             process.env.JWT_ACCESS_SECRET as string,
//           ) as JwtPayload;

//           return {
//             name: verifiedToken.name || "Unknown User",
//             email: verifiedToken.email,
//             role: verifiedToken.role,
//             needPasswordChange: verifiedToken.needPasswordChange || false,
//           };
//         } catch (tokenError) {
//           console.error("Token verification failed:", tokenError);
//         }
//       }

//       return {
//         id: "",
//         name: "Unknown User",
//         email: "",
//         role: "USER",
//         needPasswordChange: false,
//       };
//     }

//     // Check content type before parsing JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       console.error("Expected JSON but received:", contentType);
//       const text = await response.text();
//       console.error("Response body:", text.substring(0, 500)); // Log first 500 chars

//       // Fallback to token info
//       const accessToken = await getCookie("accessToken");
//       if (accessToken) {
//         try {
//           const verifiedToken = jwt.verify(
//             accessToken,
//             process.env.JWT_ACCESS_SECRET as string,
//           ) as JwtPayload;

//           return {
//             name: verifiedToken.name || "Unknown User",
//             email: verifiedToken.email,
//             role: verifiedToken.role,
//             needPasswordChange: verifiedToken.needPasswordChange || false,
//           };
//         } catch (tokenError) {
//           console.error("Token verification failed:", tokenError);
//         }
//       }

//       return {
//         id: "",
//         name: "Unknown User",
//         email: "",
//         role: "USER",
//         needPasswordChange: false,
//       };
//     }

//     const result = await response.json();

//     if (result.success) {
//       const accessToken = await getCookie("accessToken");
//       let userInfoFromToken = null;

//       if (accessToken) {
//         try {
//           const verifiedToken = jwt.verify(
//             accessToken,
//             process.env.JWT_ACCESS_SECRET as string,
//           ) as JwtPayload;

//           userInfoFromToken = {
//             name: verifiedToken.name || "Unknown User",
//             email: verifiedToken.email,
//             role: verifiedToken.role,
//             needPasswordChange: verifiedToken.needPasswordChange || false,
//           };
//         } catch (tokenError) {
//           console.error("Token verification failed:", tokenError);
//         }
//       }

//       // Combine data from API and token
//       return {
//         name:
//           result.data.admin?.name ||
//           result.data.moderator?.name ||
//           result.data.user?.name ||
//           result.data.name ||
//           userInfoFromToken?.name ||
//           "Unknown User",
//         ...result.data,
//         ...userInfoFromToken,
//       };
//     }

//     // If API returns success: false, try token info
//     const accessToken = await getCookie("accessToken");
//     if (accessToken) {
//       try {
//         const verifiedToken = jwt.verify(
//           accessToken,
//           process.env.JWT_ACCESS_SECRET as string,
//         ) as JwtPayload;

//         return {
//           name: verifiedToken.name || "Unknown User",
//           email: verifiedToken.email,
//           role: verifiedToken.role,
//           needPasswordChange: verifiedToken.needPasswordChange || false,
//         };
//       } catch (tokenError) {
//         console.error("Token verification failed:", tokenError);
//       }
//     }

//     return {
//       id: "",
//       name: "Unknown User",
//       email: "",
//       role: "USER",
//       needPasswordChange: false,
//     };
//   } catch (error: any) {
//     console.error("getUserInfo error:", error);

//     // Try to get info from token as fallback
//     try {
//       const accessToken = await getCookie("accessToken");
//       if (accessToken) {
//         const verifiedToken = jwt.verify(
//           accessToken,
//           process.env.JWT_ACCESS_SECRET as string,
//         ) as JwtPayload;

//         return {
//           name: verifiedToken.name || "Unknown User",
//           email: verifiedToken.email,
//           role: verifiedToken.role,
//           needPasswordChange: verifiedToken.needPasswordChange || false,
//         };
//       }
//     } catch (tokenError) {
//       console.error("Fallback token verification failed:", tokenError);
//     }

//     return {
//       id: "",
//       name: "Unknown User",
//       email: "",
//       role: "USER",
//       needPasswordChange: false,
//     };
//   }
// };
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | any> => {
  console.log("=== getUserInfo called ===");

  try {
    console.log("Fetching user info from /user/me endpoint...");
    const response = await serverFetch.get("/user/me", {
      next: { tags: ["user-info"], revalidate: 180 },
    });

    console.log("Response status:", response.status);
    console.log("Response status text:", response.statusText);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries()),
    );

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      console.log("Response not OK, falling back to token info");

      // Try to get user info from token instead
      const accessToken = await getCookie("accessToken");
      console.log(
        "Access token from cookie:",
        accessToken ? "Present" : "Missing",
      );

      if (accessToken) {
        try {
          console.log("Verifying token...");
          const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string,
          ) as JwtPayload;

          console.log("Token verified successfully. User info from token:", {
            name: verifiedToken.name,
            email: verifiedToken.email,
            role: verifiedToken.role,
            needPasswordChange: verifiedToken.needPasswordChange,
          });

          return {
            name: verifiedToken.name || "Unknown User",
            email: verifiedToken.email,
            role: verifiedToken.role,
            needPasswordChange: verifiedToken.needPasswordChange || false,
          };
        } catch (tokenError) {
          console.error("Token verification failed:", tokenError);
        }
      } else {
        console.log("No access token found in cookie");
      }

      console.log("Returning default user info (no token/API)");
      return {
        id: "",
        name: "Unknown User",
        email: "",
        role: "USER",
        needPasswordChange: false,
      };
    }

    // Check content type before parsing JSON
    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType);

    if (!contentType || !contentType.includes("application/json")) {
      console.error("Expected JSON but received:", contentType);
      const text = await response.text();
      console.error("Response body (first 500 chars):", text.substring(0, 500));

      // Fallback to token info
      const accessToken = await getCookie("accessToken");
      console.log(
        "Access token from cookie (fallback):",
        accessToken ? "Present" : "Missing",
      );

      if (accessToken) {
        try {
          console.log("Verifying token (fallback)...");
          const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string,
          ) as JwtPayload;

          console.log("Token verified (fallback). User info:", {
            name: verifiedToken.name,
            email: verifiedToken.email,
            role: verifiedToken.role,
          });

          return {
            name: verifiedToken.name || "Unknown User",
            email: verifiedToken.email,
            role: verifiedToken.role,
            needPasswordChange: verifiedToken.needPasswordChange || false,
          };
        } catch (tokenError) {
          console.error("Token verification failed (fallback):", tokenError);
        }
      }

      return {
        id: "",
        name: "Unknown User",
        email: "",
        role: "USER",
        needPasswordChange: false,
      };
    }

    console.log("Parsing response as JSON...");
    const result = await response.json();
    console.log("API Response:", JSON.stringify(result, null, 2));

    if (result.success) {
      console.log("API call successful. Processing user data...");

      const accessToken = await getCookie("accessToken");
      console.log(
        "Access token from cookie:",
        accessToken ? "Present" : "Missing",
      );

      let userInfoFromToken = null;

      if (accessToken) {
        try {
          console.log("Verifying token for additional info...");
          const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string,
          ) as JwtPayload;

          console.log("Token verified. Token info:", {
            name: verifiedToken.name,
            email: verifiedToken.email,
            role: verifiedToken.role,
          });

          userInfoFromToken = {
            name: verifiedToken.name || "Unknown User",
            email: verifiedToken.email,
            role: verifiedToken.role,
            needPasswordChange: verifiedToken.needPasswordChange || false,
          };
        } catch (tokenError) {
          console.error("Token verification failed:", tokenError);
        }
      }

      // Combine data from API and token
      const combinedUserInfo = {
        name:
          result.data.admin?.name ||
          result.data.moderator?.name ||
          result.data.user?.name ||
          result.data.name ||
          userInfoFromToken?.name ||
          "Unknown User",
        ...result.data,
        ...userInfoFromToken,
      };

      console.log("Combined user info:", combinedUserInfo);
      return combinedUserInfo;
    }

    // If API returns success: false, try token info
    console.log("API returned success: false. Falling back to token info");
    const accessToken = await getCookie("accessToken");
    console.log(
      "Access token from cookie (success false):",
      accessToken ? "Present" : "Missing",
    );

    if (accessToken) {
      try {
        console.log("Verifying token (success false fallback)...");
        const verifiedToken = jwt.verify(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string,
        ) as JwtPayload;

        console.log("Token verified. User info from token:", {
          name: verifiedToken.name,
          email: verifiedToken.email,
          role: verifiedToken.role,
        });

        return {
          name: verifiedToken.name || "Unknown User",
          email: verifiedToken.email,
          role: verifiedToken.role,
          needPasswordChange: verifiedToken.needPasswordChange || false,
        };
      } catch (tokenError) {
        console.error("Token verification failed:", tokenError);
      }
    }

    console.log("Returning default user info (no valid data)");
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "USER",
      needPasswordChange: false,
    };
  } catch (error: any) {
    console.error("=== getUserInfo Error ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    if (error.cause) {
      console.error("Error cause:", error.cause);
    }

    // Try to get info from token as fallback
    console.log("Attempting fallback to token info after error...");
    try {
      const accessToken = await getCookie("accessToken");
      console.log(
        "Access token from cookie (error fallback):",
        accessToken ? "Present" : "Missing",
      );

      if (accessToken) {
        console.log("Verifying token (error fallback)...");
        const verifiedToken = jwt.verify(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string,
        ) as JwtPayload;

        console.log("Token verified (error fallback). User info:", {
          name: verifiedToken.name,
          email: verifiedToken.email,
          role: verifiedToken.role,
        });

        return {
          name: verifiedToken.name || "Unknown User",
          email: verifiedToken.email,
          role: verifiedToken.role,
          needPasswordChange: verifiedToken.needPasswordChange || false,
        };
      }
    } catch (tokenError) {
      console.error("Fallback token verification failed:", tokenError);
    }

    console.log("Returning default user info (error recovery)");
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "USER",
      needPasswordChange: false,
    };
  }
};
