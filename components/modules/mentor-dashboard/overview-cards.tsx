import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="border-none text-white overflow-hidden relative h-36">
        <div className="absolute inset-0 z-0">
          <Image src="/svgs/card1.svg" alt="Background" className="w-full h-full object-cover" />
        </div>
        
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-2">
            <Image src='/svgs/message.svg' alt="Message Icon" width={16} height={16} className="h-7 w-7" />
            <h3 className="font-medium text-sm">Mentorship Sessions</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">56</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none text-white overflow-hidden relative h-36">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/svgs/card2.svg" alt="Background" className="w-full h-full object-cover" />
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
            <p className="text-3xl font-bold">7</p>
            <Button variant="ghost" size='xs' className="text-xs">
              View all
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none text-white overflow-hidden relative h-36">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/svgs/card3.svg" alt="Background" className="w-full h-full object-cover" />
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
            <p className="text-3xl font-bold">12</p>
            <Button variant="ghost" size='xs' className="text-xs">
              View all
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}