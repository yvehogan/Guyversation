import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { GetMentorDashboardQuery, MentorDashboardStats } from "@/components/queries/mentor/get-dashboard"
import Cookies from "js-cookie"

export function OverviewCards() {
  const [stats, setStats] = useState<MentorDashboardStats | null>(null)

  useEffect(() => {
    const mentorId = Cookies.get("GUYVERSATION_USER_ID")
    if (!mentorId) return;
    (async () => {
      const response = await GetMentorDashboardQuery(mentorId)
      if (response.isSuccess && response.data) {
        setStats(response.data)
      }
    })()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="border-none text-white overflow-hidden relative h-36 bg-secondary-500">
        <div className="absolute inset-0 z-0">
          <Image src="/svgs/card1.svg" height={200} width={200} alt="Background" className="w-full h-full object-cover" />
        </div>
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-2">
            <Image src='/svgs/message.svg' alt="Message Icon" width={16} height={16} className="h-7 w-7" />
            <h3 className="font-medium text-sm">Mentorship Sessions</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{stats?.totalSessions ?? 0}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none text-white overflow-hidden relative h-36 bg-primary-300">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/svgs/card2.svg" width={200} height={200} alt="Background" className="w-full h-full object-cover" />
        </div>
        
        {/* Content with relative positioning */}
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-2">
            <Image src='/svgs/community.svg' alt="Message Icon" width={16} height={14} className="h-7 w-7" />
            <h3 className="font-medium text-sm">Communities</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{stats?.totalCommunities ?? 0}</p>
            <Button variant="ghost" size='xs' className="text-xs" asChild>
              <Link href="/mentor/communities">
                View all
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none text-white overflow-hidden relative h-36 bg-secondary-600">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/svgs/card3.svg" width={200} height={200} alt="Background" className="w-full h-full object-cover" />
        </div>
        
        {/* Content with relative positioning */}
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-2">
            <Image src='/svgs/person.svg' alt="Message Icon" width={16} height={14} className="h-7 w-7" />
            <h3 className="font-medium text-sm">Mentees</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{stats?.totalMentees ?? 0}</p>
            <Button variant="ghost" size='xs' className="text-xs" asChild>
              <Link href="/mentor/mentors">
                View all
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}