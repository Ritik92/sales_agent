import type { ChatMessage } from "@/lib/types"
import Image from "next/image"

interface ChatHistoryProps {
  messages: ChatMessage[]
}

export default function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="h-full overflow-y-auto p-3 bg-gray-50" style={{ backgroundImage: "url(/chat-bg.png)" }}>
      {messages.map((message) => (
        <div key={message.id} className={`flex mb-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
          {message.sender === "bot" && (
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
              <Image src="/sale_icon.png" alt="OraclA" width={12} height={12} className="md:w-4 md:h-4" />
            </div>
          )}

          <div
            className={`max-w-[75%] px-3 py-2 rounded-lg ${
              message.sender === "user" ? "bg-[#E1FFC7] text-gray-800 ml-2" : "bg-white text-gray-800 shadow-sm mr-2"
            }`}
          >
            <p className="text-xs md:text-sm break-words">{message.content}</p>
            <span className="text-[10px] md:text-xs text-gray-500 mt-1 block text-right">{message.timestamp}</span>
          </div>

          {message.sender === "user" && (
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
              <Image
                src="/user-avatar.png"
                alt="User"
                className="w-5 h-5 md:w-6 md:h-6 rounded-full"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

