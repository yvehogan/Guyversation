import * as React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

function Input({ className, type, wrapperClassName, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  
  const inputType = type === "password" && showPassword ? "text" : type

  if (type === "password") {
    return (
      <div className={cn("relative flex items-center", wrapperClassName)}>
        <input
          type={inputType}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border border-[0.5px] bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus:border-[#DEEFFF] focus:ring-[#DEEFFF]/50 focus:ring-[0.5px] focus-visible:outline-none focus-visible:ring-[1px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "pr-10",
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    )
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border border-[0.5px] bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-[#DEEFFF] focus:ring-[#DEEFFF]/50 focus:ring-[0.5px] focus-visible:outline-none focus-visible:ring-[1px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }