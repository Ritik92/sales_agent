import { ChatMessage, ChatScript, OraclAStats, ScriptStep } from '@/lib/types';
import MetricsPanel from './MetricsPanel';
import LastMessage from './LastMessage';
import ConversationPaths from './ConversationPaths';
import SuggestionPanel from './SuggestionPanel';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

interface RightPanelProps {
  stats: OraclAStats;
  lastMessage: ChatMessage;
  currentStep: string;
  scriptStep: ScriptStep;
  useSuggestion: (suggestion: string) => void;
  loading?: boolean;
}

export default function RightPanel({ 
  stats, 
  lastMessage, 
  currentStep, 
  scriptStep, 
  useSuggestion,
  loading = false
}: RightPanelProps) {
  const [isPathsLoading, setIsPathsLoading] = useState(false);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [suggestionsCount, setSuggestionsCount] = useState(0);
  
  // Function to simulate loading sequence
  const simulateLoading = useCallback(() => {
    // Start loading both components
    setIsPathsLoading(true);
    setIsSuggestionsLoading(true);
    
    // Conversation paths finish loading first (after 1.5s)
    setTimeout(() => {
      setIsPathsLoading(false);
      setSuggestionsCount(scriptStep.suggestions.length);
      
      // Then suggestions finish loading (after 2.5s total)
      setTimeout(() => {
        setIsSuggestionsLoading(false);
      }, 1000);
    }, 1500);
  }, [scriptStep.suggestions.length]);

  // Trigger loading simulation when component mounts
  useEffect(() => {
    simulateLoading();
  }, [simulateLoading]);
  
  // Simulate loading when new message arrives
  useEffect(() => {
    simulateLoading();
  }, [lastMessage, simulateLoading]);
  


  return (
    <div className="w-[40%] flex flex-col">
      <div className="p-4 flex items-center justify-center border-b border-gray-200">
      <div className="flex items-center">
      <span className="bg-gradient-to-r from-purple-900 to-purple-500 text-transparent bg-clip-text font-normal text-2xl">OraclA</span>
      <span className="font-normal ml-1 text-2xl bg-gradient-to-r from-pink-500 to-pink-300 text-transparent bg-clip-text">c1-pro</span>
    </div>
       
      </div>
      <div className='border border-gray-200 ml-6 bg-gradient-to-b from-white to-purple-200 h-full'>
        <MetricsPanel stats={stats} />
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            <Image src="/message_icon.png" alt="OraclA" width={16} height={16} className='mt-1' />
            <span className="text-gray-600 text-sm ml-2">Last message</span>
          </div>
          
          <LastMessage message={lastMessage} />
        </div>
        
        <div className="p-4">
          <ConversationPaths 
            currentStep={currentStep} 
            suggestionsCount={suggestionsCount}
            isLoading={isPathsLoading}
            suggestions={scriptStep.suggestions}
          />
        </div>
        
        <div className="flex-grow p-4">
          
          
          <SuggestionPanel 
            suggestions={scriptStep.suggestions} 
            useSuggestion={useSuggestion}
            isLoading={isSuggestionsLoading}
          />
        </div>
      </div>
    </div>
  );
}