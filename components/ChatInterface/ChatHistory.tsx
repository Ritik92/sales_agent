import { ChatMessage } from '@/lib/types';
import Image from 'next/image';

interface ChatHistoryProps {
  messages: ChatMessage[];
}

export default function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="flex-grow overflow-y-auto p-4 bg-gray-50" style={{ backgroundImage: 'url(/chat-bg.png)' }}>
      {messages.map((message) => (
        <div key={message.id} className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          {message.sender === 'bot' && (
            <div className="w-8 h-8 m-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Image src="/sale_icon.png" alt="OraclA" width={16} height={16} />
                      </div>
          )}
          
          <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
            message.sender === 'user' 
              ? 'bg-[#E1FFC7] text-gray-800' 
              : 'bg-white text-gray-800 shadow-sm'
          }`}>
            <p>{message.content}</p>
            <span className="text-xs text-gray-500 mt-1 block text-right">{message.timestamp}</span>
          </div>
          
          {message.sender === 'user' && (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2">
              <Image src="/user-avatar.png" alt="User" className="w-6 h-6 rounded-full" width={24} height={24}/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}