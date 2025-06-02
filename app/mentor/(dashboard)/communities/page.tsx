"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CommunityCard } from "@/components/modules/communities/community-card"

type SortOption = "Size" | "Name" | "Recent"

export default function CommunitiesPage() {
  const [sortBy, setSortBy] = useState<SortOption>("Size")

  const communities = [
    {
      id: "1",
      name: "Mind Matters",
      description: "Talk about emotions, anxiety, confidence, or anything weighing on your mind.",
      status: "open",
      participants: 245,
      image: "/banner.png",
      joined: false,
      requestSent: false,
    },
    {
      id: "2",
      name: "Ask a Mentor",
      description: "For mentees to anonymously ask questions and get answers from verified mentors.",
      status: "closed",
      participants: 245,
      image: "/banner.png",
      joined: false,
      requestSent: true,
    },
    {
      id: "3",
      name: "Manhood & Identity",
      description: "Open conversations about what it means to be a man in today's world.",
      status: "open",
      participants: 245,
      image: "/banner.png",
      joined: false,
      requestSent: false,
    },
    {
      id: "4",
      name: "Manhood & Identity",
      description: "Open conversations about what it means to be a man in today's world.",
      status: "open",
      participants: 245,
      image: "/banner.png",
      joined: false,
      requestSent: false,
    },
    {
      id: "5",
      name: "Mind Matters",
      description: "Talk about emotions, anxiety, confidence, or anything weighing on your mind.",
      status: "open",
      participants: 245,
      image: "/banner.png",
      joined: false,
      requestSent: true,
    },
    {
      id: "6",
      name: "Mind Matters",
      description: "Talk about emotions, anxiety, confidence, or anything weighing on your mind.",
      status: "closed",
      participants: 245,
      image: "/banner.png",
      joined: false,
      requestSent: false,
    },
  ]

  return (
    <div className="container mx-auto py-6 flex flex-col h-full">
      <h1 className="text-4xl font-medium mb-6">Communities</h1>
      <div className="flex justify-between items-center">
        <p className="text-black text-sm">
          We&apos;ve found <span className="font-medium">133</span> communities for you
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Sort by: {sortBy} <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("Size")}>Size</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Name")}>Name</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Recent")}>Recent</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1 mb-8 ">
        {communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  )
}
