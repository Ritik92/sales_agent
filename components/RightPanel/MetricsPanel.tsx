import type { OraclAStats } from "@/lib/types"

interface MetricsPanelProps {
  stats: OraclAStats
}

export default function MetricsPanel({ stats }: MetricsPanelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-gray-200 gap-1 sm:gap-0">
      <div className="flex flex-col items-center justify-center text-center sm:border-r border-gray-200 py-1 sm:py-2">
        <span className="text-[10px] xs:text-xs sm:text-sm font-medium">Buyer emotion</span>
        <span className="flex items-center mt-0.5 sm:mt-1">
          <span className="text-blue-500 text-[10px] xs:text-xs sm:text-sm">Excited</span>
          <span className="ml-1">😃</span>
        </span>
      </div>

      <div className="flex flex-col items-center justify-center text-center sm:border-r border-gray-200 py-1 sm:py-2">
        <span className="text-[10px] xs:text-xs sm:text-sm font-medium">Onboarding Stage</span>
        <span className="text-blue-500 text-[10px] xs:text-xs sm:text-sm mt-0.5 sm:mt-1">Role & Personalization</span>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-1 sm:py-2">
        <span className="text-[10px] xs:text-xs sm:text-sm font-medium">Current Goal</span>
        <span className="text-blue-500 text-[10px] xs:text-xs sm:text-sm mt-0.5 sm:mt-1">Identify user role</span>
      </div>
    </div>
  )
}