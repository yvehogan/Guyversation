"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CommunityCard } from "@/components/modules/communities/community-card"
import { GetCommunitiesQuery, AudienceEnums } from "@/components/queries/mentor/get-communities"
import { LoadingOverlay } from "@/components/ui/loading-overlay"

type SortOption = "Size" | "Name" | "Recent"

export default function CommunitiesPage() {
  const [sortBy, setSortBy] = useState<SortOption>("Size")
  const [communities, setCommunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true)
      const response = await GetCommunitiesQuery({ audience: "Mentors" })
      setCommunities(
        response.data.communities.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          status: c.privacy === 1 ? "open" : "closed",
          participants: c.memberCount,
          image: c.bannerUrl || "/banner.png",
          joined: false,
          requestSent: false,
        }))
      )
      setLoading(false)
    }
    fetchCommunities()
  }, [])

  return (
    <div className="relative w-full">
      {/* Overlay loading state */}
      {loading && <LoadingOverlay text="Loading communities..." />}

      <div className="py-6 flex flex-col h-full w-full px-0">
        <h1 className="text-4xl font-medium mb-6">Communities</h1>
        <div className="flex justify-between items-center mb-5">
          <p className="text-black text-sm">
            We&apos;ve found <span className="font-medium">{communities.length}</span> communities for you
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

        <div className="space-y-4 overflow-y-auto mb-32 md:mb-12 h-full w-full">
          {loading ? (
            <div className="text-center py-10 text-lg">Loading communities...</div>
          ) : (
            communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
