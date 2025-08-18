import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GetAcceptedMenteesQuery,
  AcceptedMentee,
} from "@/components/queries/mentor/get-mentees-list";
import {
  GetMenteeRequestsQuery,
  MenteeRequest,
} from "@/components/queries/mentor/get-mentee-requests";

interface StatsTabProps {
  mentorId: string;
}

export default function StatsTab({ mentorId }: StatsTabProps) {
  const [acceptedCount, setAcceptedCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [acceptedMentees, setAcceptedMentees] = useState<AcceptedMentee[]>([]);
  const [pendingMentees, setPendingMentees] = useState<MenteeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeList, setActiveList] = useState<"accepted" | "pending">("accepted");

  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      setLoading(true);
      // Fetch accepted mentees
      const acceptedRes = await GetAcceptedMenteesQuery({
        pageNumber: 1,
        pageSize: 100,
        searchKey: "",
        userId: mentorId,
      });
      const pendingRes = await GetMenteeRequestsQuery({
        pageNumber: 1,
        pageSize: 100,
        searchKey: "",
        userId: mentorId,
      });

      if (isMounted) {
        setAcceptedCount(acceptedRes.metaData?.totalCount || 0);
        setPendingCount(pendingRes.metaData?.totalCount || 0);
        setAcceptedMentees(acceptedRes.data?.mentees || []);
        setPendingMentees(pendingRes.data?.mentees || []);
        setLoading(false);
      }
    }
    if (mentorId) fetchStats();
    return () => {
      isMounted = false;
    };
  }, [mentorId]);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-neutral-200 text-sm mb-1 font-medium">Mentees</h3>
          <p className="text-4xl font-medium text-neutral-100">
            {acceptedCount}
          </p>
        </div>
        <div>
          <h3 className="text-neutral-200 text-sm mb-1 font-medium">
            Pending requests
          </h3>
          <p className="text-4xl font-medium text-neutral-100">
            {pendingCount}
          </p>
        </div>
      </div>

      <div>
        <div className="flex space-x-4 mb-4 border-b border-grey-300 pb-3">
          <button
            className={`rounded-full py-2 px-6 border ${
              activeList === "accepted"
                ? "bg-purple-100 text-purple-600 border-purple-200"
                : "bg-transparent border-none text-black"
            }`}
            onClick={() => setActiveList("accepted")}
          >
            Mentees ({acceptedCount})
          </button>
          <button
            className={`rounded-full py-2 px-6 border ${
              activeList === "pending"
                ? "bg-purple-100 text-purple-600 border-purple-200"
                : "bg-transparent border-none text-black"
            }`}
            onClick={() => setActiveList("pending")}
          >
            Pending requests ({pendingCount})
          </button>
        </div>

        <div className="space-y-4">
          {activeList === "accepted"
            ? acceptedMentees.slice(0, 6).map((mentee) => (
                <div
                  key={mentee.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={mentee.avatar || "https://github.com/shadcn.png"}
                        alt="profile image"
                        className="rounded-full"
                      />
                      <AvatarFallback>
                        {mentee.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{mentee.name}</span>
                  </div>
                </div>
              ))
            : pendingMentees.slice(0, 6).map((mentee) => (
                <div
                  key={mentee.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={mentee.menteeAvatarUrl || "https://github.com/shadcn.png"}
                        alt="profile image"
                        className="rounded-full"
                      />
                      <AvatarFallback>
                        {mentee.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{mentee.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">{mentee.createdDate ? new Date(mentee.createdDate).toLocaleString() : "-"}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
