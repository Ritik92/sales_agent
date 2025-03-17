"use client"

import type { ChangeEvent, KeyboardEvent } from "react"

interface ChatInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSend: () => void
}

export default function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSend()
    }
  }

  return (
    <div className="flex h-full items-center p-2 md:p-3 border-t border-gray-200">
      <button className="text-gray-400 hover:text-gray-600 mr-2 hidden sm:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
      </button>

      <input
        type="text"
        placeholder="Message"
        className="flex-grow p-2 border-0 focus:outline-none focus:ring-0 text-sm md:text-base"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />

      <button className="text-gray-400 hover:text-gray-600 mx-1 md:mx-2 hidden sm:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <button className="bg-green-500 text-white p-1.5 md:p-2 rounded-full hover:bg-green-600" onClick={onSend}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-5 md:w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

