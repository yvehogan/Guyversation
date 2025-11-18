import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoLogOut } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Image from "next/image";

export const SidebarUser = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    try {
      Cookies.remove("GUYVERSATION_ACCESS_TOKEN");
      Cookies.remove("GUYVERSATION_USER_ID");
      Cookies.remove("GUYVERSATION_USER_TYPE");

      setOpen(false);

      setTimeout(() => {
        toast.success("Logged out successfully");
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout");
      setIsLoggingOut(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex h-16 min-h-16 w-full items-center justify-">
      <div className="flex px-7 items-center w-full">
        <button
          className="text-warning-200 flex items-center gap-2 text-lg font-light"
          onClick={() => setOpen(true)}
        >
          <IoLogOut className="h-8 w-8" /> Logout
        </button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <Image
              src="/svgs/question.svg"
              width={100}
              height={100}
              alt="Confirm Logout"
              className="mx-auto mb-4"
            />
            <DialogDescription className="text-lg font-medium text-center">
              {Cookies.get("GUYVERSATION_USER_TYPE") === "Mentor"
                ? "Sure you want to head out? Your mentees might miss you."
                : "Are you sure you want to logout? All unsaved data will be lost."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-2 mt-4">
            <Button
            className="w-1/2 py-5"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>
            <Button
            className="w-1/2 py-5"
              variant="destructive"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
