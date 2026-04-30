/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import { deleteCookie, getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      throw new Error("NO_TOKEN");
    }

    const response = await serverFetch.get("/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["user-info"], revalidate: 180 },
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error("API_FAILED");
    }

    console.log("current:", result.data?.name);

    return {
      id: result.data?.id,
      name: result.data?.name || "Unknown User",
      phone: result.data?.phone,
      role: result.data?.userRole || "USER",
      status: result.data?.status,
      createdAt: result.data?.createdAt,
      updatedAt: result.data?.updatedAt,
    };
  } catch (error: any) {
    console.log("getUserInfo error:", error.message);

    // 🔥 token cleanup if expired
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    return {
      id: "",
      name: "Guest",
      phone: "",
      role: "USER",
      status: "DELETED",
      createdAt: "",
      updatedAt: "",
    };
  }
};
