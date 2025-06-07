"use client";

import { useState, useEffect } from "react";
import { Heart, MessageSquare, Share2, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommunityEvent } from "@/components/modules/communities/community-event";

const communitiesData = {
  "1": {
    id: "1",
    name: "Mind Matters",
    description:
      "Talking about what's going on inside — because real strength begins within.",
    image: "/placeholder.svg?height=80&width=80",
  },
  "2": {
    id: "2",
    name: "Ask a Mentor",
    description:
      "For mentees to anonymously ask questions and get answers from verified mentors.",
    image: "/placeholder.svg?height=80&width=80",
  },
  "3": {
    id: "3",
    name: "Manhood & Identity",
    description:
      "Open conversations about what it means to be a man in today's world.",
    image: "/placeholder.svg?height=80&width=80",
  },
  "4": {
    id: "4",
    name: "Manhood & Identity",
    description:
      "Open conversations about what it means to be a man in today's world.",
    image: "/placeholder.svg?height=80&width=80",
  },
  "5": {
    id: "5",
    name: "Mind Matters",
    description:
      "Talk about emotions, anxiety, confidence, or anything weighing on your mind.",
    image: "/placeholder.svg?height=80&width=80",
  },
  "6": {
    id: "6",
    name: "Mind Matters",
    description:
      "Talk about emotions, anxiety, confidence, or anything weighing on your mind.",
    image: "/placeholder.svg?height=80&width=80",
  },
};

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Change back to a regular type for client components
type PageProps = {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function CommunityDetailPage({ params }: PageProps) {
  const [postContent, setPostContent] = useState("");
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunity = async () => {
      setLoading(true);

      // If params is a Promise in Next.js 15, handle it here
      const communityId =
        typeof params.id === "object" && "then" in params.id
          ? await (params.id as unknown as Promise<string>)
          : params.id;

      const foundCommunity =
        communitiesData[communityId as keyof typeof communitiesData];

      if (foundCommunity) {
        setCommunity(foundCommunity);
      } else {
        setCommunity({
          id: communityId,
          name: "Community Not Found",
          description: "This community could not be found.",
          image: "/placeholder.svg?height=80&width=80",
        });
      }
      setLoading(false);
    };

    fetchCommunity();
  }, [params.id]);

  const events = [
    {
      id: "1",
      title: "How I healed from anger issues",
      type: "Mentor Story Live",
      date: "14, November 2023",
      time: "7pm WAT",
      day: "13",
      month: "MON",
      attendees: 245,
      interested: false,
    },
    {
      id: "2",
      title: "How I healed from anger issues",
      type: "Mentor Story Live",
      date: "14, November 2023",
      time: "7pm WAT",
      day: "13",
      month: "MON",
      attendees: 245,
      interested: false,
    },
    {
      id: "3",
      title: "How I healed from anger issues",
      type: "Mentor Story Live",
      date: "14, November 2023",
      time: "7pm WAT",
      day: "13",
      month: "MON",
      attendees: 245,
      interested: false,
    },
  ];

  const posts = [
    {
      id: "1",
      author: {
        name: "Mentor Uche",
        avatar: "/placeholder.svg?height=40&width=40",
        time: "5 mins ago",
      },
      content:
        "I battled low self-esteem for most of my teens. What helped? Surrounding myself with people who saw the best in me, even when I didn't. If you're reading this — I believe in you.",
      likes: 187,
      comments: 24,
      shares: 3,
      liked: false,
    },
    {
      id: "2",
      author: {
        name: "Mentor Uche",
        avatar: "/placeholder.svg?height=40&width=40",
        time: "5 mins ago",
      },
      content:
        "I battled low self-esteem for most of my teens. What helped? Surrounding myself with people who saw the best in me, even when I didn't. If you're reading this — I believe in you.",
      likes: 187,
      comments: 24,
      shares: 3,
      liked: false,
    },
  ];

  const handlePublish = () => {
    setPostContent("");
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="mt-6">
        <h1 className="text-4xl font-medium mb-2">{community?.name}</h1>
        <p className="text-neutral-200">{community?.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-5">
        <div className="md:col-span-3 space-y-4 rounded-lg max-h-[550px] overflow-y-auto pb-8 pr-2">
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
                disabled={!postContent.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>

          {/* Posts Section */}
          <div className="">
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="space-y-4 bg-white rounded-[30px] px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                      />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-sm text-gray-500">
                        {post.author.time}
                      </p>
                    </div>
                  </div>

                  <div className="bg-grey-200 rounded-lg p-4">
                    <p>{post.content}</p>
                  </div>

                  <div className="flex justify-between items-center gap-6">
                    <button className="flex items-center gap-1 text-neutral-100 hover:text-primary-300">
                      <Heart className="h-5 w-5" />
                      <span>{post.likes} Likes</span>
                    </button>
                    <button className="flex items-center gap-1 text-neutral-100 hover:text-primary-300">
                      <MessageSquare className="h-5 w-5" />
                      <span>{post.comments} Comments</span>
                    </button>
                    <button className="flex items-center gap-1 text-neutral-100 hover:text-primary-300">
                      <Share2 className="h-5 w-5" />
                      <span>{post.shares} Shares</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
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

            <div className="space-y-6 max-h-[500px] overflow-y-auto pb-8 bg-white py-8 px-4 rounded-[30px]">
              {events.map((event) => (
                <CommunityEvent key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
