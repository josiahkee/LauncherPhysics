import { Calculation } from "@shared/schema";

interface SavedResultsProps {
  calculations: Calculation[];
}

export default function SavedResults({ calculations }: SavedResultsProps) {
  if (calculations.length === 0) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-slate-800 mb-3">Saved Calculations</h3>
        <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-center text-slate-500">
          No saved calculations yet
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-slate-800 mb-3">Saved Calculations</h3>
      <div className="space-y-3">
        {calculations.map((calculation) => {
          // Format target name for display
          const formatTargetName = (targetType: string) => {
            return targetType.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
          };
          
          // Format the angle setting
          const formatAngleSetting = (setting: string) => {
            return setting === 'acute' ? 'Acute Angle' : 
                   setting === 'obtuse' ? 'Obtuse Angle' : 
                   setting;
          };
          
          // Get position display
          const getPositionDisplay = () => {
            if (calculation.targetX !== undefined && calculation.targetY !== undefined) {
              return `X: ${calculation.targetX}, Y: ${calculation.targetY}`;
            } else {
              return formatTargetName(calculation.targetType);
            }
          };
          
          return (
            <div key={calculation.id} className="bg-slate-50 p-3 rounded-md border border-slate-200 flex justify-between">
              <div>
                <div className="text-sm font-medium">
                  {formatAngleSetting(calculation.angleSetting)} - {getPositionDisplay()}
                </div>
                <div className="text-xs text-slate-500">
                  {calculation.targetDistance.toFixed(1)}m distance
                </div>
              </div>
              <div className="font-mono font-medium text-primary-700">
                {calculation.contractionDistance.toFixed(1)} cm
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
