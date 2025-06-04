"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ValidateCodeMutation, ValidateCodeProps } from "@/components/queries/auth/verify-otp";
import { ResendOtpMutation, ResendOtpProps } from "@/components/queries/auth/resend-otp";

export function VerifyCodeForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("reset_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Email not found, please try again");
      router.push("/forgot-password");
    }
  }, [router]);

  const { mutate: validateCode, isPending } = useMutation({
    mutationFn: (values: ValidateCodeProps) => ValidateCodeMutation(values),
    onSuccess: (response) => {
      if (response.isSuccess) {
        sessionStorage.setItem("reset_code", code);
        
        toast.success(response.message || "Code verified successfully");
        
        router.push("/reset-password");
      } else {
        setError(response.message || "Invalid verification code");
        toast.error(response.message || "Invalid verification code");
      }
    },
    onError: (error: any) => {
      const errorMessage = error.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: (values: ResendOtpProps) => ResendOtpMutation(values),
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message || "Verification code resent successfully");
        
        setResendCooldown(60);
        
        const timer = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      } else {
        setError(response.message || "Failed to resend verification code");
        toast.error(response.message || "Failed to resend verification code");
      }
    },
    onError: (error: any) => {
      const errorMessage = error.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  });

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    if (!email) {
      setError("Email is missing, please try again");
      toast.error("Email is missing, please try again");
      router.push("/forgot-password");
      return;
    }

    validateCode({ 
      email, 
      otp: code
    });
  };

  const handleResendOtp = () => {
    if (!email) {
      setError("Email is missing, please try again");
      toast.error("Email is missing, please try again");
      router.push("/forgot-password");
      return;
    }
    
    resendOtp({ email });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-8 px-4">
      <div className="space-y-6 max-w-md mx-auto w-full">
        <div className="space-y-2 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center">
            <Image
              src="/icons/Forgot_password.png"
              alt="password icon"
              width={100}
              height={50}
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-4xl font-semibold">Reset Password</h1>
          <p className="text-grey-400">
            We sent a 6-digit code to
            <span className="font-medium"> {email || "your email"}</span> for verification
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <div className="flex justify-center py-4">
              <InputOTP 
                maxLength={6} 
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={code}
                onChange={setCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <div className="text-center mb-4">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || isResending}
              className="text-sm text-primary-400 hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 
                ? `Resend code in ${resendCooldown}s` 
                : isResending 
                  ? "Sending..." 
                  : "Didn't receive a code? Resend"}
            </button>
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending || code.length !== 6}
          >
            {isPending ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}