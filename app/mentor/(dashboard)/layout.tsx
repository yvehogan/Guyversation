import React from "react";

const DashboardLayout: React.FC<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
}> = ({ children, sidebar, header }) => {
  return (
    <div className="flex h-screen w-screen items-start overflow-hidden bg-primary-200 p-3">
      {sidebar}
      <main className="h-full w-full overflow-hidden">
        {header}
        <div className="flex justify-center h-[calc(100vh-80px)] w-full items-start gap-x-10 px-3 md:px-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
