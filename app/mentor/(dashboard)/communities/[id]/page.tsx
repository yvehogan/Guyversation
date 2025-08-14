"use client";

import { useState, useEffect } from "react";
import { Heart, MessageSquare, Share2, Send, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommunityEvent } from "@/components/modules/communities/community-event";
import { GetCommunitiesQuery, AudienceEnums } from "@/components/queries/mentor/get-communities";
import { GetCommunityPostsQuery, type CommunityPost } from "@/components/queries/communities/get-community-posts";
import { CreateCommunityPostQuery } from "@/components/queries/communities/create-community-post";
import { GetEventsQuery, type EventInterface } from "@/components/queries/events/get-events";
import { useRouter } from "next/navigation";
import { LikeCommunityPostMutation } from "@/components/queries/communities/like-community-post";

interface Community {
  id: string;
  name: string;
  description: string;
  bannerUrl: string | null;
  privacy: number;
  audience: number;
  createdDate: string;
  memberCount: number;
}

type PageProps = {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function CommunityDetailPage({ params }: PageProps) {
  const [postContent, setPostContent] = useState("");
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isPublishing, setIsPublishing] = useState(false);
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCommunity = async () => {
      setLoading(true);

      const communityId =
        typeof params.id === "object" && "then" in params.id
          ? await (params.id as unknown as Promise<string>)
          : params.id;

      const response = await GetCommunitiesQuery({
        audience: "Mentors",
      });

      const foundCommunity = response.data.communities.find(
        (c:any) => c.id === communityId
      );

      if (foundCommunity) {
        setCommunity(foundCommunity);
        // Fetch posts for this community
        await fetchCommunityPosts(communityId);
        // Fetch events
        await fetchEvents();
      } else {
        setCommunity({
          id: communityId,
          name: "Community Not Found",
          description: "This community could not be found.",
          bannerUrl: null,
          privacy: 0,
          audience: 0,
          createdDate: "",
          memberCount: 0,
        });
      }
      setLoading(false);
    };

    fetchCommunity();
  }, [params.id]);

  const fetchCommunityPosts = async (communityId: string) => {
    setPostsLoading(true);
    try {
      const response = await GetCommunityPostsQuery({
        communityId,
        pageNumber: currentPage,
        pageSize: pageSize,
      });

      if (response.isSuccess && response.data) {
        setPosts(response.data as CommunityPost[]); // Cast response.data as CommunityPost array
      }
    } catch (error) {
      console.error("Error fetching community posts:", error);
    } finally {
      setPostsLoading(false);
    }
  };

  const fetchEvents = async () => {
    setEventsLoading(true);
    try {
      const response = await GetEventsQuery(undefined, 1, 10);
      if (response.isSuccess && response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setEventsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!postContent.trim() || !community?.id) return;
    
    setIsPublishing(true);
    try {
      const response = await CreateCommunityPostQuery({
        communityId: community.id,
        content: postContent.trim(),
      });
      
      if (response.isSuccess) {
        setPostContent("");
        // Refresh posts after successful creation
        await fetchCommunityPosts(community.id);
      } else {
        console.error("Failed to create post:", response.message);
        // You might want to show a toast or error message here
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleLikeToggle = async (postId: string, communityId: string, isLiked: boolean, index: number) => {
    // Optimistically update UI
    setPosts((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        isLikedByCurrentUser: !isLiked,
        likesCount: updated[index].likesCount + (isLiked ? -1 : 1),
      };
      return updated;
    });

    // Call API
    try {
      await LikeCommunityPostMutation({ communityId, postId });
    } catch (e) {
      // Revert UI if API fails
      setPosts((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          isLikedByCurrentUser: isLiked,
          likesCount: updated[index].likesCount + (isLiked ? 1 : -1),
        };
        return updated;
      });
    }
  };

  const formatPostTime = (dateString: string) => {
    const date = new Date(dateString + (dateString.endsWith('Z') ? '' : 'Z'));
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)} days ago`;
    return date.toLocaleDateString();
  };

  const handleBackClick = () => {
    router.push('/mentor/communities');
  };

  if (loading) {
    return (
      <div className=" p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh]">
      <div className="mt-3 mb-3">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 hover:text-neutral-600 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
        <h1 className="text-4xl font-medium mb-2">{community?.name}</h1>
        <p className="text-neutral-200">{community?.description}</p>
      </div>

      <div className="flex justify-between flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[65%] space-y-4 rounded-lg max-h-[550px] overflow-y-auto pb-12 pr-2">
          {/* Create Post Section */}
          <div className="space-y-4 bg-white rounded-[30px] px-6 py-4">
            <h2 className="text-xl font-medium">Create Post</h2>
            <div className="bg-grey-200 rounded-lg p-4">
              <Textarea
                placeholder="Speak your mind... we're here for it."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[100px] bg-transparent border-none focus-visible:ring-0 resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handlePublish}
                className=""
                disabled={!postContent.trim() || isPublishing}
              >
                <Send className="h-4 w-4 mr-2" />
                {isPublishing ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>

          {/* Posts Section */}
          <div className="">
            <div className="space-y-6">
              {postsLoading ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Loading posts...</p>
                </div>
              ) : !posts || posts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No posts yet. Be the first to share something!</p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <div
                    key={post.id}
                    className="space-y-4 bg-white rounded-[30px] px-6 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={post.author.avatarUrl || "/placeholder.svg"}
                          alt={post.author.name}
                        />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatPostTime(post.createdDate)}
                        </p>
                      </div>
                    </div>

                    <div className="bg-grey-200 rounded-lg p-4">
                      <p>{post.content}</p>
                    </div>

                    <div className="flex justify-between items-center gap-6">
                      <button 
                        className={`flex items-center gap-1 hover:text-primary-300 ${
                          post.isLikedByCurrentUser ? "text-red-500" : "text-neutral-100"
                        }`}
                        onClick={() => handleLikeToggle(post.id, community?.id || "", post.isLikedByCurrentUser, index)}
                        disabled={isPublishing}
                      >
                        <Heart className={`h-5 w-5 ${post.isLikedByCurrentUser ? "fill-current" : ""}`} />
                        <span>{post.likesCount} Likes</span>
                      </button>
                      {/* <button className="flex items-center gap-1 text-neutral-100 hover:text-primary-300">
                        <MessageSquare className="h-5 w-5" />
                        <span>{post.commentsCount} Comments</span>
                      </button> */}
                      {/* <button className="flex items-center gap-1 text-neutral-100 hover:text-primary-300">
                        <Share2 className="h-5 w-5" />
                        <span>{post.sharesCount} Shares</span>
                      </button> */}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[35%]">
          {/* Upcoming Events Section */}
          <div className="">
            <div className="flex justify-start items-center mb-3">
              <Button
                variant="outline"
                className="bg-transparent border-primary-400 text-primary-400 font-light px-4 py-2"
              >
                Upcoming Events
              </Button>
            </div>

            <div className="space-y-6 max-h-[450px] overflow-y-auto pb-12 bg-white py-8 px-4 rounded-[30px]">
              {eventsLoading ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No upcoming events.</p>
                </div>
              ) : (
                events.map((event) => (
                  <CommunityEvent 
                    key={event.id} 
                    event={{
                      id: event.id,
                      title: event.title,
                      type: "Event",
                      date: new Date(event.startDate).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      }),
                      time: event.startTime,
                      day: new Date(event.startDate).getDate().toString(),
                      month: new Date(event.startDate).toLocaleDateString('en-US', { 
                        weekday: 'short' 
                      }).toUpperCase(),
                      attendees: event.attendeeCount,
                      interested: false,
                    }} 
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
