"use client";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ForgotPasswordMutation, ForgotPasswordProps } from "@/components/queries/auth/forgot-password";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: (values: ForgotPasswordProps) => ForgotPasswordMutation(values),
    onSuccess: (response) => {
      if (response.isSuccess) {
        sessionStorage.setItem("reset_email", email);
        
        toast.success(response.message || "Reset link sent to your email");
        
        router.push("/verify-code");
      } else {
        setError(response.message || "Failed to send reset link");
        toast.error(response.message || "Failed to send reset link");
      }
    },
    onError: (error: any) => {
      const errorMessage = error.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Email address is required");
      toast.error("Email address is required");
      return;
    }

    forgotPassword({ email });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-8 px-4">
      <div className="space-y-6 max-w-md mx-auto w-full">
        <div className="space-y-2 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center">
            <Image
              src="/icons/forgot_password.png"
              alt="Logo"
              width={100}
              height={50}
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-4xl font-semibold">Forgot your password?</h1>
          <p className="text-grey-400">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-16">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2 mb-24">
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
          <Button
            type="submit"
            size='lg'
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
}