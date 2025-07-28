import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "../components/auth/login-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-0">
          <Image
            src="/svgs/logo.svg"
            alt="Logo"
            width={100}
            height={50}
            className="h-8 w-auto sm:h-10"
          />
          {/* <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm text-neutral-100 whitespace-nowrap">
              Don&apos;t Have An Account?
            </span>
            <Link
              href="/signup"
              className="inline-flex h-8 sm:h-9 items-center justify-center rounded-full border border-primary-400 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-primary-400 hover:bg-primary-400/10 whitespace-nowrap"
            >
              Sign Up
            </Link>
          </div> */}
        </header>
        <div className="flex flex-1 items-center justify-center mt-4 sm:mt-0">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden w-full md:w-2/5 lg:w-1/2 md:flex p-3 sm:p-4 md:p-6">
        <div className="bg-primary-200 rounded-tr-[30px] sm:rounded-tr-[45px] rounded-bl-[30px] sm:rounded-bl-[45px] flex-1 flex items-center justify-center overflow-hidden relative">
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