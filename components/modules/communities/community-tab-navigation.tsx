import { IoPeople, IoGlobe } from "react-icons/io5";

interface CommunityTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function CommunityTabNavigation({ activeTab, onTabChange }: CommunityTabNavigationProps) {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 w-full md:max-w-sm bg-white rounded-full overflow-hidden p-2">
        <button
          className={`flex items-center justify-center rounded-full h-10 ${
            activeTab === "my-communities"
              ? "bg-secondary-400 text-white hover:bg-secondary-400 hover:text-white"
              : "bg-transparent text-neutral-200 hover:bg-white hover:text-neutral-200"
          }`}
          onClick={() => onTabChange("my-communities")}
        >
          <IoPeople className="mr-2 h-4 w-4" />
          My Communities
        </button>
        <button
          className={`flex items-center justify-center rounded-full h-10 ${
            activeTab === "all-communities"
              ? "bg-secondary-400 text-white hover:bg-secondary-400 hover:text-white"
              : "bg-transparent text-neutral-200 hover:bg-white hover:text-neutral-200"
          }`}
          onClick={() => onTabChange("all-communities")}
        >
          <IoPeople className="mr-2 h-4 w-4" />
          All Communities
        </button>
      </div>
    </div>
  );
}
