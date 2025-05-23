import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "../components/auth/login-form";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-1 flex-col p-8">
        <header className="flex items-center justify-between ">
          <Image
            src="/svgs/logo.svg"
            alt="Logo"
            width={100}
            height={50}
            className="h-10 w-auto"
          />
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-100">
              Don&apos;t Have An Account?
            </span>
            <Link
              href="/signup"
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
      </div>
      <div className="hidden w-1/2 lg:flex lg:p-6">
        <div className="bg-primary-200 rounded-tr-[45px] rounded-bl-[45px] flex-1 flex items-center justify-center overflow-hidden relative">
          <Image
            src="/svgs/onboarding.svg"
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </main>
  );
}