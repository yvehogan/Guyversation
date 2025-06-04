"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ChangeDefaultPasswordMutation, ChangeDefaultPasswordProps } from "@/components/queries/auth/change-default-password";
import Cookies from "js-cookie";

export function ChangePasswordForm({ userType = "" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserType = sessionStorage.getItem("user_type") || Cookies.get("GUYVERSATION_USER_TYPE") || userType;
    const userId = Cookies.get("GUYVERSATION_USER_ID");
    const userEmail = sessionStorage.getItem("user_email") || "";
    if (userEmail) {
      setEmail(userEmail);
    }

    const passwordChangeRequired = sessionStorage.getItem("password_change_required");
    if (passwordChangeRequired === "true") {
      setIsFirstTimeLogin(true);
      sessionStorage.removeItem("password_change_required");
    }
  }, [userType]);

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: (values: ChangeDefaultPasswordProps) => ChangeDefaultPasswordMutation(values),
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message || "Password changed successfully");
        
        Cookies.remove("GUYVERSATION_ACCESS_TOKEN");
        Cookies.remove("GUYVERSATION_USER_ID");
        
        const isAdminPath = window.location.pathname.includes('/admin');
        const loginPath = isAdminPath ? "/admin" : "/";
        
        toast.info("Please log in with your new password");
        
        router.push(loginPath);
      } else {
        setError(response.message || "Failed to change password");
        toast.error(response.message || "Failed to change password");
      }
    },
    onError: (error: any) => {
      console.error("Error changing password:", error);
      const errorMessage = error.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !defaultPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      toast.error("New passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (newPassword === defaultPassword) {
      setError("New password must be different from default password");
      toast.error("New password must be different from default password");
      return;
    }
    
    try {
      changePassword({
        email,
        defaultPassword,
        newPassword,
        confirmPassword
      });
    } catch (err) {
      console.error("Error submitting password change:", err);
      setError("Failed to change password. Please try again.");
      toast.error("Failed to change password. Please try again.");
    }
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
          <h1 className="text-4xl font-semibold">
            {isFirstTimeLogin ? "Set New Password" : "Change Password"}
          </h1>
          <p className="text-grey-400">
            {isFirstTimeLogin 
              ? "Please set a secure password for your account." 
              : "Please fill the details below to change your password."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mt-16">
          {error && (
            <div className="p-3 text-sm text-warning-200 bg-red-50 rounded-md">
              {error}
            </div>
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
            <Label htmlFor="defaultPassword">
              {isFirstTimeLogin ? "Default Password" : "Current Password"}
            </Label>
            <Input
              id="defaultPassword"
              placeholder="Enter Password"
              type="password"
              value={defaultPassword}
              onChange={(e) => setDefaultPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Your New Password</Label>
            <Input
              id="newPassword"
              placeholder="Enter Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="Enter Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            size='lg'
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Processing..." : (isFirstTimeLogin ? "Set Password" : "Submit")}
          </Button>
        </form>
      </div>
    </div>
  );
}