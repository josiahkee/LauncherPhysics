import { calculateTrajectory, TrajectoryPoint } from "../utils/calculations";
import { useEffect, useState } from "react";

interface TrajectoryVisualizationProps {
  targetDistance: number;
  launchAngle: number;
}

export default function TrajectoryVisualization({ targetDistance, launchAngle }: TrajectoryVisualizationProps) {
  const [trajectoryPoints, setTrajectoryPoints] = useState<TrajectoryPoint[]>([]);
  
  useEffect(() => {
    // Only calculate when we have valid values
    if (targetDistance > 0 && launchAngle >= 0) {
      // Convert targetDistance from meters to centimeters for visualization
      const targetDistanceCm = targetDistance * 100;
      
      // Fixed values for visualization
      const mass = 50; // grams
      const springConstant = 30; // N/m
      
      const points = calculateTrajectory(targetDistanceCm, launchAngle, springConstant, mass);
      setTrajectoryPoints(points);
    }
  }, [targetDistance, launchAngle]);
  
  if (trajectoryPoints.length === 0) {
    return null;
  }
  
  // Find the maximum height for scaling
  const maxHeight = Math.max(...trajectoryPoints.map(point => point.y));
  // Use targetDistance as max X (converted to cm)
  const maxDistance = targetDistance * 100;
  
  return (
    <div className="mt-6 mb-6">
      <h3 className="text-lg font-medium text-slate-800 mb-2">Trajectory Visualization</h3>
      <div 
        className="relative border border-slate-300 rounded-md overflow-hidden bg-slate-50"
        style={{ height: "150px" }}
      >
        {/* Axes */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-slate-400"></div>
        <div className="absolute bottom-0 left-0 w-px h-full bg-slate-400"></div>
        
        {/* Target marker */}
        <div 
          className="absolute bottom-0 w-px h-8 bg-red-500"
          style={{ left: `${(targetDistance * 100 / maxDistance) * 100}%` }}
        ></div>
        
        {/* Trajectory path */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-full" 
          viewBox={`0 0 ${maxDistance} ${maxHeight * 1.1}`}
          preserveAspectRatio="none"
        >
          <path
            d={`M 0,0 ${trajectoryPoints.map(point => `L ${point.x},${maxHeight - point.y}`).join(' ')}`}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />
        </svg>
        
        {/* Label for axes */}
        <div className="absolute bottom-1 right-1 text-xs text-slate-500">
          {targetDistance.toFixed(1)}m
        </div>
        <div className="absolute top-1 left-1 text-xs text-slate-500">
          Height
        </div>
      </div>
    </div>
  );
}