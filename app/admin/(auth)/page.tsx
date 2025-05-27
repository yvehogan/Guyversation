import { LoginForm } from "@/components/modules/admin/login-form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <header className="flex flex-col gap-2 items-center justify-between">
        <Image
          src="/svgs/logo.svg"
          alt="Logo"
          width={100}
          height={50}
          className="h-7 w-auto sm:h-10 sm:w-auto"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-100">
            Don&apos;t have an account?
          </span>
          <Link
            href="/admin"
            className="inline-flex h-9 items-center justify-center rounded-full border border-primary-400 px-4 py-2 text-sm text-primary-400 hover:bg-primary-400/10"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default page;
