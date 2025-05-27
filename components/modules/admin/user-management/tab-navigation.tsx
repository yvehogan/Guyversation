import { IoPerson } from "react-icons/io5";
import { RiQuestionnaireFill } from "react-icons/ri";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 w-full md:max-w-sm bg-white rounded-full overflow-hidden p-2">
        <button
          className={`flex items-center justify-center rounded-full h-10 ${
            activeTab === "all-users"
              ? "bg-secondary-400 text-white hover:bg-secondary-400 hover:text-white"
              : "bg-transparent text-neutral-200 hover:bg-white hover:text-neutral-200"
          }`}
          onClick={() => onTabChange("all-users")}
        >
          <IoPerson className="mr-2 h-4 w-4" />
          All Users
        </button>
        <button
          className={`flex items-center justify-center rounded-full h-10 ${
            activeTab === "requests"
              ? "bg-secondary-400 text-white hover:bg-secondary-400 hover:text-white"
              : "bg-transparent text-neutral-200 hover:bg-white hover:text-neutral-200"
          }`}
          onClick={() => onTabChange("requests")}
        >
          <RiQuestionnaireFill className="mr-2 h-4 w-4" />
          Requests
        </button>
      </div>
    </div>
  );
}