import { OraclAStats } from '@/lib/types';

interface MetricsPanelProps {
  stats: OraclAStats;
}

export default function MetricsPanel({ stats }: MetricsPanelProps) {
  return (
    <div className="grid grid-cols-3 border-b border-gray-200 ">
      <div className=" flex flex-col items-center justify-center text-center border-r border-gray-200">
        <span className="text-sm  font-medium ">Buyer emotion</span>
        <span className="flex items-center mt-1">
          <span className="text-blue-500">Excited</span>
          <span className="ml-1">😃</span>
        </span>
      </div>
      
      <div className=" flex flex-col items-center justify-center text-center border-r border-gray-200">
        <span className="text-sm font-medium">Onboarding Stage</span>
        <span className="text-blue-500 mt-1">Role & Personalization</span>
      </div>
      
      <div className="p-3 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-medium">Current Goal</span>
        <span className="text-blue-500 mt-1">Identify user role</span>
      </div>
    </div>
  );
}