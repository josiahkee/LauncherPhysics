interface CustomTargetInputProps {
  visible: boolean;
  value: number;
  onChange: (distance: number) => void;
}

export default function CustomTargetInput({ visible, value, onChange }: CustomTargetInputProps) {
  if (!visible) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <label htmlFor="custom-distance" className="block text-sm font-medium text-slate-700 mb-1">
        Custom Target Distance (m)
      </label>
      <input 
        type="number" 
        id="custom-distance" 
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
        placeholder="Enter distance"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min={0.1}
      />
    </div>
  );
}
