import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoLogOut } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

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
      
      toast.success("Logged out successfully");
      
      const isAdmin = window.location.pathname.includes('/admin');
      
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
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
          <IoLogOut className="h-8 w-8"/> Logout
        </button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? All unsaved data will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoggingOut}>
              Cancel
            </Button>
           
            <Button variant="destructive" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};