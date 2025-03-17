import Image from "next/image";


interface SidebarProps {
  username: string;
  progress: number;
}

export default function Sidebar({ username, progress }: SidebarProps) {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      
      
      <div className="flex-grow">
        <Image src={'/sale_icon.png'} alt="Sales icon" width={40} height={40} />
      </div>
      
      <div className="relative h-32 w-8 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-blue-500" 
          style={{ height: `${progress}%` }}
        >
          <div className="absolute top-0 left-0 right-0 text-center text-white text-xs font-bold">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}