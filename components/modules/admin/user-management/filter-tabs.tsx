import { ArrowUpDown } from "lucide-react";

interface FilterTabsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterTabs({ 
  filters, 
  activeFilter, 
  onFilterChange 
}: FilterTabsProps) {
  return (
    <div className="flex space-x-2 overflow-x-auto border-b border-grey-300 mb-4 py-4">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`rounded-full text-sm px-3 whitespace-nowrap md:px-6 py-2 ${
            activeFilter === filter
              ? "bg-primary-200 text-primary-400 hover:bg-transparent hover:text-primary-400"
              : "bg-transparent text-neutral-100 hover:bg-transparent hover:text-neutral-100"
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
      <button className="ml-auto text-primary-400 flex items-center">
        <ArrowUpDown className="h-4 w-4 mr-2" />
        Sort
      </button>
    </div>
  );
}