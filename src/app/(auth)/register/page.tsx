"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema } from "@/schemas/auth.schema";
import { RegisterPayload } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerAction } from "../actions";
import { toast } from "sonner";
import InputPassword from "@/components/inputs/input-password";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: register, isPending: registerIsPending } = useMutation({
    mutationFn: registerAction,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Register Success", {
          description: `${res?.data?.email} is successfully registered`,
        });
        router.replace("/verify-email");
      } else {
        toast.error("Register Failed", {
          description: res.message,
        });
      }
    },
  });

  const onSubmit = (val: RegisterPayload) => {
    register(val);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 bg-primary rounded-xl">
          <Image
            src={"/zynx.png"}
            alt="Zynx"
            width={40}
            height={40}
            className="dark:invert"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">Register your account</h1>
          <span>Sign up to start creating your digital card</span>
        </div>
      </div>
      <div className="rounded-2xl p-6 shadow-xl flex flex-col gap-4 min-w-md">
        <Form {...form}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="john12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="name@example.com"
                      {...field}
                    />
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
                    <InputPassword
                      placeholder="Type your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="Repeat your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
        <Button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={registerIsPending}
        >
          {registerIsPending && <Spinner />}
          Submit
        </Button>
        <span className="text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="underline">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}
