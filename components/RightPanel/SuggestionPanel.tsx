"use client"

import type { ChatSuggestion } from "@/lib/types"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"

interface SuggestionPanelProps {
  suggestions: ChatSuggestion[]
  useSuggestion: (suggestion: string) => void
  isLoading?: boolean
}

export default function SuggestionPanel({ suggestions, useSuggestion, isLoading = false }: SuggestionPanelProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0)
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + Math.random() * 0.1
          return newProgress >= 1 ? 1 : newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setLoadingProgress(1)
    }
  }, [isLoading])

  const handleUseSuggestion = useCallback(
    (suggestionContent: string) => {
      useSuggestion(suggestionContent)
    },
    [useSuggestion],
  )

  if (isLoading) {
    return <SuggestionSkeleton count={2} progress={loadingProgress} />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-3 text-xs sm:text-sm md:text-base font-medium text-gray-800">
        <span className="text-pink-500 mr-2 flex-shrink-0">
          <Image
            src="/followupicon.png"
            alt="followupicon"
            width={12}
            height={12}
            className="sm:w-3 sm:h-3 md:w-4 md:h-4"
          />
        </span>
        <span className="line-clamp-2 sm:line-clamp-1">Top message follow-up recommendation</span>
      </div>

      {/* Suggestions list */}
      <div className="space-y-3 md:space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white border border-blue-200 rounded-xl p-3 md:p-4 shadow-sm">
            {/* Suggestion header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
              <div className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium w-fit">
                +{suggestion.score}% {suggestion.scoreLabel}
              </div>
              <button className="text-xs sm:text-sm font-medium flex items-center w-fit">
                <span className="bg-gradient-to-r from-[#1977F2] to-[#D22163] bg-clip-text text-transparent">
                  Preview next messages
                </span>
                <Image
                  src="/document-copy.png"
                  alt="previewicon"
                  width={14}
                  height={14}
                  className="ml-1 sm:w-4 sm:h-4 md:w-5 md:h-5"
                />
              </button>
            </div>

            {/* Suggestion content */}
            <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-3">{suggestion.content}</p>

            {/* Action button */}
            <button
              className="text-indigo-500 text-xs sm:text-sm md:text-base font-medium mt-1"
              onClick={() => handleUseSuggestion(suggestion.content)}
            >
              Use suggestion
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SuggestionSkeleton({ count = 2, progress = 0 }) {
  // Different skeleton states based on loading progress
  const stageOne = progress < 0.3
  const stageTwo = progress >= 0.3 && progress < 0.6
  const stageThree = progress >= 0.6

  return (
    <div className="space-y-3 md:space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-blue-200 rounded-xl p-3 md:p-4 shadow-sm transition-all duration-300"
          style={{ opacity: Math.min(0.4 + progress * 0.6, 1) }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
            {stageOne ? (
              <div className="bg-gray-100 h-4 w-16 sm:w-20 rounded-full animate-pulse"></div>
            ) : (
              <div className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium opacity-70 w-fit">
                {stageThree ? "+15% Clarifies position" : "+--% Loading..."}
              </div>
            )}

            <div className="bg-gray-100 h-4 w-28 md:w-32 rounded animate-pulse"></div>
          </div>

          <div className="space-y-2 mb-3">
            {stageOne ? (
              <>
                <div className="bg-gray-100 h-3 w-full rounded animate-pulse"></div>
                <div className="bg-gray-100 h-3 w-full rounded animate-pulse"></div>
              </>
            ) : stageTwo ? (
              <>
                <div className="bg-gray-100 h-4 w-full rounded animate-pulse"></div>
                <div className="bg-gray-100 h-4 w-3/4 rounded animate-pulse"></div>
              </>
            ) : (
              <div className="text-xs sm:text-sm md:text-base text-gray-500">Loading suggestion content...</div>
            )}
          </div>

          <div className="mt-2">
            {stageThree ? (
              <div className="text-indigo-400 text-xs sm:text-sm md:text-base font-medium">Use suggestion</div>
            ) : (
              <div className="bg-gray-100 h-4 w-20 rounded animate-pulse"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}