"use client"

import { useState } from "react"
import ChatInput from "./ChatInput"
import type { ChatMessage } from "@/lib/types"
import ChatHistory from "./ChatHistory"
import Image from "next/image"

interface ChatInterfaceProps {
  messages: ChatMessage[]
  sendMessage: (content: string) => void
}

export default function ChatInterface({ messages, sendMessage }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue)
      setInputValue("")
    }
  }

  return (
    <div className="flex flex-col flex-1 border-r border-gray-200 overflow-hidden">
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Image src="/sale_icon.png" alt="OraclA" width={16} height={16} />
          </div>
          <span className="ml-2 font-semibold text-gray-800">OraclA</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ChatHistory messages={messages} />
      </div>

      <div className="mt-auto">
        <ChatInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} onSend={handleSendMessage} />
      </div>
    </div>
  )
}

