"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
import { CreateCommunityDialog } from "@/components/modules/admin/community/create-community-dialog";
import { DeleteCommunityDialog } from "@/components/modules/admin/community/delete-community-dialog";
import { UpdateCommunityDialog } from "@/components/modules/admin/community/update-community-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCommunitiesQuery, Community } from "@/components/queries/communities/get-communities";
import { toast } from "react-toastify";

export default function CommunityPage() {
  const [createCommunityOpen, setCreateCommunityOpen] = useState(false);
  const [deleteCommunityOpen, setDeleteCommunityOpen] = useState(false);
  const [updateCommunityOpen, setUpdateCommunityOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [sortBy, setSortBy] = useState("size");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-communities", sortBy],
    queryFn: () => GetCommunitiesQuery({
    }),
  });

  const communities = data?.data || [];
  const totalCount = data?.metaData?.totalCount || 0;

  const handleCreateCommunity = () => {
    setCreateCommunityOpen(false);
    queryClient.invalidateQueries({ queryKey: ["admin-communities"] });
  };

  const handleDeleteCommunity = (community: Community) => {
    setSelectedCommunity(community);
    setDeleteCommunityOpen(true);
  };

  const handleEditCommunity = (community: Community) => {
    setSelectedCommunity(community);
    setUpdateCommunityOpen(true);
  };

  const getBadgeStyles = (privacy: string) => {
    return privacy === "Open" 
      ? "bg-primary-200 text-primary-300 whitespace-nowrap" 
      : "bg-[#C8202012] text-warning-200 border-none whitespace-nowrap";
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto pb-16 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-medium mb-6">Communities</h1>
          <Button
            size="lg"
            onClick={() => setCreateCommunityOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Community
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-500">{totalCount} communities created</div>
          <div className="flex items-center">
            <span className="text-sm mr-2">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">Loading communities...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">Failed to load communities.</div>
        ) : communities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No communities found.</div>
        ) : (
          <div className="space-y-4">
            {communities.map((community) => (
              <Card key={community.id} className="p-4 border-none shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={community.bannerUrl || "/placeholder.svg"}
                      alt={community.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex gap-2 items-center">
                          <h3 className="text-lg font-medium">
                            {community.name}
                          </h3>
                          <Badge
                            variant={community.privacy === "Open" ? "default" : "secondary"}
                            className={getBadgeStyles(community.privacy)}
                          >
                            {community.privacy}
                          </Badge>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">
                          {community.description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          <Avatar className="h-7 w-7 border-2 border-white">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="profile image"
                              className="rounded-full"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-7 w-7 border-2 border-white">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="profile image"
                              className="rounded-full"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-7 w-7 border-2 border-white">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="profile image"
                              className="rounded-full"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>

                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {community.memberCount} participants
                        </span>

                        <div className="relative">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="cursor-pointer text-primary-400"
                                onClick={() => handleEditCommunity(community)}
                              >
                                <Edit className="mr-2 h-4 w-4 text-primary-400" />
                                Edit details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer text-warning-200"
                                onClick={() => handleDeleteCommunity(community)}
                              >
                                <Trash2 className="mr-2 h-4 w-4 text-warning-200" />
                                Delete Community
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CreateCommunityDialog
        open={createCommunityOpen}
        onOpenChange={setCreateCommunityOpen}
        onCreateCommunity={handleCreateCommunity}
      />

      {selectedCommunity && (
        <>
          <DeleteCommunityDialog
            open={deleteCommunityOpen}
            onOpenChange={setDeleteCommunityOpen}
            communityId={selectedCommunity.id}
            communityName={selectedCommunity.name}
          />
          <UpdateCommunityDialog
            open={updateCommunityOpen}
            onOpenChange={setUpdateCommunityOpen}
            community={selectedCommunity}
          />
        </>
      )}
    </>
  );
}
