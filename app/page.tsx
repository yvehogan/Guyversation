import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "../components/auth/login-form";

export default function Home() {
  return (
    <main className="flex h-screen flex-col lg:flex-row">
      <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-0">
          <Image
            src="/svgs/logo.svg"
            alt="Logo"
            width={100}
            height={50}
            className="h-8 w-auto sm:h-10"
          />
        </header>
        <div className="flex flex-1 items-center justify-center mt-4 sm:mt-0">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden lg:w-1/2 lg:flex p-3 sm:p-4 md:p-6">
        <div className="rounded-t-[30px] sm:rounded-t-[45px] rounded-bl-[30px] sm:rounded-b-[45px] w-full aspect-[3/4] flex items-center justify-center overflow-hidden relative">
          <Image
            src="/svgs/onboarding.png"
            alt="Hero Image"
            fill
            className="object-cover object-top "
            priority
          />
        </div>
      </div>
    </main>
  );
}