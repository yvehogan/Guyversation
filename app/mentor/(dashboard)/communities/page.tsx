"use client"

import { useState, useEffect, useRef } from "react"
import { CommunityCard } from "@/components/modules/communities/community-card"
import { GetCommunitiesQuery, AudienceEnums } from "@/components/queries/mentor/get-communities"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { Pagination } from "@/components/ui/pagination"

type SortOption = "Size" | "Name" | "Recent"

export default function CommunitiesPage() {
  const [sortBy, setSortBy] = useState<SortOption>("Size")
  const [communities, setCommunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [search, setSearch] = useState("")
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [paginationMetadata, setPaginationMetadata] = useState({
    totalCount: 0,
    pageSize: pageSize,
    currentPage: currentPage,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  })

  useEffect(() => {
    const checkForSearchUpdates = () => {
      const savedSearch = localStorage.getItem("search-mentor-communities") || "";
      if (savedSearch !== search) {
        setSearch(savedSearch);
        if (savedSearch === "" && search !== "") {
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }
          searchTimeoutRef.current = setTimeout(() => {
            fetchCommunities();
          }, 100);
        }
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
  }, [search]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchCommunities();
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  const fetchCommunities = async () => {
    setLoading(true);
    
    try {
      console.log("Fetching communities with search:", search);
      const response = await GetCommunitiesQuery({ 
        audience: "Mentors",
        pageNumber: currentPage,
        pageSize: pageSize,
        searchKey: search && search.trim() !== "" ? search : undefined
      });
      
      setCommunities(
        response.data.communities.map((c: any) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          status: c.privacy === 1 ? "open" : "closed",
          participants: c.memberCount,
          image: c.bannerUrl || "/banner.png",
          joined: false,
          requestSent: false,
        }))
      );
      
      if (response.metaData) {
        setPaginationMetadata(response.metaData);
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative w-full">
      {/* Overlay loading state */}
      {loading && <LoadingOverlay text="Loading communities..." />}

      <div className="py-6 flex flex-col h-full w-full px-0">
        <h1 className="text-4xl font-medium mb-6">Communities</h1>
        
        <div className="flex justify-between items-center mb-5">
          <p className="text-black text-sm">
            We&apos;ve found <span className="font-medium">{paginationMetadata.totalCount}</span> communities for you
          </p>
        </div>

        <div className="space-y-4 overflow-y-auto mb-12 h-full w-full">
          {loading && communities.length === 0 ? (
            <div className="text-center py-10 text-lg">Loading communities...</div>
          ) : communities.length === 0 ? (
            <div className="text-center py-10 text-lg">No communities found</div>
          ) : (
            <>
              {communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
              
              {paginationMetadata.totalPages > 1 && (
                <Pagination 
                  metadata={paginationMetadata}
                  onPageChange={handlePageChange}
                  className="mt-6"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
