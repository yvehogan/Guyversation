"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GetMenteeRequestsQuery, MenteeRequest } from "@/components/queries/mentor/get-mentee-requests";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface RequestNotificationsProps {
  requests?: MenteeRequest[];
  onViewRequest: (request: MenteeRequest) => void;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export function RequestNotifications({
  requests: _requests,
}: RequestNotificationsProps) {
  const [requests, setRequests] = useState<MenteeRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      const res = await GetMenteeRequestsQuery({
        pageNumber: 1,
        pageSize: 1000,
        userId: "",
      });
      setRequests(res.data?.mentees || []);
      setLoading(false);
    }
    fetchRequests();
  }, []);

  const hasRequests = Array.isArray(requests) && requests.length > 0;

  return (
    <div className="flex flex-col">
      <Card className="flex overflow-hidden flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-medium">
              Request Notifications
              <span className="text-sm text-grey-500 mx-2">({requests.length})</span>
            </h3>
          </div>
          <Button variant="link" className="text-primary-400 text-sm" asChild>
            <Link href="/mentor/mentors">
              See all
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="h-[400px] min-h-[400px] overflow-y-auto pr-2 pt-2">
          {loading ? (
            <div className="flex items-center justify-center h-full text-neutral-100">
              Loading...
            </div>
          ) : !hasRequests ? (
            <div className="flex items-center justify-center h-full text-neutral-100">
              No requests available
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between border-b border-[#DADADA] py-3 whitespace-nowrap gap-5 overflow-x-auto"
                >
                  <div className="w-1/3 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={request.menteeAvatarUrl || "https://github.com/shadcn.png"}
                        alt={request.name}
                      />
                      <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-sm">{request.name}</p>
                  </div>
                  <span className="text-neutral-100 text-xs">{request.menteeAge || "N/A"}</span>
                  <span className="text-neutral-100 text-xs">
                    {request.menteeLocation || "N/A"}
                  </span>
                  <span className="text-neutral-100 text-xs">
                    {new Date(request.createdDate).toLocaleDateString()}
                  </span>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewRequest(request)}
                    className="text-sm"
                  >
                    View Request
                  </Button> */}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
