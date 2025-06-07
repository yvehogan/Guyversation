"use client";

import { AddUserDialog } from "@/components/modules/admin/user-management/add-user-dialog";
import { ConfirmAddUserDialog, SuccessAddUserDialog } from "@/components/modules/admin/user-management/confirm-and-add-user-dialog";
import { FilterTabs } from "@/components/modules/admin/user-management/filter-tabs";
// import { ConfirmRevokeAccessDialog, SuccessRevokeAccessDialog } from "@/components/modules/admin/user-management/request-access-dialog";
import { ConfirmRequestDialog, SuccessRequestDialog } from "@/components/modules/admin/user-management/request-dialog";
import { RequestsTable } from "@/components/modules/admin/user-management/requests-table";
import { TabNavigation } from "@/components/modules/admin/user-management/tab-navigation";
import { UserManagementHeader } from "@/components/modules/admin/user-management/user-header";
import { UserProfileDialog } from "@/components/modules/admin/user-management/user-profile-dialog";
import { UserInterface, UsersTable } from "@/components/modules/admin/user-management/user-table";
import { useState, useEffect } from "react";
import { GetUsersQuery, GetUsersResponse } from "@/components/queries/admin/get-users";
import { UserDetails } from "@/components/queries/users/get-user-details";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  
  const [activeTab, setActiveTab] = useState("all-users");
  const [activeFilter, setActiveFilter] = useState<"All Users" | "Anonymous" | "Mentee" | "Mentor">("All Users");

const queryResult = useQuery<GetUsersResponse, Error>({
  queryKey: ["users", activeFilter],
  queryFn: () => GetUsersQuery(activeFilter !== "All Users" ? { userType: activeFilter } : undefined),
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
  status: "Active",
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

  const handleViewProfile = (user: UserDetails) => {
    setViewingUser(user);
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

  return (
    <>
      <main className="flex-1 overflow-y-auto pb-24 mt-8">
        <UserManagementHeader onAddUser={() => setAddUserOpen(true)} />
        
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {activeTab === "all-users" && (
          <div className="overflow-hidden px-4 rounded-[30px] bg-white pb-24">
            <FilterTabs
              filters={[
                "All Users",
                "Mentee",
                "Mentor",
                "Anonymous",
              ]}
              activeFilter={activeFilter}
              onFilterChange={(filter) => setActiveFilter(filter as "All Users" | "Mentee" | "Mentor" | "Anonymous")}
            />
            {isLoading ? (
              <p>Loading users...</p>
            ) : isError ? (
              <p>Failed to load users.</p>
            ) : (
              <UsersTable 
                users={users} 
                onViewProfile={handleViewProfile}
                onRevokeAccess={handleRevokeAccess}
              />
            )}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="overflow-hidden px-4 rounded-[30px] bg-white pb-24">
            <FilterTabs
              filters={["All Users", "Mentee", "Anonymous"]}
              activeFilter={activeFilter}
              onFilterChange={(filter) => setActiveFilter(filter as "All Users" | "Mentee" | "Mentor" | "Anonymous")}
            />
            <RequestsTable 
              users={users.slice(0, 6)} 
              onViewRequest={handleViewRequest}
            />
          </div>
        )}
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

      {/* <ConfirmRevokeAccessDialog
        open={confirmRevokeOpen}
        onOpenChange={setConfirmRevokeOpen}
        onConfirm={handleConfirmRevoke}
      />

      <SuccessRevokeAccessDialog
        open={successRevokeOpen}
        onOpenChange={setSuccessRevokeOpen}
        user={selectedUser}
      /> */}

      <UserProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        user={viewingUser}
        isRequest={activeTab === "requests"}
        onAcceptRequest={() => setConfirmRequestOpen(true)}
      />

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