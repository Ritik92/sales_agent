import { ChatSuggestion } from '@/lib/types';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SuggestionPanelProps {
  suggestions: ChatSuggestion[];
  useSuggestion: (suggestion: string) => void;
  isLoading?: boolean;
}

export default function SuggestionPanel({ 
  suggestions, 
  useSuggestion,
  isLoading = false 
}: SuggestionPanelProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Simulate loading progress
  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + (Math.random() * 0.1);
          return newProgress >= 1 ? 1 : newProgress;
        });
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(1);
    }
  }, [isLoading]);

  if (isLoading) {
    return <SuggestionSkeleton count={2} progress={loadingProgress} />;
  }

  return (
    <div className="pt-2">
      <div className="flex items-center mb-4 text-xl font-medium text-gray-800">
        <span className="text-pink-500 mr-2">
        <Image src="/followupicon.png" alt="followupicon" width={16} height={16} className='m-1' />
        </span>
        Top message follow-up recommendation
      </div>
      
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id} 
            className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                +{suggestion.score}% {suggestion.scoreLabel}
              </div>
                <button className="text-lg font-medium flex items-center">
                <span className="bg-gradient-to-r from-[#1977F2] to-[#D22163] bg-clip-text text-transparent">
                  Preview next messages
                </span>
                <Image src="/document-copy.png" alt="previewicon" width={24} height={24} className='m-1' />
                </button>
            </div>
            
            <p className="text-lg text-gray-700 mb-3">{suggestion.content}</p>
            
            <button 
              className="text-indigo-500 text-lg font-medium"
              onClick={() => useSuggestion(suggestion.content)}
            >
              Use suggestion
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuggestionSkeleton({ count = 2, progress = 0 }) {
  // Different skeleton states based on loading progress
  const stageOne = progress < 0.3;
  const stageTwo = progress >= 0.3 && progress < 0.6;
  const stageThree = progress >= 0.6;
  
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm transition-all duration-300"
          style={{ opacity: Math.min(0.4 + progress * 0.6, 1) }}
        >
          <div className="flex justify-between items-center mb-3">
            {stageOne ? (
              <div className="bg-gray-100 h-6 w-20 rounded-full animate-pulse"></div>
            ) : (
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium opacity-70">
                {stageThree ? '+15% Clarifies position' : '+--% Loading...'}
              </div>
            )}
            
            <div className="bg-gray-100 h-6 w-48 rounded animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            {stageOne ? (
              <>
                <div className="bg-gray-100 h-5 w-24 rounded animate-pulse"></div>
                <div className="bg-gray-100 h-5 w-32 rounded animate-pulse"></div>
              </>
            ) : stageTwo ? (
              <>
                <div className="bg-gray-100 h-6 w-full rounded animate-pulse"></div>
                <div className="bg-gray-100 h-6 w-3/4 rounded animate-pulse"></div>
              </>
            ) : (
              <div className="text-lg mb-3 text-gray-500">Loading suggestion content...</div>
            )}
          </div>
          
          <div className="mt-3">
            {stageThree ? (
              <div className="text-indigo-400 text-lg font-medium">Use suggestion</div>
            ) : (
              <div className="bg-gray-100 h-6 w-32 rounded animate-pulse"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}