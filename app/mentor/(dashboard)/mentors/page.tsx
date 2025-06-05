"use client"

import { MenteeChatDialog } from "@/components/modules/mentor/mentee-chat-dialog"
import { MenteeProfileDialog } from "@/components/modules/mentor/mentee-profile-dialog"
import { MenteesList } from "@/components/modules/mentor/mentees-list"
import { MentorTabs } from "@/components/modules/mentor/mentor-tabs"
import { MenteeRequest, RequestsList } from "@/components/modules/mentor/request-list"
import { RequestProfileDialog } from "@/components/modules/mentor/request-profile-dialog"
import { Mentee } from "@/types"
import { useState } from "react"


export default function MentorPage() {
  const [activeTab, setActiveTab] = useState<"mentees" | "requests">("mentees")
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<MenteeRequest | null>(null)
  const [showMenteeProfile, setShowMenteeProfile] = useState(false)
  const [showMenteeChat, setShowMenteeChat] = useState(false)
  const [showRequestProfile, setShowRequestProfile] = useState(false)

  const handleViewMenteeProfile = (mentee: Mentee) => {
    setSelectedMentee(mentee)
    setShowMenteeProfile(true)
  }

  const handleChatWithMentee = (mentee: Mentee) => {
    setSelectedMentee(mentee)
    setShowMenteeChat(true)
  }

  const handleViewRequest = (request: MenteeRequest) => {
    setSelectedRequest(request)
    setShowRequestProfile(true)
  }

  const handleAcceptRequest = () => {
    // Handle accept request logic here
    setShowRequestProfile(false)
  }

  const handleDeclineRequest = () => {
    setShowRequestProfile(false)
  }

  return (
    <div className="container mx-auto py-6 h-full">
      <h1 className="text-4xl font-medium mb-4">Mentor</h1>
      <MentorTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6 bg-white rounded-2xl overflow-hidden">
        {activeTab === "mentees" ? (
          <MenteesList onViewProfile={handleViewMenteeProfile} onChatWithMentee={handleChatWithMentee} />
        ) : (
          <RequestsList onViewRequest={handleViewRequest} />
        )}
      </div>

      {selectedMentee && (
        <>
          <MenteeProfileDialog
            mentee={selectedMentee}
            open={showMenteeProfile}
            onOpenChange={setShowMenteeProfile}
            onSendMessage={() => {
              setShowMenteeProfile(false)
              setShowMenteeChat(true)
            } } onAccept={function (): void {
              throw new Error("Function not implemented.")
            } }          />

          <MenteeChatDialog mentee={selectedMentee} open={showMenteeChat} onOpenChange={setShowMenteeChat} />
        </>
      )}

      {selectedRequest && (
        <RequestProfileDialog
          request={selectedRequest}
          open={showRequestProfile}
          onOpenChange={setShowRequestProfile}
          onAccept={handleAcceptRequest}
          onDecline={handleDeclineRequest}
        />
      )}
    </div>
  )
}