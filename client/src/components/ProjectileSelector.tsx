interface AngleSettingSelectorProps {
  angleSetting: string;
  onChange: (type: string) => void;
}

export default function AngleSettingSelector({ angleSetting, onChange }: AngleSettingSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">Angle Setting</label>
      <div className="flex flex-wrap gap-3">
        <button 
          className={`px-4 py-2 rounded-md ${
            angleSetting === 'acute' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-200 text-slate-700'
          } font-medium text-sm shadow-sm hover:bg-blue-700 transition`}
          onClick={() => onChange('acute')}
        >
          Acute Angle
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${
            angleSetting === 'obtuse' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-200 text-slate-700'
          } font-medium text-sm shadow-sm hover:bg-blue-700 transition`}
          onClick={() => onChange('obtuse')}
        >
          Obtuse Angle
        </button>
      </div>

    </div>
  );
}
