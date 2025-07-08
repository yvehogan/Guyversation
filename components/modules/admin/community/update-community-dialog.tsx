import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import {
  UpdateCommunityMutation,
  UpdateCommunityProps,
} from "@/components/queries/communities/update-community";
import {
  CommunityPrivacy,
  CommunityAudience,
} from "@/components/queries/communities/create-community";
import { Community } from "@/components/queries/communities/get-communities";
import { toast } from "react-toastify";
import Image from "next/image";

interface UpdateCommunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  community: Community | null;
}

export function UpdateCommunityDialog({
  open,
  onOpenChange,
  community,
}: UpdateCommunityDialogProps) {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [targetAudience, setTargetAudience] =
    useState<CommunityAudience>("Everyone");
  const [privacy, setPrivacy] = useState<CommunityPrivacy>("Open");
  const [groupLimit, setGroupLimit] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [rules, setRules] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (community && open) {
      setCommunityName(community.name || "");
      setCommunityDescription(community.description || "");
      setTargetAudience(
        (community.audience || "Everyone") as CommunityAudience
      );
      setPrivacy((community.privacy || "Open") as CommunityPrivacy);
      setPreviewUrl(community.bannerUrl);
      setBanner(null);
    }
  }, [community, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBanner(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const queryClient = useQueryClient();
  const { mutate: updateCommunity, isPending } = useMutation({
    mutationFn: (values: UpdateCommunityProps) =>
      UpdateCommunityMutation(values),
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message || "Community updated successfully!");

        queryClient.invalidateQueries({ queryKey: ["admin-communities"] });
        queryClient.invalidateQueries({ queryKey: ["communities"] });

        onOpenChange(false);
      } else {
        toast.error(response.message || "Failed to update community.");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred.");
    },
  });

  const handleUpdateCommunity = () => {
    setError("");

    if (!communityName) {
      setError("Community name is required");
      return;
    }

    if (!community?.id) {
      setError("Community ID is missing");
      return;
    }

    updateCommunity({
      id: community.id,
      name: communityName,
      description: communityDescription,
      banner: banner,
      privacy: privacy,
      audience: targetAudience,
      rules: rules,
      limit: parseInt(groupLimit) || 100,
    });
  };

  if (!community) {
    return null;
  }

  return (
<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl rounded-[30px] max-h-[85vh] md:max-h-[95vh] overflow-y-auto">
        <DialogHeader className="border-b border-grey-500 pb-4">
          <DialogTitle className="text-4xl font-medium">
            Update Community
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 mb-4 flex justify-center">
          <label htmlFor="banner-upload" className="relative cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  width={40}
                  height={40}
                  alt="Banner preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Upload className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1">
              <Plus className="h-4 w-4" />
            </div>
            <input
              id="banner-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="community-name">Community Name</Label>
            <Input
              id="community-name"
              placeholder="Community Name"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              className="mt-1 w-full"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="target-audience">Target Audience</Label>
            <Select
              value={targetAudience}
              onValueChange={(value) =>
                setTargetAudience(value as CommunityAudience)
              }
            >
              <SelectTrigger id="target-audience" className="mt-1 w-full">
                <SelectValue placeholder="Select Target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mentees">Mentees</SelectItem>
                <SelectItem value="Mentors">Mentors</SelectItem>
                <SelectItem value="Everyone">Everyone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description takes half width */}
          <div className="col-span-2 sm:col-span-1 mt-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              value={communityDescription}
              onChange={(e) => setCommunityDescription(e.target.value)}
              className="mt-1 h-full min-h-[150px]"
            />
          </div>

          {/* Privacy and Group Limit in a column */}
          <div className="col-span-2 sm:col-span-1 grid gap-7 mt-3">
            <div>
              <Label htmlFor="privacy">Privacy</Label>
              <Select
                value={privacy}
                onValueChange={(value) => setPrivacy(value as CommunityPrivacy)}
              >
                <SelectTrigger id="privacy" className="mt-1 w-full">
                  <SelectValue placeholder="Select Privacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="group-limit">Group Limit</Label>
              <Input
                id="group-limit"
                type="number"
                placeholder="Insert number only"
                value={groupLimit}
                onChange={(e) => setGroupLimit(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>

          <div className="col-span-2 mt-5">
            <Label htmlFor="rules">Community Rules</Label>
            <Textarea
              id="rules"
              placeholder="Community Rules and Guidelines"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className="mt-1 w-full"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            size="lg"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateCommunity}
            size="lg"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Community"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
