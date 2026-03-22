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
// import { loginUser } from "@/services/auth/loginUser";
// import { Eye, EyeOff } from "lucide-react";
// import { useActionState, useEffect, useState } from "react";
// import { toast } from "sonner";
// import InputFieldError from "./shared/InputFieldError";

// export function LoginForm({
//   redirect,
//   className,
//   ...props
// }: {
//   redirect?: string;
// } & React.ComponentProps<"div">) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [state, formAction, isPending] = useActionState(loginUser, null);

//   useEffect(() => {
//     if (state && !state.success && state.message) {
//       toast.error(state.message);
//     }
//   }, [state]);

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <form action={formAction}>
//         {redirect && <input type="hidden" name="redirect" value={redirect} />}
//         <FieldGroup>
//           {/* Email */}
//           <Field>
//             <FieldLabel htmlFor="email">Email</FieldLabel>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="m@example.com"
//             />
//             <InputFieldError field="email" state={state} />
//           </Field>

//           {/* Password */}
//           <Field>
//             <FieldLabel htmlFor="password">Password</FieldLabel>
//             <div className="relative">
//               <Input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="******"
//                 className="pr-10"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             <InputFieldError field="password" state={state} />
//           </Field>

//           {/* Forgot Password */}
//           <div className="flex justify-start">
//             <a href="#" className="text-sm underline-offset-4 hover:underline">
//               Forgot your password?
//             </a>
//           </div>

//           {/* Buttons */}
//           <Field className="space-y-1.5">
//             <Button type="submit" disabled={isPending}>
//               {isPending ? "Logging" : "Login"}
//             </Button>
//             <Button variant="outline" type="button">
//               Login with Google
//             </Button>

//             <FieldDescription className="text-center">
//               Don&apos;t have an account? <a href="/register">Sign up</a>
//             </FieldDescription>
//           </Field>
//         </FieldGroup>
//       </form>
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
import { loginUser } from "@/services/auth/loginUser";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";

export function LoginForm({
  redirect,
  className,
  ...props
}: {
  redirect?: string;
} & React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginUser, null);

  // ✅ Controlled inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Transition for safe state update
  const [isResetting, startTransition] = useTransition();

  useEffect(() => {
    if (!state) return;

    // ❌ Error → শুধু toast, no reset
    if (!state.success && state.message) {
      toast.error(state.message);
    }

    // ✅ Success → reset inputs safely
    if (state.success) {
      toast.success(state.message || "Login successful");

      startTransition(() => {
        setEmail("");
        setPassword("");
      });
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={formAction}>
        {redirect && <input type="hidden" name="redirect" value={redirect} />}

        <FieldGroup>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
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
                placeholder="******"
                className="pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <InputFieldError field="password" state={state} />
          </Field>

          {/* Forgot Password */}
          <div className="flex justify-start">
            <a href="#" className="text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Buttons */}
          <Field className="space-y-1.5">
            <Button type="submit" disabled={isPending || isResetting}>
              {isPending ? "Logging..." : "Login"}
            </Button>

            <Button variant="outline" type="button">
              Login with Google
            </Button>

            <FieldDescription className="text-center">
              Don&apos;t have an account? <a href="/register">Sign up</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
