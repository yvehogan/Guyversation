import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-1 flex-col p-8">{children}</div>
      <div className="hidden lg:w-1/2 lg:flex p-3 sm:p-4 md:p-6">
        <div className="rounded-t-[30px] sm:rounded-t-[45px] rounded-bl-[30px] sm:rounded-b-[45px] w-full aspect-[3/4] flex items-center justify-center overflow-hidden relative">
          <Image
            src="/svgs/onboarding.png"
            alt="Hero Image"
            fill
            className="object-contain object-top "
            priority
          />
        </div>
      </div>
    </main>
  );
}
