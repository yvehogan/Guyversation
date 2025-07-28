"use client"

import { MenteeChatDialog } from "@/components/modules/mentor/mentee-chat-dialog"
import { MenteeProfileDialog } from "@/components/modules/mentor/mentee-profile-dialog"
import { MenteesList } from "@/components/modules/mentor/mentees-list"
import { MentorTabs } from "@/components/modules/mentor/mentor-tabs"
import { RequestsList } from "@/components/modules/mentor/request-list"
import { RequestProfileDialog } from "@/components/modules/mentor/request-profile-dialog"
import { MenteeRequest, GetMenteeRequestsQuery } from "@/components/queries/mentor/get-mentee-requests"
import { AcceptMenteeQuery } from "@/components/queries/mentor/accept-mentee"
import { RejectMenteeQuery } from "@/components/queries/mentor/reject-mentee"
import { Mentee } from "@/types"
import { useState, useEffect } from "react"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { toast } from "react-toastify"
import { AcceptRequestDialog } from "@/components/modules/mentor-dashboard/accept-request-dialog"
import { RequestResultDialog } from "@/components/modules/mentor-dashboard/request-result-dialog"

export default function MentorPage() {
  const [activeTab, setActiveTab] = useState<"mentees" | "requests">("mentees")
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<MenteeRequest | null>(null)
  const [menteeRequests, setMenteeRequests] = useState<MenteeRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [showMenteeProfile, setShowMenteeProfile] = useState(false)
  const [showMenteeChat, setShowMenteeChat] = useState(false)
  const [showRequestProfile, setShowRequestProfile] = useState(false)
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultType, setResultType] = useState<"accepted" | "declined">("accepted");

  useEffect(() => {
    if (activeTab === "requests") {
      fetchMenteeRequests()
    }
  }, [activeTab])

  const fetchMenteeRequests = async () => {
    setLoading(true)
    try {
      const response = await GetMenteeRequestsQuery()
      
      if (response.isSuccess && response.data.mentees) {
        setMenteeRequests(response.data.mentees)
      } else {
        toast.error(response.message || "Failed to fetch mentee requests")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

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

  const handleAcceptRequest = async (id: string) => {
    // Show accept confirmation dialog
    if (!selectedRequest) return;
    
    setShowRequestProfile(false);
    setShowAcceptDialog(true);
  }

  const handleConfirmAccept = async () => {
    if (!selectedRequest) return;
    
    setShowAcceptDialog(false);
    setLoading(true);
    
    try {
      const response = await AcceptMenteeQuery({
        menteeUserId: selectedRequest.menteeUserId
      });
      
      if (response.isSuccess) {
        setResultType("accepted");
        setShowResultDialog(true);
        await fetchMenteeRequests(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to accept mentee request");
      }
    } catch (error) {
      toast.error("Failed to accept request");
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineRequest = async (id: string) => {
    if (!selectedRequest) return;
    
    setShowRequestProfile(false);
    setLoading(true);
    
    try {
      const response = await RejectMenteeQuery({
        menteeUserId: selectedRequest.menteeUserId
      });
      
      if (response.isSuccess) {
        setResultType("declined");
        setShowResultDialog(true);
        await fetchMenteeRequests(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to decline mentee request");
      }
    } catch (error) {
      toast.error("Failed to decline request");
    } finally {
      setLoading(false);
    }
  }

  const handleCloseResultDialog = () => {
    setShowResultDialog(false);
    setSelectedRequest(null);
  };

  if (loading) {
    return <LoadingOverlay text="Loading..." />
  }

  return (
    <div className="container mx-auto py-6 h-full">
      <h1 className="text-4xl font-medium mb-4">Mentor</h1>
      <MentorTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6 bg-white rounded-2xl overflow-hidden">
        {activeTab === "mentees" ? (
          <MenteesList onViewProfile={handleViewMenteeProfile} onChatWithMentee={handleChatWithMentee} />
        ) : (
          <RequestsList 
            requests={menteeRequests}
            onViewRequest={handleViewRequest} 
          />
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
            }} 
            onAccept={function (): void {
              throw new Error("Function not implemented.")
            }}
          />

          <MenteeChatDialog mentee={selectedMentee} open={showMenteeChat} onOpenChange={setShowMenteeChat} />
        </>
      )}

      {selectedRequest && (
        <>
          <RequestProfileDialog
            request={selectedRequest}
            open={showRequestProfile}
            onOpenChange={setShowRequestProfile}
            onAccept={handleAcceptRequest}
            onDecline={handleDeclineRequest}
          />
          
          <AcceptRequestDialog
            request={selectedRequest as any} // Cast to expected type
            open={showAcceptDialog}
            onOpenChange={setShowAcceptDialog}
            onConfirm={handleConfirmAccept}
          />
          
          <RequestResultDialog
            request={selectedRequest as any} // Cast to expected type
            type={resultType}
            open={showResultDialog}
            onOpenChange={setShowResultDialog}
            onClose={handleCloseResultDialog}
          />
        </>
      )}
    </div>
  )
}