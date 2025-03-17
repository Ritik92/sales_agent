import Image from "next/image";

interface ConversationPathsProps {
    currentStep: string;
  }
  
  export default function ConversationPaths({ currentStep }: ConversationPathsProps) {
    return (
      <div>
        <div className="flex items-center mb-2">
          <Image src={'/arrow_icon.png'} alt="OraclA" width={16} height={16} className='m-1' />
          <span className="text-gray-600 text-sm">Calculating possible conversation paths</span>
          <span className="text-gray-600 text-sm ml-1">✨</span>
        </div>
        
        <div className="relative h-32 w-full">
          {/* SVG with dots pattern goes here */}
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {Array.from({ length: 150 }).map((_, i) => {
              const x = 10 + (i % 15) * 25;
              const y = 10 + Math.floor(i / 15) * 25;
              const opacity = Math.random() > 0.7 ? 0.8 : 0.3;
              return (
                <circle 
                  key={i} 
                  cx={x} 
                  cy={y} 
                  r={4} 
                  fill={`rgba(59, 130, 246, ${opacity})`} 
                />
              );
            })}
            {/* Highlight dot */}
            <circle cx="200" cy="100" r="6" fill="rgba(219, 39, 119, 1)" />
          </svg>
          
          {/* Active suggestion popup */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-md border border-gray-200 w-64">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                +15% Clarifies position
              </div>
              <button className="text-blue-500 text-xs">Use suggestion</button>
            </div>
            <p className="text-sm">I am an Owner/Manager.</p>
          </div>
        </div>
      </div>
    );
  }