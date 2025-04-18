import { CalculationResult } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultDisplayProps {
  result: CalculationResult | null;
  isLoading: boolean;
}

export default function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  if (isLoading) {
    return (
      <div>
        <div className="bg-slate-50 rounded-md p-4 mb-4 border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-1">Required Spring Contraction</h3>
          <Skeleton className="h-10 w-32 bg-slate-200" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
            <h3 className="text-xs font-medium text-slate-500 mb-1">Target Position</h3>
            <Skeleton className="h-6 w-20 bg-slate-200" />
          </div>
          <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
            <h3 className="text-xs font-medium text-slate-500 mb-1">Angle Setting</h3>
            <Skeleton className="h-6 w-24 bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div className="bg-slate-50 rounded-md p-4 mb-4 border border-slate-200 text-center text-slate-500">
        No calculation result yet. Enter parameters and click Calculate.
      </div>
    );
  }
  
  // Format the target position for display
  const getTargetPositionText = () => {
    if (result.targetX !== undefined && result.targetY !== undefined) {
      return `${result.targetX}, ${result.targetY}`;
    } else if (result.targetType) {
      return result.targetType.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    } else {
      return "Custom";
    }
  };
  
  return (
    <div>
      <div className="bg-slate-50 rounded-md p-4 mb-4 border border-slate-200">
        <h3 className="text-sm font-medium text-slate-500 mb-1">Required Spring Contraction</h3>
        <div className="text-3xl font-mono font-semibold text-primary-700">
          {result.contractionDistance.toFixed(1)} <span className="text-lg">cm</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
          <h3 className="text-xs font-medium text-slate-500 mb-1">Angle Setting</h3>
          <div className="text-lg font-medium text-slate-700">
            {result.angleSetting}
          </div>
        </div>
        
        {result.targetType && (
          <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
            <h3 className="text-xs font-medium text-slate-500 mb-1">Target Type</h3>
            <div className="text-lg font-medium text-slate-700">
              {getTargetPositionText()}
            </div>
          </div>
        )}
        
        {result.targetX !== undefined && result.targetY !== undefined && (
          <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
            <h3 className="text-xs font-medium text-slate-500 mb-1">Target Coordinates (cm)</h3>
            <div className="text-lg font-mono font-medium text-slate-700">
              X: {result.targetX}, Y: {result.targetY}
            </div>
          </div>
        )}
        
        <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
          <h3 className="text-xs font-medium text-slate-500 mb-1">Target Distance</h3>
          <div className="text-lg font-mono font-medium text-slate-700">
            {result.targetDistance.toFixed(1)} <span className="text-sm">m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
