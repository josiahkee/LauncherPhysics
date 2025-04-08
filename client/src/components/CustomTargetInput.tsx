interface CustomTargetInputProps {
  visible: boolean;
  targetX: number;
  targetY: number;
  onChangeX: (x: number) => void;
  onChangeY: (y: number) => void;
}

export default function CustomTargetInput({ 
  targetX, 
  targetY, 
  onChangeX, 
  onChangeY 
}: CustomTargetInputProps) {
  
  const handleCoordinateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const gridElement = e.currentTarget;
    const rect = gridElement.getBoundingClientRect();
    
    // Calculate x, y coordinates relative to the grid (0-200 range)
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 200);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 200);
    
    onChangeX(x);
    onChangeY(y);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Target Position (200x200 cm grid)
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div>
          <label htmlFor="target-x" className="block text-xs font-medium text-slate-600 mb-1">
            X-coordinate (0-200 cm)
          </label>
          <input 
            type="number" 
            id="target-x" 
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
            placeholder="X position (depth)"
            step="1"
            value={targetX}
            onChange={(e) => onChangeX(parseInt(e.target.value) || 0)}
            min={0}
            max={200}
          />
        </div>
        <div>
          <label htmlFor="target-y" className="block text-xs font-medium text-slate-600 mb-1">
            Y-coordinate (0-200 cm)
          </label>
          <input 
            type="number" 
            id="target-y" 
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
            placeholder="Y position (side-to-side)"
            step="1"
            value={targetY}
            onChange={(e) => onChangeY(parseInt(e.target.value) || 0)}
            min={0}
            max={200}
          />
        </div>
      </div>
      
      <div className="relative border border-slate-300 rounded-md overflow-hidden"
        style={{ aspectRatio: "1/1", maxHeight: "300px" }}
        onClick={handleCoordinateClick}
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-slate-200"></div>
          ))}
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-300"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-slate-300"></div>
          <div className="absolute top-1/4 left-0 right-0 h-px bg-slate-300"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-slate-300"></div>
        </div>
        
        {/* Coordinate labels */}
        <div className="absolute top-0 left-0 p-1 text-[10px] text-slate-500">0cm</div>
        <div className="absolute top-0 right-0 p-1 text-[10px] text-slate-500">200cm</div>
        <div className="absolute bottom-0 left-0 p-1 text-[10px] text-slate-500">0cm</div>
        <div className="absolute bottom-0 right-0 p-1 text-[10px] text-slate-500">200cm</div>
        
        {/* Target marker */}
        <div 
          className="absolute w-4 h-4 rounded-full bg-red-500 transform -translate-x-1/2 -translate-y-1/2 shadow-md z-10"
          style={{ 
            left: `${(targetX / 200) * 100}%`, 
            top: `${(targetY / 200) * 100}%`,
          }}
        ></div>
        
        {/* Launcher position marker - 100cm away from left side */}
        <div 
          className="absolute w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 shadow-md"
          style={{ left: '-12%', top: '50%' }}
        ></div>
        <div className="absolute text-[10px] text-blue-600 font-medium" style={{ left: '-20%', top: '55%' }}>
          Launcher
        </div>
      </div>
      
      <div className="mt-2 text-xs text-slate-500 text-center">
        Click anywhere on the grid to set target position, or use the input fields above.
      </div>
    </div>
  );
}
