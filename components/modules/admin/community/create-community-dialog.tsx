import { useState } from "react";
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
  CreateCommunityMutation,
  CreateCommunityProps,
  CommunityPrivacy,
  CommunityAudience,
} from "@/components/queries/communities/create-community";
import { toast } from "react-toastify";
import Image from "next/image";

interface CreateCommunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCommunity: () => void;
}

export function CreateCommunityDialog({
  open,
  onOpenChange,
  onCreateCommunity,
}: CreateCommunityDialogProps) {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState<CommunityAudience>("Everyone");
  const [privacy, setPrivacy] = useState<CommunityPrivacy>("Open");
  const [groupLimit, setGroupLimit] = useState("100");
  const [banner, setBanner] = useState<File | null>(null);
  const [rules, setRules] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
    }
  };

  const queryClient = useQueryClient();
  const { mutate: createCommunity, isPending } = useMutation({
    mutationFn: (values: CreateCommunityProps) => CreateCommunityMutation(values),
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message || "Community created successfully!");
        resetForm();

        queryClient.invalidateQueries({ queryKey: ["admin-communities"] });
        queryClient.invalidateQueries({ queryKey: ["communities"] });

        onCreateCommunity();
        onOpenChange(false);
      } else {
        toast.error(response.message || "Failed to create community.");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred.");
    },
  });

  const resetForm = () => {
    setCommunityName("");
    setCommunityDescription("");
    setTargetAudience("Everyone");
    setPrivacy("Open");
    setGroupLimit("100");
    setBanner(null);
    setRules("");
  };

  const handleCreateCommunity = () => {
    setError("");

    if (!communityName) {
      setError("Community name is required");
      return;
    }

    createCommunity({
      name: communityName,
      description: communityDescription,
      banner,
      privacy: privacy,
      audience: targetAudience,
      rules: rules,
      limit: parseInt(groupLimit) || 100,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl rounded-[30px]">
        <DialogHeader className="border-b border-grey-500 pb-4">
          <DialogTitle className="text-4xl font-medium">
            Create Community
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 mb-4 flex justify-center">
          <label htmlFor="banner-upload" className="relative cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              {banner ? (
                <Image
                  src={URL.createObjectURL(banner)}
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
          <div className="p-3 mb-4 text-sm text-warning-200 bg-red-50 rounded-md">
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
              onValueChange={(value) => setTargetAudience(value as CommunityAudience)}
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

        <Button
          onClick={handleCreateCommunity}
          size="lg"
          className="w-1/2 mx-auto"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create community"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
