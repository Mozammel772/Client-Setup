/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { googleLoginUser } from "@/services/auth/googleLogin";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

export function GoogleLoginButton({ redirect }: { redirect?: string }) {
  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse?.credential;

    if (!idToken) {
      return toast.error("Google login failed");
    }

    try {
      const result = await googleLoginUser({ idToken });

      if (result?.success) {
        toast.success(result.message || "Logged in with Google!");

        // ✅ Ensure cookie set then redirect
        const redirectPath = redirect || "/dashboard";

        // small delay to ensure cookie persistence
        setTimeout(() => {
          window.location.replace(redirectPath); // ✅ better than href
        }, 100);
      } else {
        toast.error(result?.message || "Google login failed");
      }
    } catch (error: any) {
      toast.error(error?.message || "Google login error");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google login failed")}
        useOneTap={false} // ✅ prevent auto multiple init issues
      />
    </div>
  );
}
