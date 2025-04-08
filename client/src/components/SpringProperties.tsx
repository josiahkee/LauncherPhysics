interface SpringPropertiesProps {
  launchAngle: number;
  onLaunchAngleChange: (angle: number) => void;
}

export default function SpringProperties({ 
  launchAngle, 
  onLaunchAngleChange 
}: SpringPropertiesProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-slate-800 mb-3">Launch Properties</h3>
      <div>
        <label htmlFor="launch-angle" className="block text-sm font-medium text-slate-700 mb-1">
          Launch Angle Fine Adjustment (degrees)
        </label>
        <div className="flex items-center space-x-4">
          <input 
            type="range" 
            id="launch-angle-slider" 
            className="flex-1 h-2 rounded-lg appearance-none bg-slate-200 cursor-pointer" 
            value={launchAngle}
            onChange={(e) => onLaunchAngleChange(parseFloat(e.target.value))}
            min={0}
            max={90}
            step={1}
          />
          <input 
            type="number" 
            id="launch-angle" 
            className="w-16 px-2 py-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center" 
            value={launchAngle}
            onChange={(e) => onLaunchAngleChange(parseFloat(e.target.value) || 0)}
            min={0}
            max={90}
          />
          <span className="text-sm text-slate-700">°</span>
        </div>
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>0°</span>
          <span>45°</span>
          <span>90°</span>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Note: The primary angle is set by choosing "Acute" or "Obtuse" from the Angle Setting above. 
          This slider allows for fine adjustments to the launch angle.
        </div>
      </div>
    </div>
  );
}
