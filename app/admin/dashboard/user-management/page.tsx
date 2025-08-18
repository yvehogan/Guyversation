"use client";

import { AddUserDialog } from "@/components/modules/admin/user-management/add-user-dialog";
import { ConfirmAddUserDialog, SuccessAddUserDialog } from "@/components/modules/admin/user-management/confirm-and-add-user-dialog";
import { FilterTabs } from "@/components/modules/admin/user-management/filter-tabs";
import { ConfirmRequestDialog, SuccessRequestDialog } from "@/components/modules/admin/user-management/request-dialog";
import { UserManagementHeader } from "@/components/modules/admin/user-management/user-header";
import { UserProfileDialog } from "@/components/modules/admin/user-management/user-profile-dialog";
import { ViewMenteeProfile } from "@/components/modules/admin/user-management/view-mentee-profile";
import { UserInterface, UsersTable } from "@/components/modules/admin/user-management/user-table";
import { useState, useEffect, useRef } from "react";
import { GetUsersQuery, GetUsersResponse } from "@/components/queries/admin/get-users";
import { GetUserDetailsQuery, UserDetails } from "@/components/queries/users/get-user-details";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Pagination } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

export default function UserManagementPage() {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [confirmAddOpen, setConfirmAddOpen] = useState(false);
  const [successAddOpen, setSuccessAddOpen] = useState(false);
  const [confirmRevokeOpen, setConfirmRevokeOpen] = useState(false);
  const [successRevokeOpen, setSuccessRevokeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [confirmRequestOpen, setConfirmRequestOpen] = useState(false);
  const [successRequestOpen, setSuccessRequestOpen] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
  const [viewingUser, setViewingUser] = useState<UserDetails | null>(null);
  const [menteeProfile, setMenteeProfile] = useState<any | null>(null);
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  
  const [activeFilter, setActiveFilter] = useState<"All Users" | "Anonymous" | "Mentee" | "Mentor">("All Users");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const router = useRouter();
  const [search, setSearch] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const checkForSearchUpdates = () => {
      const savedSearch = localStorage.getItem("search-users") || "";
      if (savedSearch !== search) {
        setSearch(savedSearch);
        
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
        
        searchTimeoutRef.current = setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["users", activeFilter, currentPage, pageSize] });
        }, 300);
      }
    };
    checkForSearchUpdates();
    

    const interval = setInterval(checkForSearchUpdates, 500);
    
    return () => {
      clearInterval(interval);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search, activeFilter, currentPage, pageSize, queryClient]);


  useEffect(() => {
    console.log("User search term changed to:", search);
  }, [search]);

  const queryResult = useQuery<GetUsersResponse, Error>({
    queryKey: ["users", activeFilter, currentPage, pageSize, search],
    queryFn: async () => {
      try {
        console.log(`Fetching users with search term: "${search}"`);
        const result = await GetUsersQuery({
          userType: activeFilter !== "All Users" ? activeFilter : undefined,
          page: currentPage,
          pageSize: pageSize,
          search: search || undefined
        });
        
        console.log("API response:", result);
        
        if (!result.isSuccess) {
          throw new Error(result.message || "Failed to fetch users");
        }
        
        return result;
      } catch (error) {
        console.error("Error in queryFn:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (queryResult.error) {
      toast.error(queryResult.error.message || "Failed to fetch users.");
    }
  }, [queryResult.error]);

  const { isLoading, isError } = queryResult;
  const data = queryResult.data as GetUsersResponse | undefined;

  const users: UserInterface[] = data?.data?.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    userTypeName: user.userTypeName,
    status: user.status,
    image: user.profilePictureUrl ?? undefined,
    email: user.email,
  })) ?? [];

  const handleAddUser = (email: string, role: string) => {
    setEmail(email);
    setUserRole(role);
    setAddUserOpen(false);
    setConfirmAddOpen(true);
  };

  const handleConfirmAdd = () => {
    setConfirmAddOpen(false);
    setSuccessAddOpen(true);
  };

  const handleRevokeAccess = (user: UserInterface) => {
    setSelectedUser(user);
    setConfirmRevokeOpen(true);
  };

  const handleConfirmRevoke = () => {
    setConfirmRevokeOpen(false);
    setSuccessRevokeOpen(true);
  };

  const handleViewProfile = async (user: UserDetails) => {
    const response = await GetUserDetailsQuery(user.id);
    if (!response.isSuccess || !response.data) {
      toast.error(response.message || "Failed to fetch user details.");
      return;
    }
    if (response.data.userTypeName?.toLowerCase() === "mentee") {
      const educations = Array.isArray((response.data as any).educations)
        ? (response.data as any).educations
        : [];
      setMenteeProfile({
        id: response.data.id,
        menteeUserId: response.data.id,
        name: `${response.data.firstName} ${response.data.lastName}`,
        age: response.data.age ?? "-",
        location: response.data.location ?? "-",
        time: response.data.time ?? "-",
        avatar: response.data.profilePictureUrl ?? "",
        goal: response.data.goal ?? "",
        careerPath: educations.length > 0
          ? educations
              .map((edu: any) => edu.fieldOfStudy)
              .filter(Boolean)
              .join(", ")
          : "",
        interests: Array.isArray(response.data.interests)
          ? response.data.interests.map((i: any) => typeof i === "string" ? i : i.name || "")
          : [],
        socials: response.data.socials ?? {},
      });
      setViewingUser(null);
    } else {
      setViewingUser(response.data);
      setMenteeProfile(null);
    }
    setProfileOpen(true);
  };

  const handleViewRequest = (user: UserInterface) => {
    setViewingUser(user as unknown as UserDetails);
    setProfileOpen(true);
  };

  const handleAcceptRequest = () => {
    setConfirmRequestOpen(false);
    setSuccessRequestOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const emptyMetadata = {
    totalCount: 0,
    pageSize: pageSize,
    currentPage: currentPage,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  };

  const paginationMetadata = queryResult.data?.metaData || emptyMetadata;
  
  useEffect(() => {
  }, [paginationMetadata]);

  return (
    <>
      <main className="flex-1 overflow-y-auto pb-24 mt-8">
        <UserManagementHeader onAddUser={() => setAddUserOpen(true)} />
        
        <div className="overflow-hidden px-4 rounded-[30px] bg-white pb-24">
          <FilterTabs
            filters={[
              "All Users",
              "Mentee",
              "Mentor",
              "Anonymous",
            ]}
            activeFilter={activeFilter}
            onFilterChange={(filter) => {
              setActiveFilter(filter as "All Users" | "Mentee" | "Mentor" | "Anonymous");
              setCurrentPage(1);
            }}
          />
          {isLoading ? (
            <p>Loading users...</p>
          ) : isError ? (
            <p>Failed to load users.</p>
          ) : (
            <>
              <UsersTable 
                users={users} 
                onViewProfile={handleViewProfile}
                onRevokeAccess={handleRevokeAccess}
              />
              
              {users.length > 0 && (
                <Pagination 
                  metadata={paginationMetadata}
                  onPageChange={handlePageChange}
                  className="mt-4"
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Dialogs */}
      <AddUserDialog
        open={addUserOpen}
        onOpenChange={setAddUserOpen}
        onAddUser={handleAddUser}
      />

      <ConfirmAddUserDialog
        open={confirmAddOpen}
        onOpenChange={setConfirmAddOpen}
        onConfirm={handleConfirmAdd}
        email={email}
        role={userRole}
      />

      <SuccessAddUserDialog
        open={successAddOpen}
        onOpenChange={setSuccessAddOpen}
      />

      {menteeProfile ? (
        <ViewMenteeProfile
          mentee={menteeProfile}
          open={profileOpen}
          onOpenChange={setProfileOpen}
          onAccept={() => {}}
          onSendMessage={() => {}}
        />
      ) : (
        <UserProfileDialog
          open={profileOpen}
          onOpenChange={setProfileOpen}
          user={viewingUser}
          isRequest={false}
          onAcceptRequest={() => setConfirmRequestOpen(true)}
        />
      )}

      <ConfirmRequestDialog
        open={confirmRequestOpen}
        onOpenChange={setConfirmRequestOpen}
        onConfirm={handleAcceptRequest}
      />

      <SuccessRequestDialog
        open={successRequestOpen}
        onOpenChange={setSuccessRequestOpen}
      />
    </>
  );
}