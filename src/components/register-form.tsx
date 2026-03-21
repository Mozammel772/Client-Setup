"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          {/* Full Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" type="text" placeholder="John Doe" required />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>

          {/* Password & Confirm Password */}

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </Field>

          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>

          {/* Buttons */}
          <Field className="space-y-1.5">
            <Button type="submit">Create Account</Button>
            <Button variant="outline" type="button">
              Login with Google
            </Button>
          </Field>
        </FieldGroup>
        <FieldDescription className="text-center pt-1">
          Already have an account? <a href="/login">Login</a>
        </FieldDescription>
      </form>

      {/* Terms */}
      <FieldDescription className="px-2 md:px-4 text-center text-sm text-gray-500">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline hover:text-gray-700">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-gray-700">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
