interface TrajectoryVisualizationProps {
  targetDistance: number;
  launchAngle: number;
}

export default function TrajectoryVisualization({ targetDistance, launchAngle }: TrajectoryVisualizationProps) {
  // Calculate the path based on the target distance and launch angle
  const generateTrajectoryPath = () => {
    // Normalized for SVG viewbox
    const maxHeight = 50; // Maximum height of trajectory in SVG coordinates
    const width = 100; // Width of SVG

    // Calculate trajectory path using projectile motion equations
    // For a parabola, we can use a quadratic bezier curve
    const angleRad = launchAngle * (Math.PI / 180);
    
    // Estimate height of trajectory based on angle and distance
    // This is a simplified approximation
    const peakHeight = Math.min(maxHeight, Math.sin(angleRad) * maxHeight);
    
    // For a quadratic bezier curve, we need a control point
    const controlX = width / 2;
    const controlY = 100 - peakHeight; // SVG y-axis is inverted
    
    return `M0,100 Q${controlX},${controlY} ${width},100`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Trajectory Preview</h2>
      <div className="h-[200px] bg-slate-50 rounded-md border border-slate-200 relative overflow-hidden">
        {/* Ground line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-slate-300"></div>
        
        {/* Launch point */}
        <div className="absolute bottom-0 left-6 w-2 h-2 bg-primary-600 rounded-full"></div>
        
        {/* Trajectory path */}
        <svg className="absolute bottom-0 left-6 w-[calc(100%-4rem)] h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={generateTrajectoryPath()}
            stroke="rgba(37, 99, 235, 0.5)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 2"
          />
        </svg>
        
        {/* Target marker */}
        <div className="absolute bottom-0 right-10 flex flex-col items-center">
          <div className="w-0.5 h-16 bg-amber-500"></div>
          <div className="text-xs text-slate-500 mt-1">Target</div>
        </div>
      </div>
      <div className="mt-3 text-sm text-slate-500 text-center">
        This simplified visualization represents the approximate trajectory path.
      </div>
    </div>
  );
}
