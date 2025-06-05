"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { LoginMutation, LoginProps, LoginResponse } from "@/components/queries/auth/login";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { mutate: login, isPending } = useMutation({
    mutationFn: (values: LoginProps) => LoginMutation(values),
    onSuccess: (response: LoginResponse) => {
      if (response.isSuccess) {
        Cookies.set("GUYVERSATION_USER_ID", response.data?.userId || "");
        Cookies.set("GUYVERSATION_ACCESS_TOKEN", response.data?.accessToken || "", { expires: 7 });
        Cookies.set("GUYVERSATION_USER_EMAIL", email);

        const userRole = response.data?.role || "";
        Cookies.set("GUYVERSATION_USER_TYPE", userRole);

        toast.success(response.message);

        if (userRole === "Admin") {
          router.push("/admin/dashboard");
        } else {
          // router.push("/mentor");
          router.push("/profile-setup");
        }
      } else {
        toast.dismiss();

        if (response.message === "Please verify your email address") {
          sessionStorage.setItem("user_email", email);

          const isAdminPath = window.location.pathname.includes('/admin');
          const redirectPath = isAdminPath ? "/admin/change-password" : "/change-password";

          router.push(redirectPath);
          return;
        }

        setError(response.message);

        toast.error(response.message);

        console.log("Login error response:", response);
      }
    },
    onError: (error: any) => {
      console.error("Unhandled login error:", error);

      let errorMessage = "An unexpected error occurred";

      if (error.handled && error.error?.response?.data?.message) {
        errorMessage = error.error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      toast.error("Email and password are required.");
      return;
    }

    try {
      login({ email, password });
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="md:min-h-screen flex flex-col justify-center py-8 px-4">
      <div className="space-y-6 max-w-md mx-auto w-full">
        <div className="space-y-2 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center">
            <Image
              src="/icons/welcome.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-4xl font-semibold">
            Welcome Back
          </h1>
          <p className="text-grey-400">
            Please fill the details below to sign into your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-0 md:mt-16">
          {error && (
            <div
              className="p-3 text-sm text-red-500 bg-red-50 rounded-md"
              dangerouslySetInnerHTML={{
                __html: error === "Please verify your email address"
                  ? `Please verify your email address. <a href='${window.location.pathname.includes('/admin') ? "/admin/change-password" : "/change-password"}' class='text-primary-400 font-medium underline'>Click here to verify and set your password</a>.`
                  : error,
              }}
            />
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end mb-16">
            <Link
              href="/forgot-password"
              className="text-sm text-[#9333ea] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}