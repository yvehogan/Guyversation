import { OverviewCards } from "@/components/modules/mentor-dashboard/overview-cards";
import { RequestNotifications } from "@/components/modules/mentor-dashboard/request-notifications";
import { UpcomingSessions } from "@/components/modules/mentor-dashboard/upcoming-session";

export default function DashboardPage() {
  return (
    <div className="py-6 w-full flex flex-col h-screen ">
      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        <div className="lg:w-[70%] space-y-4 flex flex-col">
          <h2 className="text-xl font-medium">Overview</h2>
          <OverviewCards />
          <div className="">
            <RequestNotifications />
          </div>
        </div>
        <div className="lg:w-[30%] flex flex-col">
          <UpcomingSessions />
        </div>
      </div>
    </div>
  );
}