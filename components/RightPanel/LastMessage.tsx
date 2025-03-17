import { ChatMessage } from '@/lib/types';
import Image from 'next/image';

interface LastMessageProps {
  message: ChatMessage;
}

export default function LastMessage({ message }: LastMessageProps) {
  if (!message) return null;
  
  return (
    <div className="bg-white rounded-lg mt-2  shadow-sm border border-gray-100">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 m-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <Image src="/sale_icon.png" alt="OraclA" width={16} height={16} />
                              </div>
        <span className="text-sm">{message.content}</span>
      </div>
    </div>
  );
}