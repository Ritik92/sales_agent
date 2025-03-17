import { ChatSuggestion } from '@/lib/types';

interface SuggestionPanelProps {
  suggestions: ChatSuggestion[];
  useSuggestion: (suggestion: string) => void;
}

export default function SuggestionPanel({ suggestions, useSuggestion }: SuggestionPanelProps) {
  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <div 
          key={suggestion.id} 
          className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
              +{suggestion.score}% {suggestion.scoreLabel}
            </div>
            <button className="text-blue-500 text-sm flex items-center">
              <span>Preview next messages</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <p className="text-sm mb-2">{suggestion.content}</p>
          
          <button 
            className="text-blue-500 text-sm"
            onClick={() => useSuggestion(suggestion.content)}
          >
            Use suggestion
          </button>
        </div>
      ))}
    </div>
  );
}