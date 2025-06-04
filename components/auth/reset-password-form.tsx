"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ResetPasswordMutation, ResetPasswordProps } from "@/components/queries/auth/reset-password";

export function ResetPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("reset_email");
    const storedCode = sessionStorage.getItem("reset_code");
    
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Email not found, please try again");
      router.push("/forgot-password");
      return;
    }
    
    if (storedCode) {
      setOtp(storedCode);
    } else {
      toast.error("Verification code not found, please try again");
      router.push("/verify-code");
    }
  }, [router]);

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (values: ResetPasswordProps) => ResetPasswordMutation(values),
    onSuccess: (response) => {
      if (response.isSuccess) {
        sessionStorage.removeItem("reset_email");
        sessionStorage.removeItem("reset_code");
        
        toast.success(response.message || "Password reset successful");
        
        const isAdminPath = window.location.pathname.includes('/admin');
        const loginPath = isAdminPath ? "/admin" : "/";
        
        setTimeout(() => {
          router.push(loginPath);
        }, 1500);
      } else {
        setError(response.message || "Failed to reset password");
        toast.error(response.message || "Failed to reset password");
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
    
    if (!newPassword || !confirmPassword) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      toast.error("Passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      toast.error("Password must be at least 8 characters long");
      return;
    }
    resetPassword({
      email,
      newPassword,
      otp
    });
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
          <h1 className="text-4xl font-semibold">Reset Password</h1>
          <p className="text-grey-400">
            Please enter your new password below
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-16">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              placeholder="Enter new password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 mb-16">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
