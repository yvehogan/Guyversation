import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface HeaderProps {
  email: string;
}

export function ProfileHeader({ email }: HeaderProps) {
  return (
    <header className="bg-white py-4 px-4">
      <div className="flex flex-col md:flex-row items-center  justify-between max-w-6xl mx-auto">
        <Image
          src="/svgs/logo.svg"
          alt="Logo"
          width={100}
          height={50}
          className="h-10 w-auto"
        />
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <span className="text-sm text-black">{email}</span>
      </div>
      </div>
    </header>
  );
}
