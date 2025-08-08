"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, Smile, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Input } from "@/components/ui/input"
import { StartChatQuery } from "@/components/queries/chat/start-chat"
import { GetMessagesQuery, type MessageData } from "@/components/queries/chat/get-messages"
import { SendMessageQuery } from "@/components/queries/chat/send-message"
import { toast } from "react-toastify"

interface Mentee {
    name: string;
    avatar?: string;
    id: string;
    menteeUserId: string;
  }

interface MenteeChatDialogProps {
  mentee: Mentee
  open: boolean
  onOpenChange: (open: boolean) => void
}
interface Message {
    id: string;
    sender: "mentor" | "mentee";
    text: string;
    timestamp: Date;
    sentAt: Date;
  }

export function MenteeChatDialog({ mentee, open, onOpenChange }: MenteeChatDialogProps) {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [chatId, setChatId] = useState<string>("")
    const [isSending, setIsSending] = useState<boolean>(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const emojiPickerRef = useRef<HTMLDivElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const fetchMessages = useCallback(async (currentChatId?: string) => {
      const chatIdToUse = currentChatId || chatId;
      if (!chatIdToUse) return;

      try {
        const response = await GetMessagesQuery({ chatId: chatIdToUse });
        if (response.isSuccess && response.data) {
          const formattedMessages: Message[] = response.data.map((msgData: MessageData) => ({
            id: msgData.id,
            sender: msgData.userId === mentee.menteeUserId ? "mentee" : "mentor",
            text: msgData.content,
            timestamp: new Date(msgData.createdDate),
            sentAt: new Date(msgData.sentAt),
          }));
          setMessages(formattedMessages);
          setTimeout(scrollToBottom, 100);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    }, [chatId, mentee.menteeUserId]);

    useEffect(() => {
      if (open && mentee.menteeUserId) {
        initializeChat();
      }
      
      if (!open) {
        setMessages([]);
        setChatId("");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, [open, mentee.menteeUserId]);

    useEffect(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (open && chatId) {
        intervalRef.current = setInterval(() => {
          fetchMessages();
        }, 5000);
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [open, chatId, fetchMessages]);

    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const chatResponse = await StartChatQuery({ peerUserId: mentee.menteeUserId });
        if (chatResponse.isSuccess && chatResponse.data) {
          setChatId(chatResponse.data.id);
          await fetchMessages(chatResponse.data.id);
        } else {
          toast.error(chatResponse.message || "Failed to initialize chat");
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        toast.error("Failed to initialize chat");
      } finally {
        setIsLoading(false);
      }
    };

    const formatMessageDate = (date: Date) => {
      const today = new Date();
      const messageDate = new Date(date);
      
      if (messageDate.toDateString() === today.toDateString()) {
        return "Today";
      }
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      if (messageDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      }
      
      return messageDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    const formatMessageTime = (date: Date) => {
      return new Date(date).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    };

    const groupMessagesByDate = (messages: Message[]) => {
      const groups: { [key: string]: Message[] } = {};
      
      messages.forEach((message) => {
        const dateKey = message.sentAt.toDateString();
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(message);
      });
      
      return Object.entries(groups).map(([dateKey, msgs]) => ({
        date: new Date(dateKey),
        messages: msgs.sort((a, b) => a.sentAt.getTime() - b.sentAt.getTime())
      })).sort((a, b) => a.date.getTime() - b.date.getTime());
    };

  const handleSendMessage = async () => {
    if (!message.trim() || !chatId || isSending) return

    setIsSending(true);
    const messageText = message.trim();
    setMessage("");

    try {
      let response = await SendMessageQuery({
        chatId: chatId,
        content: messageText
      });


      if (response.isSuccess) {
        const tempMessage: Message = {
          id: Date.now().toString(),
          sender: "mentor",
          text: messageText,
          timestamp: new Date(),
          sentAt: new Date(),
        };
        setMessages(prev => [...prev, tempMessage]);
        setTimeout(scrollToBottom, 100);
        await fetchMessages();
      } else {
        toast.error(response.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
          setShowEmojiPicker(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Dynamic emoji generation function
    const generateEmojis = () => {
      const emojiCategories = {
        smileys: { start: 0x1F600, end: 0x1F64F },
        people: { start: 0x1F466, end: 0x1F487 },
        gestures: { start: 0x1F44A, end: 0x1F64F },
        hearts: [0x2764, 0x1F49B, 0x1F49A, 0x1F499, 0x1F49C, 0x1F5A4, 0x1F90D, 0x1F90E],
        symbols: [0x2728, 0x1F525, 0x1F4AF, 0x1F389, 0x1F38A, 0x1F44F, 0x1F44D, 0x1F44E],
        nature: { start: 0x1F330, end: 0x1F35F },
      }

      const allEmojis: string[] = []

      Object.entries(emojiCategories).forEach(([category, range]) => {
        if (Array.isArray(range)) {
          range.forEach(code => {
            allEmojis.push(String.fromCodePoint(code))
          })
        } else if (typeof range === 'object' && 'start' in range && 'end' in range) {
          for (let i = range.start; i <= range.end; i++) {
            try {
              const emoji = String.fromCodePoint(i)
              if (emoji.length > 0) {
                allEmojis.push(emoji)
              }
            } catch (error) {
            }
          }
        }
      })

      return allEmojis.slice(0, 32)
    }

    const emojis = generateEmojis()

    const handleEmojiSelect = (emoji: string) => {
      setMessage(prev => prev + emoji)
      setShowEmojiPicker(false)
    }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className="right-0 mt-3 mr-3 md:mr-5 h-auto max-h-[97vh] w-[95%] overflow-hidden rounded-lg border-0 py-4 sm:max-w-md flex flex-col"
      >
        <div className="flex items-center gap-3 p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src={mentee.avatar || "/placeholder.svg"} alt={mentee.name} />
            <AvatarFallback>{mentee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{mentee.name}</h3>
            <Badge variant="outline" className="text-xs">
              Mentee
            </Badge>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center">
              <p className="text-gray-500">Loading messages...</p>
            </div>
          ) : (
            groupMessagesByDate(messages).map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-4">
                {/* Date separator */}
                <div className="flex justify-center">
                  <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {formatMessageDate(group.date)}
                  </div>
                </div>
                
                {/* Messages for this date */}
                {group.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "mentor" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[80%]">
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          msg.sender === "mentor" ? "bg-primary-400 text-white" : "bg-primary-200 text-gray-800"
                        }`}
                      >
                        <div className="flex items-end justify-between gap-2">
                          <p className="break-words flex-1">{msg.text}</p>
                          <span className={`text-xs whitespace-nowrap self-end ${
                            msg.sender === "mentor" ? "text-gray-200" : "text-gray-500"
                          }`} style={{ fontSize: '0.65rem' }}>
                            {formatMessageTime(msg.sentAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-3 flex items-center gap-2 relative">
          <Input
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          
          <div className="relative" ref={emojiPickerRef}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-5 w-5" />
            </Button>
            
            {/* Dynamic Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0 bg-white border rounded-lg shadow-lg p-3 z-50 w-80 max-h-64 overflow-y-auto">
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="text-xl hover:bg-gray-100 rounded p-2 transition-colors text-center"
                      title={`Emoji ${index + 1}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[var(--color-primary-300)] hover:text-[var(--color-primary-400)]"
            onClick={handleSendMessage}
            disabled={!message.trim() || !chatId || isSending}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}