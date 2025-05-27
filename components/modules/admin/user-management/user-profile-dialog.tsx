import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LinkIcon } from "lucide-react";
import { UserInterface } from "./user-table";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserInterface | null;
  isRequest?: boolean;
  onAcceptRequest?: () => void;
}

export function UserProfileDialog({
  open,
  onOpenChange,
  user,
  isRequest = false,
  onAcceptRequest,
}: UserProfileDialogProps) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[550px] flex flex-col overflow-y-auto max-h-[95vh] w-[90vw] sm:w-auto"
        style={{
          transform: "translate(-50%, -50%)",
          position: "fixed",
          top: "97%",
          left: "98%",
          margin: 0,
        }}
      >
        <div className="pb-6">
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
                {user?.type || "Mentor"}
              </div>
            </div>
          </div>

          <div className="border-b mb-6 overflow-x-auto">
            <div className="flex space-x-6 sm:space-x-8 min-w-max">
              <button
                className={`pb-2 px-1 ${
                  activeTab === "profile"
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : "text-neutral-100"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`pb-2 px-1 ${
                  activeTab === "sessions"
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : "text-neutral-100"
                }`}
                onClick={() => setActiveTab("sessions")}
              >
                Sessions
              </button>
              <button
                className={`pb-2 px-1 ${
                  activeTab === "stats"
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : "text-neutral-100"
                }`}
                onClick={() => setActiveTab("stats")}
              >
                Stats
              </button>
              <button
                className={`pb-2 px-1 ${
                  activeTab === "review"
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : "text-neutral-100"
                }`}
                onClick={() => setActiveTab("review")}
              >
                Review
              </button>
            </div>
          </div>

          {activeTab === "profile" && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-base font-medium mb-2">About</h3>
                <p className="text-black font-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim adLorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed diam nonummy nibh
                  euismod tincidunt ut laoreet dolore magna aliquam erat
                  volutpat. Ut wisi enim adLorem ipsum dolor sit amet,
                  consectetur adipiscing
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-2">
                    Preferred Channel
                  </h3>
                  <p className="text-black font-light">Chat, Video call</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Language</h3>
                  <p className="text-black font-light">English, French</p>
                </div>
              </div>

              <div>
                <h3 className="text-black font-medium mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800">
                    Boy-Child Advocate
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800">
                    Therapist
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800">
                    Tech Executive
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Credentials</h3>
                <div className="flex flex-col md:flex-row gap-2">
                  <a
                    href="#"
                    className="px-3 py-2 rounded-full text-sm border border-primary-400 text-black bg-primary-200 flex items-center"
                  >
                    <LinkIcon className="h-3 w-3 mr-1" />
                    https://www.magnuscarlsen.com
                  </a>
                  <a
                    href="#"
                    className="px-3 py-2 rounded-full text-sm border border-primary-400 text-black bg-primary-200 flex items-center"
                  >
                    <LinkIcon className="h-3 w-3 mr-1" />
                    https://www.carlsenmagnus.com
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Socials</h3>
                <div className="flex gap-2">
                  <a href="#" className="flex gap-1 items-center">
                    <FaLinkedinIn className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
                    Magnus
                  </a>
                  <a href="#" className="flex gap-1 items-center ml-4">
                    <BsTwitterX className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
                    Magnus
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
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
          )}

          {activeTab === "sessions" && (
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-neutral-200 text-sm mb-1">
                    Completed Sessions
                  </h3>
                  <p className="text-4xl font-medium text-neutral-100">14</p>
                </div>
                <div>
                  <h3 className="text-neutral-200 text-sm mb-1">
                    Cancelled Sessions
                  </h3>
                  <p className="text-4xl font-medium text-neutral-100">14</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-neutral-200 text-sm mb-1">
                    Pending Sessions
                  </h3>
                  <p className="text-4xl font-medium text-neutral-100">14</p>
                </div>
                <div>
                  <h3 className="text-neutral-200 text-sm mb-1">-</h3>
                  <p className="text-4xl font-medium text-neutral-100">10</p>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium mb-4 text-neutral-100">
                  Available sessions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {["Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
                    <div
                      key={day}
                      className="border border-secondary-500 bg-secondary-800 rounded-md p-3 text-center"
                    >
                      <div className="font-medium text-neutral-100">{day}</div>
                      <div className="text-xs text-secondary-500">5 slots</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Friday", "Saturday", "Sunday"].map((day) => (
                    <div
                      key={day}
                      className="border rounded-md p-3 text-center"
                    >
                      <div className="font-medium">{day}</div>
                      <div className="text-xs text-gray-500">5 slots</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium mb-4">
                  Available time slots
                </h3>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="border rounded-full py-2 px-4 text-center"
                    >
                      <div className="text-sm">7:30 PM</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="border rounded-full py-2 px-4 text-center"
                    >
                      <div className="text-sm">7:30 PM</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "review" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-primary-200 p-4 rounded-2xl">
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

              <div className="bg-primary-200 p-4 rounded-2xl">
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

              <div className="bg-primary-200 p-4 rounded-2xl">
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

              <div className="bg-primary-200 p-4 rounded-2xl">
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
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
