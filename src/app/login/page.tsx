"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/schema/loginSchema";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const SearchParams = useSearchParams();
  const callbackUrl = SearchParams.get("callback-url");

  const [isLoading, setisLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setisLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl ?? "/",
      redirect: false,
    });
    console.log(response);
    if (response?.ok) {
      toast.success("Successful login");
      window.location.replace(response.url || "/");
    } else {
      toast.error("inValid email or password");
    }
    setisLoading(false);
  }

  return (
  

        <div className="w-4/5  md:w-3/4 mx-auto p-10 rounded-2xl mt-10">
      <h2 className="text-green-500 font-bold text-3xl mb-6">Login</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="email"
                    placeholder="Enter your email"
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
                  <Input
                    className="bg-white"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </Button>
          <div className="flex justify-end mt-2">
            <Link
              href="/forgot-password"
              className="text-green-600 hover:underline text-sm font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-green-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>


  );
}
