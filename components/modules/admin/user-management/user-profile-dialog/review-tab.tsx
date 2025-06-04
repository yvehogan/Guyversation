import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ReviewTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-primary-200 p-4 rounded-2xl">
          <p className="text-neutral-100 text-sm font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="profile image"
                className="rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-neutral-100">
                Shinske Nakamura
              </div>
              <div className="text-xs font-light text-neutral-100">
                Lagos, Nigeria
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
