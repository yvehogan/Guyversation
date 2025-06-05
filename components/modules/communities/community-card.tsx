"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
  const [joined, setJoined] = useState(community.joined)
  const [requestSent, setRequestSent] = useState(community.requestSent)

  const handleJoinCommunity = () => {
    if (community.status === "open") {
      setJoined(true)
    } else {
      setRequestSent(true)
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-white p-5 rounded-lg w-full">
      {/* Community Image - First Column */}
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
          <div className="flex -space-x-2 mr-2">
            {[1, 2, 3].map((i) => (
              <Avatar key={i} className="border-2 border-white h-8 w-8">
                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Participant" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-gray-600">{community.participants} participants</span>
        </div>

        {joined ? (
          <Button variant="outline" className="rounded-full w-28" disabled>
            Joined
          </Button>
        ) : requestSent ? (
          <Button variant="outline" className="rounded-full w-32" disabled>
            Request Sent!
          </Button>
        ) : community.status === "closed" ? (
          <Button
            variant="outline"
            className="rounded-full w-32"
            onClick={handleJoinCommunity}
          >
            Request Access
          </Button>
        ) : (
          <Button
            variant="outline"
            className="rounded-full w-32"
            onClick={handleJoinCommunity}
          >
            Join Community
          </Button>
        )}
      </div>
    </div>
  )
}