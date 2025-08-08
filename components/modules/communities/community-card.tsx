"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { toast } from "react-toastify"
import { JoinCommunityMutation } from "@/components/queries/communities/join-community"
import { useRouter } from "next/navigation"

interface CommunityCardProps {
  community: {
    id: string
    name: string
    description: string
    status: string
    participants: number
    image: string
    joined: boolean
    requestSent: boolean
  }
}

export function CommunityCard({ community }: CommunityCardProps) {
  const router = useRouter()
  const [joined, setJoined] = useState(community.joined)
  const [requestSent, setRequestSent] = useState(community.requestSent)
  const [loading, setLoading] = useState(false)

  const handleJoinCommunity = async () => {
    try {
      setLoading(true);
      const response = await JoinCommunityMutation(community.id);
      
      if (response.isSuccess) {
        toast.success(response.message || "Successfully joined community");
        
        if (community.status === "open") {
          setJoined(true);
        } else {
          setRequestSent(true);
        }
      } else {
        toast.error(response.message || "Failed to join community");
      }
    } catch (error) {
      toast.error("An error occurred while joining the community");
      console.error("Join community error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleViewCommunity = () => {
    router.push(`/mentor/communities/${community.id}`)
  }

  const getButtonContent = () => {
    if (community.joined) {
      return {
        text: "View Community",
        onClick: handleViewCommunity,
        className: "border border-primary-400 text-primary-400 bg-white hover:bg-grey-50"
      }
    }
    
    if (community.requestSent) {
      return {
        text: "Request Sent",
        onClick: () => {},
        className: "bg-gray-300 text-gray-600 cursor-not-allowed"
      }
    }
    
    return {
      text: community.status === "open" ? "Join" : "Request to Join",
      onClick: handleJoinCommunity,
      className: "border border-primary-400 text-primary-400 bg-white hover:bg-grey-50"
    }
  }

  const buttonConfig = getButtonContent()

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-white p-5 rounded-lg w-full">
      <div className="flex gap-5 items-center">
        <Link href={`/dashboard/communities/${community.id}`}>
          <div className="h-16 w-16 rounded-lg overflow-hidden">
            <Image
              src={community.image || "/placeholder.svg"}
              alt={community.name}
              height={64}
              width={64}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <Link href={`/dashboard/communities/${community.id}`} className="text-xl font-medium hover:underline truncate">
            {community.name}
          </Link>
          <Badge
            variant={community.status === "open" ? "default" : "secondary"}
            className={
              community.status === "open"
                ? "bg-primary-200 text-primary-300 whitespace-nowrap"
                : "bg-[#C8202012] text-warning-200 border-none whitespace-nowrap"
            }
          >
            {community.status === "open" ? "Open" : "Closed"}
          </Badge>
        </div>
        <p className="text-neutral-200 text-xs line-clamp-2">{community.description}</p>
      </div>
      </div>

      {/* Actions - Third Column */}
      <div className="flex flex- items-end gap-10">
        <div className="flex items-center whitespace-nowrap">
          <span className="text-sm text-gray-600">{community.participants} participants</span>
        </div>
        <Button
          onClick={buttonConfig.onClick}
          className={`px-6 py-2 rounded-full ${buttonConfig.className}`}
          disabled={community.requestSent}
        >
          {buttonConfig.text}
        </Button>
      </div>
    </div>
  )
}