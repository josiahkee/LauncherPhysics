interface TargetSelectorProps {
  projectileType: string;
  targetType: string;
  onChange: (target: string) => void;
}

export default function TargetSelector({ projectileType, targetType, onChange }: TargetSelectorProps) {
  if (projectileType === 'custom') {
    return null;
  }
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">Target Location</label>
      
      {projectileType === 'first-yellow' && (
        <div className="flex flex-wrap gap-3">
          <button 
            className={`px-4 py-2 rounded-md ${
              targetType === 'front' 
                ? 'bg-primary-600 text-white' 
                : 'bg-slate-200 text-slate-700'
            } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
            onClick={() => onChange('front')}
          >
            Front
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${
              targetType === 'frontcorner' 
                ? 'bg-primary-600 text-white' 
                : 'bg-slate-200 text-slate-700'
            } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
            onClick={() => onChange('frontcorner')}
          >
            Front Corner
          </button>
        </div>
      )}
      
      {projectileType === 'second-yellow' && (
        <div className="flex flex-wrap gap-3">
          <button 
            className={`px-4 py-2 rounded-md ${
              targetType === 'middleline' 
                ? 'bg-primary-600 text-white' 
                : 'bg-slate-200 text-slate-700'
            } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
            onClick={() => onChange('middleline')}
          >
            Middle Line
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${
              targetType === 'lastline' 
                ? 'bg-primary-600 text-white' 
                : 'bg-slate-200 text-slate-700'
            } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
            onClick={() => onChange('lastline')}
          >
            Last Line
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${
              targetType === 'backcorner' 
                ? 'bg-primary-600 text-white' 
                : 'bg-slate-200 text-slate-700'
            } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
            onClick={() => onChange('backcorner')}
          >
            Back Corner
          </button>
        </div>
      )}
    </div>
  );
}
