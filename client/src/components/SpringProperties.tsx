interface SpringPropertiesProps {
  springConstant: number;
  launchAngle: number;
  onSpringConstantChange: (constant: number) => void;
  onLaunchAngleChange: (angle: number) => void;
}

export default function SpringProperties({ 
  springConstant, 
  launchAngle, 
  onSpringConstantChange, 
  onLaunchAngleChange 
}: SpringPropertiesProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-slate-800 mb-3">Spring Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="spring-constant" className="block text-sm font-medium text-slate-700 mb-1">
            Spring Constant (N/m)
          </label>
          <input 
            type="number" 
            id="spring-constant" 
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
            placeholder="Enter spring constant"
            value={springConstant}
            onChange={(e) => onSpringConstantChange(parseFloat(e.target.value) || 0)}
            min={1}
          />
        </div>
        <div>
          <label htmlFor="launch-angle" className="block text-sm font-medium text-slate-700 mb-1">
            Launch Angle (degrees)
          </label>
          <input 
            type="number" 
            id="launch-angle" 
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
            placeholder="Enter launch angle"
            value={launchAngle}
            onChange={(e) => onLaunchAngleChange(parseFloat(e.target.value) || 0)}
            min={0}
            max={90}
          />
        </div>
      </div>
    </div>
  );
}
