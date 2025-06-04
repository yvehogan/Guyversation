import { IoPersonOutline, IoEllipsisHorizontalCircle } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";
import {
  CircleCheck,
  Network,
  ExternalLink,
  FileBox,
  Calendar,
  CalendarDays,
  CalendarClock,
} from "lucide-react";

export default function DashboardPage() {
  const userStats = [
    {
      title: "Users",
      value: 127,
      icon: IoPersonOutline,
      color: "text-secondary-400 bg-secondary-100",
    },
    {
      title: "Mentors",
      value: 48,
      icon: IoPersonOutline,
      color: "text-primary-400 bg-primary-200",
    },
    {
      title: "Mentees",
      value: 79,
      icon: IoPersonOutline,
      color: "text-secondary-500 bg-secondary-800",
    },
    {
      title: "Pending verification",
      value: 32,
      icon: IoEllipsisHorizontalCircle,
      color: "text-secondary-600 bg-[#CE40821A]",
    },
  ];

  const mentorshipStats = [
    {
      title: "Sessions requested",
      value: 56,
      icon: Network,
      color: "text-secondary-400 bg-secondary-100",
    },
    {
      title: "Sessions accepted",
      value: 41,
      icon: ExternalLink,
      color: "text-primary-400 bg-primary-200",
    },
    {
      title: "Sessions rejected",
      value: 8,
      icon: FileBox,
      color: "text-secondary-500 bg-secondary-800",
    },
    {
      title: "Sessions completed",
      value: 52,
      icon: CircleCheck,
      color: "text-secondary-600 bg-[#CE40821A]",
    },
  ];

  const communityStats = [
    {
      title: "Communities",
      value: 33,
      icon: Network,
      color: "text-secondary-400 bg-secondary-100",
    },
    {
      title: "Open communities",
      value: 21,
      icon: ExternalLink,
      color: "text-primary-400 bg-primary-200",
    },
    {
      title: "Closed communities",
      value: 12,
      icon: FileBox,
      color: "text-secondary-500 bg-secondary-800",
    },
    {
      title: "Pending request",
      value: 17,
      icon: Network,
      color: "text-secondary-600 bg-[#CE40821A]",
    },
  ];

  const eventStats = [
    {
      title: "Events posted",
      value: 23,
      icon: Calendar,
      color: "text-secondary-400 bg-secondary-100",
    },
    {
      title: "Number of past events",
      value: 12,
      icon: CalendarDays,
      color: "text-primary-400 bg-primary-200",
    },
    {
      title: "Upcoming events",
      value: 11,
      icon: CalendarClock,
      color: "text-secondary-500 bg-secondary-800",
    },
  ];

  return (
    <div className="w-full pb-42 overflow-y-auto">
      <section className="mb-8 mt-6">
        <h2 className="text-xl font-medium mb-3">User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-2xl overflow-hidden">
          {userStats.map((stat, index) => (
            <Card
              key={index}
              className={`border-0 shadow-none rounded-none px-4 ${
                (index + 1) % 4 !== 0 && index !== userStats.length - 1
                  ? "border-b md:border-b-0 md:border-r border-grey-500"
                  : ""
              }`}
            >
              <CardContent className="">
                <div className="flex flex-col items-start">
                  <div className={`p-3 rounded-full ${stat.color} mb-2`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-neutral-200">{stat.title}</div>
                  <div className="text-[40px] font-normal mt-1">
                    {stat.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-3">Mentorship Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-2xl overflow-hidden">
          {mentorshipStats.map((stat, index) => (
            <Card
              key={index}
              className={`border-0 shadow-none rounded-none px-4 ${
                (index + 1) % 4 !== 0 && index !== userStats.length - 1
                  ? "border-b md:border-b-0 md:border-r border-grey-500"
                  : ""
              }`}
            >
              <CardContent className="">
                <div className="flex flex-col items-start">
                  <div className={`p-3 rounded-full ${stat.color} mb-2`}>
                    <stat.icon className="h-5 w-5#4D4D4D" />
                  </div>
                  <div className="text-sm text-neutral-200">{stat.title}</div>
                  <div className="text-[40px] font-normal mt-1">
                    {stat.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-3">Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-2xl overflow-hidden">
          {communityStats.map((stat, index) => (
            <Card
              key={index}
              className={`border-0 shadow-none rounded-none px-4 ${
                (index + 1) % 4 !== 0 && index !== userStats.length - 1
                  ? "border-b md:border-b-0 md:border-r border-grey-500"
                  : ""
              }`}
            >
              <CardContent className="">
                <div className="flex flex-col items-start">
                  <div className={`p-3 rounded-full ${stat.color} mb-2`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-neutral-200">{stat.title}</div>
                  <div className="text-[40px] font-normal mt-1">
                    {stat.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-3">Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          <div className="col-span-full md:col-span-3 bg-white rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {eventStats.map((stat, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-none rounded-none px-4 ${
                    index < eventStats.length - 1 && "md:border-r border-grey-500"
                  } ${
                    index < eventStats.length - 1 && "border-b md:border-b-0 border-grey-500"
                  }`}
                >
                  <CardContent className="py-4 px-2 md:py-3 md:px-4">
                    <div className="flex flex-col items-start">
                      <div className={`p-2 rounded-full ${stat.color} mb-2`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-neutral-200">{stat.title}</div>
                      <div className="text-[28px] sm:text-[32px] font-normal mt-1">
                        {stat.value}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="hidden md:block"></div>
        </div>
      </section>
    </div>
  );
}
