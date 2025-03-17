import { ChatMessage, ChatScript, OraclAStats, ScriptStep } from '@/lib/types';
import MetricsPanel from './MetricsPanel';
import LastMessage from './LastMessage';
import ConversationPaths from './ConversationPaths';
import SuggestionPanel from './SuggestionPanel';
import Image from 'next/image';

interface RightPanelProps {
  stats: OraclAStats;
  lastMessage: ChatMessage;
  currentStep: string;
  scriptStep: ScriptStep;
  useSuggestion: (suggestion: string) => void;
}

export default function RightPanel({ 
  stats, 
  lastMessage, 
  currentStep, 
  scriptStep, 
  useSuggestion 
}: RightPanelProps) {
  return (
    <div className="w-[40%]   flex flex-col ">
      <div className="p-4 flex items-center justify-center border-b border-gray-200">
        <div className="flex items-center ">
          <span className="text-purple-800 font-bold">OraclA</span>
          <span className="text-pink-500 font-bold ml-1">cl-pro</span>
        </div>
        <div>
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
        <ConversationPaths currentStep={currentStep} />
      </div>
      
      <div className="flex-grow p-4">
        <div className="flex items-center mb-2">
          <Image src="/followupicon.png" alt="followupicon" width={16} height={16} className='m-1' />
          <span className="text-gray-600 text-sm">Best follow-up suggestion</span>
        </div>
        
        <SuggestionPanel 
          suggestions={scriptStep.suggestions} 
          useSuggestion={useSuggestion} 
        />
      </div>
      </div>
      
    </div>
  );
}
