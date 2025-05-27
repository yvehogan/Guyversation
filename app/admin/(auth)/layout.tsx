import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-1 flex-col p-4 md:p-8">
        {children}
      </div>
      <div className="hidden w-1/2 lg:flex lg:p-7">
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