"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

import { ADMIN_DASHBOARD_LINKS } from "@/constants/dashboard";
import { cn } from "@/lib/utils";
import { SidebarUser } from "@/components/shared/sidebar-user";

export const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (href: string) => {
    if (href === "/admin/dashboard" && pathname === "/admin/dashboard") {
      return true;
    }
    if (href !== "/admin/dashboard") {
      return pathname?.startsWith(href);
    }
    return false;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar} 
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary-100 p-2 rounded-full"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div className={cn(
        "fixed lg:static h-screen z-40 py-8 bg-white rounded-[20px] transition-all duration-300",
        isOpen ? "translate-x-0 w-[250px]" : "-translate-x-full w-0 overflow-hidden",
        "lg:translate-x-0 lg:w-[266px] lg:space-y-6 lg:overflow-visible"
      )}>
        <div className="flex justify-center w-full h-[40px] items-center px-4 mb-8 lg:mb-14">
          <Image src="/svgs/logo.svg" alt="SODC Logo" width={150} height={40} className="w-auto h-auto" />
        </div>
        <div className="flex h-[calc(100vh-246px)] w-full flex-col justify-between px-4">
          <div className="w-full space-y-2 lg:space-y-3">
            {ADMIN_DASHBOARD_LINKS.map(({ href, icon: Icon, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex h-12 lg:h-14 items-center gap-x-3 lg:gap-x-4 rounded-md px-3 text-base lg:text-lg font-light",
                    active
                      ? "bg-[#7B20C8] text-white"
                      : "hover:bg-primary-100/25 text-[#2B2B2B]",
                  )}
                >
                  <Icon className={cn("size-6 lg:size-7", active ? "text-white" : "text-[#9E9E9E]")} /> 
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={cn(
          "px-4",
          isOpen ? "block" : "hidden lg:block"
        )}>
          <SidebarUser />
        </div>
      </div>
    </>
  );
};