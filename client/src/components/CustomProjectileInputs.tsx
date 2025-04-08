interface CustomProjectileInputsProps {
  visible: boolean;
  projectileWeight: number;
  projectileDiameter: number;
  onWeightChange: (weight: number) => void;
  onDiameterChange: (diameter: number) => void;
}

export default function CustomProjectileInputs({ 
  visible, 
  projectileWeight, 
  projectileDiameter,
  onWeightChange,
  onDiameterChange
}: CustomProjectileInputsProps) {
  if (!visible) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="projectile-weight" className="block text-sm font-medium text-slate-700 mb-1">
            Weight (g)
          </label>
          <input 
            type="number" 
            id="projectile-weight" 
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
            placeholder="Enter weight"
            value={projectileWeight}
            onChange={(e) => onWeightChange(parseFloat(e.target.value) || 0)}
            min={1}
          />
        </div>
        <div>
          <label htmlFor="projectile-diameter" className="block text-sm font-medium text-slate-700 mb-1">
            Diameter (mm)
          </label>
          <input 
            type="number" 
            id="projectile-diameter" 
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
            placeholder="Enter diameter"
            value={projectileDiameter}
            onChange={(e) => onDiameterChange(parseFloat(e.target.value) || 0)}
            min={1}
          />
        </div>
      </div>
    </div>
  );
}
