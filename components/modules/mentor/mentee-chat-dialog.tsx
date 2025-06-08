"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Smile, Paperclip, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Input } from "@/components/ui/input"

interface Mentee {
    name: string;
    avatar?: string;
    // Add other properties as needed
  }

interface MenteeChatDialogProps {
  mentee: Mentee
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Define message interface
interface Message {
    id: string;
    sender: "mentor" | "mentee";
    text: string;
    timestamp: Date;
  }

export function MenteeChatDialog({ mentee, open, onOpenChange }: MenteeChatDialogProps) {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([
      {
      id: "1",
      sender: "mentor",
      text: "Hi, I'm your new mentor!",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: "mentee",
      text: "Hi, can't wait to start",
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        sender: "mentor",
        text: message,
        timestamp: new Date(),
      },
    ])
    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px] p-0 h-[600px] flex flex-col">
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
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "mentor" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === "mentor" ? "bg-primary-400 text-white" : "bg-primary-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-3 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Smile className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[var(--color-primary-300)]"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
