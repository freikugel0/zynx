// app/(auth)/login/page.tsx
"use client";

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/inputs/input-password";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginPayload } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v1";

async function loginRequest(payload: LoginPayload) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // ↓↓↓ ini penting agar Set-Cookie dari BE masuk ke browser
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, ...json };
}

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const { mutate: login, isPending: loginIsPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Login Success", { description: res.message ?? "Welcome!" });
        // Setelah cookie terset di browser, middleware akan izinkan dashboard
        router.replace("/dashboard");
      } else {
        toast.error("Login Failed", { description: res.message ?? "Invalid credentials" });
      }
    },
    onError: (e: any) => {
      toast.error("Login Failed", { description: e?.message ?? "Network error" });
    },
  });

  const onSubmit = (val: LoginPayload) => login(val);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 bg-primary rounded-xl">
          <Image src={"/zynx.png"} alt="Zynx" width={40} height={40} className="dark:invert" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">Welcome Back</h1>
          <span>Sign in to continue to digital business card</span>
        </div>
      </div>

      <div className="rounded-2xl p-6 shadow-xl flex flex-col gap-4 min-w-md">
        <Form {...form}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword placeholder="Type your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>

        <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={loginIsPending}>
          {loginIsPending && <Spinner />}
          Submit
        </Button>

        <span className="text-center">
          Doesn&apos;t have an account?{" "}
          <Link href={"/register"} className="underline">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}