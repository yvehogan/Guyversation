"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/profile-setup");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-8 px-4">
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
          <h1 className="text-4xl font-semibold">Welcome back!</h1>
          <p className="text-grey-400">
            Please fill the details below to sign into your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-16">
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
            className="w-full bg-primary-400 hover:bg-primary-500"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}