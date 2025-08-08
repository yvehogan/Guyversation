import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface PaginationMetadata {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface PaginationProps {
  metadata: PaginationMetadata;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ metadata, onPageChange, className = "" }: PaginationProps) {
  const { currentPage, totalPages, hasNext, hasPrevious } = metadata;

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const showPageCount = 5;
    
    if (totalPages <= showPageCount) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push(null);
      }
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push(null);
      }
      
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className={`flex items-center justify-center gap-1 py-4 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => hasPrevious && handlePageClick(currentPage - 1)}
        disabled={!hasPrevious}
        aria-label="Previous page"
        className="bg-primary-200 text-primary-400 rounded-lg"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((page, index) => 
        page === null ? (
          <Button
            key={`ellipsis-${index}`}
            variant="ghost"
            size="icon"
            disabled
            aria-hidden="true"
            className="rounded-lg"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            key={`page-${page}`}
            variant="ghost"
            size="sm"
            onClick={() => handlePageClick(Number(page))}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`min-w-[2rem] rounded-lg ${
              currentPage === page 
                ? "bg-primary-200 text-primary-400" 
                : "text-black border-none hover:bg-gray-100"
            }`}
          >
            {page}
          </Button>
        )
      )}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => hasNext && handlePageClick(currentPage + 1)}
        disabled={!hasNext}
        aria-label="Next page"
        className="rounded-lg"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
