"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { MENTOR_DASHBOARD_LINKS } from "@/constants/dashboard";
import { normalize } from "@/lib/string";
import { cn } from "@/lib/utils";
import { SidebarUser } from "@/components/shared/sidebar-user";

export const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => href === normalize(pathname ?? '');

  return (
    <>
      <div className="h-screen w-[266px] space-y-6 py-8 bg-white rounded-[20px]">
        <div className="flex justify-center w-full h-[40px] items-center px-4 mb-14">
          <Image src="/svgs/logo.svg" alt="SODC Logo" width={200} height={50} />
        </div>
        <div className="flex h-[calc(100vh-246px)] w-full flex-col justify-between px-4">
          <div className="w-full space-y-3">
            {MENTOR_DASHBOARD_LINKS.map(({ href, icon: Icon, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "flex h-14 items-center gap-x-4 rounded-md px-3 text-lg font-light",
                    active
                      ? "bg-[#7B20C8] text-white"
                      : "hover:bg-primary-100/25 text-[#2B2B2B]",
                  )}
                >
                  <Icon className={cn("size-7", active ? "text-white" : "text-[#9E9E9E]")} /> {label}
                </Link>
              );
            })}
          </div>
        </div>
        <SidebarUser />
      </div>
    </>
  );
};