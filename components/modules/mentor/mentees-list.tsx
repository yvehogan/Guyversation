"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AcceptedMentee, GetAcceptedMenteesQuery } from "@/components/queries/mentor/get-mentees-list";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

interface MenteesListProps {
  onViewProfile: (mentee: AcceptedMentee) => void;
  onChatWithMentee: (mentee: AcceptedMentee) => void;
}

export function MenteesList({ onViewProfile, onChatWithMentee }: MenteesListProps) {
  const [mentees, setMentees] = useState<AcceptedMentee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentees = async () => {
      setLoading(true);
      const response = await GetAcceptedMenteesQuery();
      if (response.isSuccess && response.data.mentees) {
        setMentees(response.data.mentees);
      }
      setLoading(false);
    };
    fetchMentees();
  }, []);

  if (loading) {
    return (
      <LoadingOverlay />
    );
  }

  if (mentees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-gray-500">No accepted mentees found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[550px] min-h-[550px] max-h-[550px] whitespace-nowrap overflow-y-auto">
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
                  <th className="py-4 px-6 md:px-4 w-1/6 text-left font-medium">Email</th>
                  <th className="py-4 px-6 md:px-4 w-1/6 text-right font-medium"></th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto flex-1">
        <table className="min-w-full table-fixed text-neutral-100">
          <tbody>
            {mentees.map((mentee, index) => (
              <tr
                key={mentee.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 w-8">{index + 1}</td>
                <td className="py-4 px-4 w-1/3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={mentee.avatar || "/placeholder.svg"}
                        alt={mentee.name}
                      />
                      <AvatarFallback>{mentee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{mentee.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 w-16 text-right">{mentee.age ?? "N/A"}</td>
                <td className="py-4 px-4 w-1/4">{mentee.location ?? "N/A"}</td>
                <td className="py-4 px-4 w-1/6">{mentee.email ?? "N/A"}</td>
                <td className="py-4 px-4 w-1/6 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProfile(mentee)}
                    className="py-5 px-3"
                  >
                    View Profile
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
