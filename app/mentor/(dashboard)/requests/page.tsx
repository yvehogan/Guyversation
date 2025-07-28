"use client";

import { useState, useEffect } from "react";
import { GetMenteeRequestsQuery, MenteeRequest } from "@/components/queries/mentor/get-mentee-requests";
import { RequestProfileDialog } from "@/components/modules/mentor/request-profile-dialog";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { toast } from "react-toastify";
import { RequestsList } from "@/components/modules/mentor/request-list";

export default function MenteeRequestsPage() {
  const [menteeRequests, setMenteeRequests] = useState<MenteeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<MenteeRequest | null>(null);
  const [showRequestProfile, setShowRequestProfile] = useState(false);

  useEffect(() => {
    fetchMenteeRequests();
  }, []);

  const fetchMenteeRequests = async () => {
    setLoading(true);
    try {
      const response = await GetMenteeRequestsQuery();
      
      if (response.isSuccess && response.data.mentees) {
        setMenteeRequests(response.data.mentees);
      } else {
        toast.error(response.message || "Failed to fetch mentee requests");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRequest = (request: MenteeRequest) => {
    setSelectedRequest(request);
    setShowRequestProfile(true);
  };

  const handleAcceptRequest = async (id: string) => {
    setShowRequestProfile(false);
    // Show loading state
    setLoading(true);
    
    try {
      // API call to accept request would go here
      // For now, we'll just simulate it
      
      // Mock successful response
      toast.success("You've accepted the mentee request");
      
      // Refresh the list
      await fetchMenteeRequests();
    } catch (error) {
      toast.error("Failed to accept request");
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineRequest = async (id: string) => {
    setShowRequestProfile(false);
    // Show loading state
    setLoading(true);
    
    try {
      // API call to decline request would go here
      // For now, we'll just simulate it
      
      // Mock successful response
      toast.success("You've declined the mentee request");
      
      // Refresh the list
      await fetchMenteeRequests();
    } catch (error) {
      toast.error("Failed to decline request");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingOverlay text="Loading mentee requests..." />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Mentee Requests</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <RequestsList
          requests={menteeRequests}
          onViewRequest={handleViewRequest}
        />
      </div>
      
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
  );
}
