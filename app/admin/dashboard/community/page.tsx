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
import Image from "next/image";

export default function CommunityPage() {
  const [createCommunityOpen, setCreateCommunityOpen] = useState(false);
  const [deleteCommunityOpen, setDeleteCommunityOpen] = useState(false);
  const [updateCommunityOpen, setUpdateCommunityOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [sortBy, setSortBy] = useState("size");

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
      <div className="flex-1 overflow-y-auto pb-16 mt-4 md:mt-8 px-4 md:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-4xl font-medium">Communities</h1>
          <Button
            size="lg"
            className="sm:size-lg w-full sm:w-auto"
            onClick={() => setCreateCommunityOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Community
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="text-sm text-gray-500">{totalCount} communities created</div>
          <div className="flex items-center self-end sm:self-auto">
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
              <Card key={community.id} className="p-3 sm:p-4 border-none shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src="/banner.png"
                      width={200}
                      height={100}
                      alt={community.name}
                      className="w-full sm:w-16 h-32 sm:h-16 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap gap-2 items-center">
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
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2 sm:line-clamp-1">
                          {community.description}
                        </p>
                      </div>

                      <div className="flex flex-row sm:flex-col md:flex-row justify-between sm:justify-end items-center sm:items-end md:items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <Avatar className="h-6 w-6 sm:h-7 sm:w-7 border-2 border-white">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="profile image"
                                className="rounded-full"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6 sm:h-7 sm:w-7 border-2 border-white">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="profile image"
                                className="rounded-full"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6 sm:h-7 sm:w-7 border-2 border-white">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="profile image"
                                className="rounded-full"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>

                          <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                            {community.memberCount} participants
                          </span>
                        </div>

                        <div className="relative">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
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
