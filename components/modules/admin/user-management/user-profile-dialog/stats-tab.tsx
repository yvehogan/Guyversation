import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function StatsTab() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-neutral-200 text-sm mb-1 font-medium">
            Mentees
          </h3>
          <p className="text-4xl font-medium text-neutral-100">14</p>
        </div>
        <div>
          <h3 className="text-neutral-200 text-sm mb-1 font-medium">
            Pending requests
          </h3>
          <p className="text-4xl font-medium text-neutral-100">14</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-neutral-200 text-sm mb-1 font-medium">
            -
          </h3>
          <p className="text-4xl font-medium text-neutral-100">14</p>
        </div>
        <div>
          <h3 className="text-neutral-200 text-sm mb-1 font-medium">
            Communities
          </h3>
          <p className="text-4xl font-medium text-neutral-100">10</p>
        </div>
      </div>

      <div>
        <div className="flex space-x-4 mb-4 border-b border-grey-300 pb-3">
          <button className="rounded-full py-2 px-6 bg-purple-100 text-purple-600 border-purple-200">
            Mentees (14)
          </button>
          <button className="rounded-full bg-transparent border-none text-black">
            Pending requests (8)
          </button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="profile image"
                    className="rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>John Adams</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">14</span>
                <span className="text-sm">Lagos, Nigeria</span>
                <span className="text-sm">2 hours ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
