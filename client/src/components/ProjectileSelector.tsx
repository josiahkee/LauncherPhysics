interface ProjectileSelectorProps {
  projectileType: string;
  onChange: (type: string) => void;
}

export default function ProjectileSelector({ projectileType, onChange }: ProjectileSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">Projectile Type</label>
      <div className="flex flex-wrap gap-3">
        <button 
          className={`px-4 py-2 rounded-md ${
            projectileType === 'first-yellow' 
              ? 'bg-amber-400 text-white' 
              : 'bg-slate-200 text-slate-700'
          } font-medium text-sm shadow-sm hover:bg-amber-500 transition`}
          onClick={() => onChange('first-yellow')}
        >
          First Yellow
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${
            projectileType === 'second-yellow' 
              ? 'bg-amber-400 text-white' 
              : 'bg-slate-200 text-slate-700'
          } font-medium text-sm shadow-sm hover:bg-amber-500 transition`}
          onClick={() => onChange('second-yellow')}
        >
          Second Yellow
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${
            projectileType === 'custom' 
              ? 'bg-amber-400 text-white' 
              : 'bg-slate-200 text-slate-700'
          } font-medium text-sm shadow-sm hover:bg-amber-500 transition`}
          onClick={() => onChange('custom')}
        >
          Custom
        </button>
      </div>
    </div>
  );
}
