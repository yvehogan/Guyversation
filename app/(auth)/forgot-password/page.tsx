import Link from "next/link";
import Image from "next/image";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <>
      <header className="flex items-center justify-between">
        <Image
          src="/svgs/logo.svg"
          alt="Logo"
          width={100}
          height={50}
          className="h-10 w-auto"
        />
        {/* <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-100">
            Didn&apos;t get an email?
          </span>
          <Link
            href="/forgot-password"
            className="inline-flex h-9 items-center justify-center rounded-full border border-primary-400 px-4 py-2 text-sm text-primary-400 hover:bg-primary-400/10"
          >
            Resend Mail
          </Link>
        </div> */}
      </header>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>
    </>
  );
}