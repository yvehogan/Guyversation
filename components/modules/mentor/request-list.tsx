"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MenteeRequest } from "@/components/queries/mentor/get-mentee-requests";

export interface RequestsListProps {
  requests?: MenteeRequest[];
  onViewRequest: (request: MenteeRequest) => void;
}

export function RequestsList({
  requests = [],
  onViewRequest,
}: RequestsListProps) {
  if (requests.length === 0) {
    return (
      <div className="flex flex-col h-[300px] min-h-[300px] max-h-[300px] items-center justify-center py-12">
        <p className="text-lg text-gray-500">No pending mentee requests</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px] min-h-[500px] max-h-[500px] whitespace-nowrap">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full table-fixed">
              <thead className="bg-neutral-100 text-white">
                <tr>
                  <th className="py-4 px-3 md:px-2 w-12 text-left font-medium">
                    {" "}
                  </th>
                  <th className="py-4 px-6 md:px-4 w-16 text-left font-medium"></th>
                  <th className="py-4 px-6 md:px-4 w-1/3 text-left font-medium">
                    Name
                  </th>
                  <th className="py-4 px-6 md:px-4 w-16 text-left font-medium">
                    Age
                  </th>
                  <th className="py-4 px-6 md:px-4 w-1/4 text-left font-medium">
                    Location
                  </th>
                  <th className="py-4 px-6 md:px-4 w-1/6 text-left font-medium">
                    Date
                  </th>
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
            {requests.map((request, index) => (
              <tr key={request.id} className="border-b hover:bg-gray-50">
                <td className="py-6 px-4 w-8">{index + 1}</td>

                <td className="py-4 px-4 w-1/3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={request.menteeAvatarUrl ||  "https://github.com/shadcn.png"}
                        alt={request.name}
                      />
                      <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{request.name}</span>

                  </div>
                </td>
                <td className="py-4 px-6 md:px-4 w-16">{request.menteeAge || "N/A"}</td>
                <td className="py-4 px-6 md:px-4 w-1/4">
                  {request.menteeLocation || "N/A"}
                </td>
                <td className="py-4 px-6 md:px-4 w-1/6">
                  {new Date(request.createdDate).toLocaleDateString()}
                </td>
                <td className="py-4 text-right pr-4 h-7">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewRequest(request)}
                    className="py-5 px-3"
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
