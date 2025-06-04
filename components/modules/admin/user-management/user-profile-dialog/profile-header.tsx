import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInterface } from "../user-table";

interface ProfileHeaderProps {
  user: UserInterface | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative">
        <Avatar className="h-16 sm:h-20 w-16 sm:w-20">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="profile image"
            className="border-3 rounded-full border-secondary-400"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h2 className="text-2xl sm:text-4xl font-medium">
          {"Magnus Carlsen"}
        </h2>
        <div className="inline-block px-3 py-1 rounded-full text-xs border bg-secondary-100 border-secondary-400 text-primary mt-1">
          {user?.userTypeName || "Mentor"}
        </div>
      </div>
    </div>
  );
}
