import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeleteCommunityMutation } from "@/components/queries/communities/delete-community";
import { toast } from "react-toastify";
import Image from "next/image";

interface DeleteCommunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  communityId: string;
  communityName: string;
}

export function DeleteCommunityDialog({
  open,
  onOpenChange,
  communityId,
  communityName,
}: DeleteCommunityDialogProps) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deleteCommunity } = useMutation({
    mutationFn: () => DeleteCommunityMutation(communityId),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message || "Community deleted successfully");

        queryClient.invalidateQueries({ queryKey: ["admin-communities"] });
        queryClient.invalidateQueries({ queryKey: ["communities"] });

        onOpenChange(false);
      } else {
        toast.error(response.message || "Failed to delete community");
      }
      setIsLoading(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred");
      setIsLoading(false);
    },
  });

  const handleDelete = () => {
    deleteCommunity();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <Image
            src="/svgs/question.svg"
            width={130}
            height={130}
            alt="Confirm Request"
            className="mx-auto mb-4"
          />
          <DialogTitle className="text-center text-xl font-semibold pt-4">
            Delete Community
          </DialogTitle>
          <DialogDescription className="text-center pt-1">
            Are you sure you want to delete{" "}
            <span className="font-medium">{communityName}</span>? This action
            cannot be undone and all community data will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Community"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
