"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


export interface MenteeRequest {
  id: string;
  name: string;
  age: number;
  location: string;
  time: string;
  avatar: string;
  goal: string;
  careerPath: string;
  interests: string[];
  socials: {
    twitter?: string;
    linkedin?: string;
  };
}

interface RequestsListProps {
  onViewRequest: (request: MenteeRequest) => void
}

const requests = [
  {
    id: "1",
    name: "John Adams",
    age: 14,
    location: "Lagos, Nigeria",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    careerPath: "Product Manager",
    interests: ["Technology", "Design"],
    socials: {
      twitter: "Alex Hamilton",
      linkedin: "Alexander Hamilton",
    },
  },
  {
    id: "2",
    name: "John Adams",
    age: 14,
    location: "Lagos, Nigeria",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    careerPath: "Product Manager",
    interests: ["Technology", "Design"],
    socials: {
      twitter: "Alex Hamilton",
      linkedin: "Alexander Hamilton",
    },
  },
  {
    id: "3",
    name: "John Adams",
    age: 14,
    location: "Lagos, Nigeria",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    careerPath: "Product Manager",
    interests: ["Technology", "Design"],
    socials: {
      twitter: "Alex Hamilton",
      linkedin: "Alexander Hamilton",
    },
  },
  {
    id: "4",
    name: "John Adams",
    age: 14,
    location: "Lagos, Nigeria",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    careerPath: "Product Manager",
    interests: ["Technology", "Design"],
    socials: {
      twitter: "Alex Hamilton",
      linkedin: "Alexander Hamilton",
    },
  },
  {
    id: "5",
    name: "John Adams",
    age: 14,
    location: "Lagos, Nigeria",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    careerPath: "Product Manager",
    interests: ["Technology", "Design"],
    socials: {
      twitter: "Alex Hamilton",
      linkedin: "Alexander Hamilton",
    },
  },
  {
    id: "6",
    name: "John Adams",
    age: 14,
    location: "Lagos, Nigeria",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    careerPath: "Product Manager",
    interests: ["Technology", "Design"],
    socials: {
      twitter: "Alex Hamilton",
      linkedin: "Alexander Hamilton",
    },
  },
  {
    id: "7",
    name: "John Adams",
    age: 14,
    location: "Lagos, Nigeria",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    careerPath: "Product Manager",
    interests: ["Technology", "Design"],
    socials: {
      twitter: "Alex Hamilton",
      linkedin: "Alexander Hamilton",
    },
  },
]

export function RequestsList({ onViewRequest }: RequestsListProps) {
  return (
    <div className="flex flex-col h-full whitespace-nowrap">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full table-fixed">
              <thead className="bg-neutral-100 text-white">
                <tr>
                  <th className="py-4 px-6 md:px-4 w-16 text-left font-medium"></th>
                  <th className="py-4 px-6 md:px-4 w-1/3 text-left font-medium">Name</th>
                  <th className="py-4 px-6 md:px-4 w-16 text-right font-medium">Age</th>
                  <th className="py-4 px-6 md:px-4 w-1/4 text-left font-medium">Location</th>
                  <th className="py-4 px-6 md:px-4 w-1/6 text-left font-medium">Time</th>
                  <th className="py-4 px-6 md:px-4 w-1/6 text-right font-medium"></th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto flex-1">
        <table className="min-w-full table-fixed">
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-6 px-4 w-16 text-gray-500">{index + 1}</td>
                <td className="py-6 px-4 w-1/3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={request.avatar || "/placeholder.svg"}
                        alt={request.name}
                      />
                      <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{request.name}</span>
                  </div>
                </td>
                <td className="py-6 px-4 w-16 text-right">{request.age}</td>
                <td className="py-6 px-4 w-1/4">{request.location}</td>
                <td className="py-6 px-4 w-1/6">{request.time}</td>
                <td className="py-6 px-4 w-1/6 text-right">
                  <Button
                    variant="outline"
                    className=""
                    onClick={() => onViewRequest(request)}
                  >
                    View Request
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
