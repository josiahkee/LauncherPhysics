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
            const formats: Record<string, string> = {
              'front': 'Front',
              'frontcorner': 'Front Corner',
              'middleline': 'Middle Line',
              'lastline': 'Last Line',
              'backcorner': 'Back Corner'
            };
            return formats[targetType] || targetType;
          };
          
          return (
            <div key={calculation.id} className="bg-slate-50 p-3 rounded-md border border-slate-200 flex justify-between">
              <div>
                <div className="text-sm font-medium">
                  {calculation.projectileType} - {formatTargetName(calculation.targetType)}
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
