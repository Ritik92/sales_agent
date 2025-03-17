import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChatSuggestion } from "@/lib/types";

interface ConversationPathsProps {
  currentStep: string;
  suggestionsCount?: number;
  isLoading?: boolean;
  suggestions?: ChatSuggestion[]; // Added suggestions prop
}

export default function ConversationPaths({ 
  currentStep, 
  suggestionsCount = 3, 
  isLoading = false,
  suggestions = [] // Default to empty array
}: ConversationPathsProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Reset and start animation when loading state changes
  useEffect(() => {
    if (isLoading) {
      // Start loading animation
      setAnimationProgress(0);
      
      const startTime = Date.now();
      const duration = 1500; // 1.5 seconds for full animation
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setAnimationProgress(progress);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isLoading]);

  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <Image src={'/arrow_icon.png'} alt="OraclA" width={16} height={16} className='m-1' />
        <span className="text-gray-600 text-sm">
          {isLoading 
            ? "Calculating possible conversation paths" 
            : `Calculating possible conversation paths - ${suggestionsCount} suggestions found.`}
        </span>
        <span className="text-gray-600 text-sm ml-1">✨</span>
      </div>
      
      <div className="relative h-40 w-full overflow-visible"> {/* Changed to overflow-visible */}
        {isLoading ? (
          <AnimatedDotsPattern progress={animationProgress} />
        ) : (
          <>
            <DotsPattern 
              suggestionsCount={suggestionsCount} 
              suggestions={suggestions}
              onHover={setHoveredDot}
              hoveredDot={hoveredDot}
            />
            {/* This ensures tooltip can overflow container bounds */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
              {hoveredDot !== null && (
                <SuggestionTooltip 
                  suggestion={getActiveSuggestion(hoveredDot, suggestions)}
                  onUseSuggestion={() => {
                    // This would be linked to the useSuggestion function
                    const suggestion = getActiveSuggestion(hoveredDot, suggestions);
                    // useSuggestion(suggestion.content);
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Helper function to get the active suggestion
function getActiveSuggestion(dotIndex: number, suggestions: ChatSuggestion[]): ChatSuggestion {
  // If suggestions exist, use them. Otherwise return a placeholder suggestion
  if (suggestions && suggestions.length > 0) {
    // In a real implementation, you'd map specific dots to specific suggestions
    // For now we'll just use modulo to cycle through available suggestions
    const index = dotIndex % suggestions.length;
    return suggestions[index];
  }
  //@ts-ignore
  return { 
    id: "sample", 
    content: "We have less then 9 realtors.", 
    score: 15, 
    scoreLabel: "Clarifies position" 
  };
}

interface DotsPatternProps {
  suggestionsCount?: number;
  suggestions?: ChatSuggestion[];
  onHover: (dotIndex: number | null) => void;
  hoveredDot: number | null;
}

function DotsPattern({ 
  suggestionsCount = 3, 
  suggestions = [],
  onHover,
  hoveredDot
}: DotsPatternProps) {
  // Create a triangular pattern of dots
  const rows = 10;
  const totalDots = ((rows * (rows + 1)) / 2);
  const highlightedDots: number[] = [];
  
  // Determine which dots to highlight based on suggestion count
  if (suggestionsCount > 0) {
    // Create a visually balanced distribution of pink dots
    if (suggestionsCount === 1) {
      // Single dot in center
      highlightedDots.push(Math.floor(totalDots * 0.8)); // Bottom center dot
    } else if (suggestionsCount === 2) {
      // Two dots - one near bottom center, one in middle area
      highlightedDots.push(Math.floor(totalDots * 0.8)); // Bottom center dot
      highlightedDots.push(Math.floor(totalDots * 0.4)); // Middle area dot
    } else if (suggestionsCount === 3) {
      // Match the distribution in Image 2
      highlightedDots.push(Math.floor(totalDots * 0.8)); // Bottom center dot
      highlightedDots.push(Math.floor(totalDots * 0.55)); // Middle right dot
      highlightedDots.push(Math.floor(totalDots * 0.25)); // Upper area dot
    } else {
      // Distribute dots somewhat evenly
      const increment = Math.floor(totalDots / (suggestionsCount + 1));
      let current = increment;
      
      for (let i = 0; i < suggestionsCount; i++) {
        highlightedDots.push(current);
        current += increment;
      }
    }
  }
  
  return (
    <svg viewBox="0 0 500 350" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const dotsInRow = rowIndex + 1;
        const rowWidth = dotsInRow * 40;
        const rowOffset = (500 - rowWidth) / 2;
        
        return Array.from({ length: dotsInRow }).map((_, colIndex) => {
          const dotIndex = ((rowIndex * (rowIndex + 1)) / 2) + colIndex;
          const x = rowOffset + colIndex * 40 + 20;
          const y = rowIndex * 35 + 25;
          const isHighlighted = highlightedDots.includes(dotIndex);
          const isHovered = isHighlighted && hoveredDot === dotIndex;
          
          // Define the dot gradient based on state
          let dotFill = isHighlighted 
            ? isHovered 
              ? "rgba(219, 39, 119, 1)" // Brighter pink when hovered
              : "rgba(219, 39, 119, 0.8)" // Regular pink for highlighted
            : "rgba(59, 130, 246, 0.3)"; // Light blue for normal dots
          
          return (
            <g key={`${rowIndex}-${colIndex}`}>
              {/* Create a larger invisible circle for better hover target */}
              {isHighlighted && (
                <circle 
                  cx={x} 
                  cy={y} 
                  r={12}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => onHover(dotIndex)}
                  onMouseLeave={() => onHover(null)}
                />
              )}
              
              {/* The visible dot */}
              <circle 
                cx={x} 
                cy={y} 
                r={isHovered ? 6 : 5}
                fill={dotFill}
                className={`${isHighlighted ? "cursor-pointer" : "opacity-30"} transition-all duration-200`}
                onMouseEnter={() => isHighlighted && onHover(dotIndex)}
                onMouseLeave={() => onHover(null)}
                style={{
                  transition: "all 0.2s ease"
                }}
              />
              
              {/* Add a subtle pulse effect for highlighted dots */}
              {isHighlighted && !isHovered && (
                <circle
                  cx={x}
                  cy={y}
                  r={7}
                  fill="transparent"
                  stroke="rgba(219, 39, 119, 0.3)"
                  strokeWidth={1}
                  className="animate-ping opacity-50"
                  style={{
                    animationDuration: "3s"
                  }}
                />
              )}
            </g>
          );
        });
      })}
    </svg>
  );
}

interface SuggestionTooltipProps {
  suggestion: ChatSuggestion;
  onUseSuggestion?: () => void;
}

function SuggestionTooltip({ suggestion, onUseSuggestion }: SuggestionTooltipProps) {
  return (
    <div 
      className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg min-w-[300px] max-w-[350px] z-20 pointer-events-auto"
      style={{
        // Add gradient border matching the image
        border: "1px solid",
        borderRadius: "8px",
        borderImageSlice: 1,
        borderImageSource: "linear-gradient(to right, #3b82f6, #db2777)"
      }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
            +{suggestion.score}% {suggestion.scoreLabel}
          </div>
          <button 
            className="text-purple-600 text-sm hover:underline cursor-pointer"
            onClick={onUseSuggestion}
          >
            Use suggestion
          </button>
        </div>
        <p className="text-gray-700 text-sm">{suggestion.content}</p>
      </div>
      {/* Add speech bubble pointer */}
      <div 
        className="absolute w-4 h-4 bg-white rotate-45 transform"
        style={{
          bottom: "-8px",
          left: "calc(50% - 8px)",
          borderRight: "1px solid #3b82f6",
          borderBottom: "1px solid #db2777",
          borderImage: "linear-gradient(to right, #3b82f6, #db2777) 1"
        }}
      ></div>
    </div>
  );
}

function AnimatedDotsPattern({ progress = 0 }) {
  // Create animation for the skeleton loader with wave effect
  const rows = 10;
  
  // Calculate how many rows should be colored based on progress
  const coloredRows = Math.floor(progress * rows);
  
  return (
    <svg viewBox="0 0 500 350" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)">
            <animate 
              attributeName="offset" 
              values="-1; 2" 
              dur="1.5s" 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)">
            <animate 
              attributeName="offset" 
              values="-0.5; 2.5" 
              dur="1.5s" 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)">
            <animate 
              attributeName="offset" 
              values="0; 3" 
              dur="1.5s" 
              repeatCount="indefinite" 
            />
          </stop>
        </linearGradient>
      </defs>
      
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const dotsInRow = rowIndex + 1;
        const rowWidth = dotsInRow * 40;
        const rowOffset = (500 - rowWidth) / 2;
        
        // Determine if this row should be colored based on animation progress
        const isRowActive = rowIndex < coloredRows;
        // For the current row being filled, calculate partial coloring
        const isPartialRow = rowIndex === coloredRows;
        const partialProgress = progress * rows - coloredRows;
        
        return Array.from({ length: dotsInRow }).map((_, colIndex) => {
          const x = rowOffset + colIndex * 40 + 20;
          const y = rowIndex * 35 + 25;
          
          // For partial row, only color dots up to the progress point
          const isPartialDot = isPartialRow && (colIndex / dotsInRow) < partialProgress;
          
          let fill;
          if (isRowActive) {
            fill = "rgba(59, 130, 246, 0.6)";
          } else if (isPartialDot) {
            fill = "rgba(59, 130, 246, 0.4)";
          } else {
            fill = "url(#shimmer)";
          }
          
          // Sometimes add a pink highlight dot during animation for visual interest
          const shouldHighlight = isRowActive && Math.random() > 0.95;
          if (shouldHighlight) {
            fill = "rgba(219, 39, 119, 0.8)";
          }
          
          return (
            <circle 
              key={`${rowIndex}-${colIndex}`} 
              cx={x} 
              cy={y} 
              r={5}
              fill={fill}
              className={isRowActive || isPartialDot ? "" : "opacity-40"}
            />
          );
        });
      })}
    </svg>
  );
}