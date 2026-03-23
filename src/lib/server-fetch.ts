// import { getNewAccessToken } from "@/services/auth/auth.service";
// import { getCookie } from "@/services/auth/tokenHandlers";

// const BACKEND_API_URL =
//   process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

// // /auth/login
// const serverFetchHelper = async (
//   endpoint: string,
//   options: RequestInit,
// ): Promise<Response> => {
//   const { headers, ...restOptions } = options;
//   const accessToken = await getCookie("accessToken");

//   const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
//     credentials: "include", // 🔥 ADD THIS
//     headers: {
//       Cookie: accessToken ? `accessToken=${accessToken}` : "",
//       ...(headers || {}),
//     },
//     ...restOptions,
//   });

//   // 🔥 Handle expired token
//   if (response.status === 401 && endpoint !== "/auth/refresh-token") {
//     await getNewAccessToken();

//     const newAccessToken = await getCookie("accessToken");

//     return fetch(`${BACKEND_API_URL}${endpoint}`, {
//       credentials: "include",
//       headers: {
//         Cookie: newAccessToken ? `accessToken=${newAccessToken}` : "",
//         ...(headers || {}),
//       },
//       ...restOptions,
//     });
//   }

//   return response;
// };
// export const serverFetch = {
//   get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
//     serverFetchHelper(endpoint, { ...options, method: "GET" }),

//   post: async (
//     endpoint: string,
//     options: RequestInit = {},
//   ): Promise<Response> =>
//     serverFetchHelper(endpoint, { ...options, method: "POST" }),

//   put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
//     serverFetchHelper(endpoint, { ...options, method: "PUT" }),

//   patch: async (
//     endpoint: string,
//     options: RequestInit = {},
//   ): Promise<Response> =>
//     serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

//   delete: async (
//     endpoint: string,
//     options: RequestInit = {},
//   ): Promise<Response> =>
//     serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
// };

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  const { headers, ...rest } = options;

  let response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    ...rest,
    credentials: "include", // 🔥 IMPORTANT
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  });

  // 🔥 যদি access token expire হয়
  if (response.status === 401 && endpoint !== "/auth/refresh-token") {
    const refreshRes = await fetch(`${BACKEND_API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      // 🔁 retry original request
      response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
        ...rest,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(headers || {}),
        },
      });
    } else {
      // ❌ refresh fail → logout handle করো
      console.log("Session expired. Redirect to login.");
    }
  }

  return response;
};

export const serverFetch = {
  get: (url: string, options?: RequestInit) =>
    serverFetchHelper(url, { ...options, method: "GET" }),

  post: (url: string, options?: RequestInit) =>
    serverFetchHelper(url, { ...options, method: "POST" }),

  put: (url: string, options?: RequestInit) =>
    serverFetchHelper(url, { ...options, method: "PUT" }),

  patch: (url: string, options?: RequestInit) =>
    serverFetchHelper(url, { ...options, method: "PATCH" }),

  delete: (url: string, options?: RequestInit) =>
    serverFetchHelper(url, { ...options, method: "DELETE" }),
};
