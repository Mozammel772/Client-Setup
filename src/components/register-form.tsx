// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { registerUser } from "@/services/auth/registerUser";
// import { Eye, EyeOff } from "lucide-react";
// import { useActionState, useEffect, useState } from "react";
// import { toast } from "sonner";
// import InputFieldError from "./shared/InputFieldError";

// export function RegisterForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [state, formAction, isPending] = useActionState(registerUser, null);

//   useEffect(() => {
//     if (state && !state.success && state.message) {
//       toast.error(state.message);
//     }
//   }, [state]);

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <form action={formAction}>
//         <FieldGroup>
//           {/* Full Name */}
//           <Field>
//             <FieldLabel htmlFor="name">Full Name</FieldLabel>
//             <Input id="name" name="name" type="text" placeholder="John Doe" />
//             <InputFieldError field="name" state={state} />
//           </Field>

//           {/* Email */}
//           <Field>
//             <FieldLabel htmlFor="email">Email</FieldLabel>
//             <Input
//               id="email"
//               type="email"
//               name="email"
//               placeholder="m@example.com"
//             />
//             <InputFieldError field="email" state={state} />
//           </Field>

//           {/* Password & Confirm Password */}

//           {/* Password */}
//           <Field>
//             <FieldLabel htmlFor="password">Password</FieldLabel>
//             <div className="relative">
//               <Input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 className="pr-10"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             <InputFieldError field="password" state={state} />
//           </Field>

//           {/* Confirm Password */}
//           <Field>
//             <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
//             <div className="relative">
//               <Input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirm ? "text" : "password"}
//                 placeholder="Confirm your password"
//                 className="pr-10"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirm(!showConfirm)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
//               >
//                 {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             <InputFieldError field="confirmPassword" state={state} />
//           </Field>

//           <FieldDescription>
//             Must be at least 8 characters long.
//           </FieldDescription>

//           {/* Buttons */}
//           <Field className="space-y-1.5">
//             <Button
//               type="submit"
//               className="cursor-pointer"
//               disabled={isPending}
//             >
//               {isPending ? "Creating Account.." : "Create Account"}
//             </Button>
//             <Button variant="outline" type="button">
//               Login with Google
//             </Button>
//           </Field>
//         </FieldGroup>
//         <FieldDescription className="text-center pt-1">
//           Already have an account? <a href="/login">Login</a>
//         </FieldDescription>
//       </form>

//       {/* Terms */}
//       <FieldDescription className="px-2 md:px-4 text-center text-sm text-gray-500">
//         By clicking continue, you agree to our{" "}
//         <a href="#" className="underline hover:text-gray-700">
//           Terms of Service
//         </a>{" "}
//         and{" "}
//         <a href="#" className="underline hover:text-gray-700">
//           Privacy Policy
//         </a>
//         .
//       </FieldDescription>
//     </div>
//   );
// }
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
import { registerUser } from "@/services/auth/registerUser";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, isPending] = useActionState(registerUser, null);

  // ✅ Controlled inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Transition
  const [isResetting, startTransition] = useTransition();

  useEffect(() => {
    if (!state) return;

    // ❌ Error → value থাকবে
    if (!state.success && state.message) {
      toast.error(state.message);
    }

    // ✅ Success → reset সব
    if (state.success) {
      toast.success(state.message || "Account created successfully");

      startTransition(() => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      });
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={formAction}>
        <FieldGroup>
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputFieldError field="name" state={state} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <InputFieldError field="password" state={state} />
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                className="pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <InputFieldError field="confirmPassword" state={state} />
          </Field>

          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>

          {/* Buttons */}
          <Field className="space-y-1.5">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isPending || isResetting}
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

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
