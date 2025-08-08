"use client"
import { RiQuestionnaireFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";

interface MentorTabsProps {
  activeTab: "mentees" | "requests"
  onTabChange: (tab: "mentees" | "requests") => void
}

export function MentorTabs({ activeTab, onTabChange }: MentorTabsProps) {
  return (
    <div className="inline-flex space-x-2 md:space-x-4 bg-white p-1 rounded-full w-full md:w-auto">
      <button
        className={`flex items-center gap-2 px-4 md:px-10 py-2.5 rounded-full text-sm md:text-base font-normal transition-colors cursor-pointer flex-1 md:flex-initial justify-center ${
          activeTab === "mentees" ? "bg-secondary-400 text-white" : "text-neutral-200 hover:bg-gray-50"
        }`}
        onClick={() => onTabChange("mentees")}
      >
        <IoPerson className="h-5 w-5 md:h-6 md:w-6" />
        Mentees
      </button>
      <button
        className={`flex items-center gap-2 px-4 md:px-10 py-2.5 rounded-full text-sm md:text-base font-normal transition-colors flex-1 md:flex-initial justify-center ${
          activeTab === "requests" ? "bg-secondary-400 text-white" : "text-neutral-200 hover:bg-gray-50"
        }`}
        onClick={() => onTabChange("requests")}
      >
        <RiQuestionnaireFill className="h-5 w-5 md:h-6 md:w-6" />
        Requests
      </button>
    </div>
  )
}