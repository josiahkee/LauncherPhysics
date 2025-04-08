interface TargetSelectorProps {
  angleSetting: string;
  targetType: string;
  onChange: (target: string) => void;
  onCustomTarget: (useCustom: boolean) => void;
  useCustomTarget: boolean;
}

export default function TargetSelector({ 
  angleSetting, 
  targetType, 
  onChange, 
  onCustomTarget, 
  useCustomTarget 
}: TargetSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-slate-700">Target Location</label>
        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-700">Custom Target</label>
          <input 
            type="checkbox" 
            checked={useCustomTarget} 
            onChange={(e) => onCustomTarget(e.target.checked)}
            className="rounded text-primary-600 focus:ring-primary-500"
          />
        </div>
      </div>
      
      {!useCustomTarget && (
        <>
          {angleSetting === 'acute' && (
            <div className="flex flex-wrap gap-3">
              <button 
                className={`px-4 py-2 rounded-md ${
                  targetType === 'start-line' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-200 text-slate-700'
                } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
                onClick={() => onChange('start-line')}
              >
                Start Line
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${
                  targetType === 'front-left-corner' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-200 text-slate-700'
                } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
                onClick={() => onChange('front-left-corner')}
              >
                Front Left Corner
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${
                  targetType === 'mid-line' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-200 text-slate-700'
                } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
                onClick={() => onChange('mid-line')}
              >
                Mid Line
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${
                  targetType === 'far-side' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-200 text-slate-700'
                } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
                onClick={() => onChange('far-side')}
              >
                Far Side
              </button>
            </div>
          )}
          
          {angleSetting === 'obtuse' && (
            <div className="flex flex-wrap gap-3">
              <button 
                className={`px-4 py-2 rounded-md ${
                  targetType === 'front-line' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-200 text-slate-700'
                } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
                onClick={() => onChange('front-line')}
              >
                Front Line
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${
                  targetType === 'back-line' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-200 text-slate-700'
                } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
                onClick={() => onChange('back-line')}
              >
                Back Line
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${
                  targetType === 'center' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-200 text-slate-700'
                } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
                onClick={() => onChange('center')}
              >
                Center
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${
                  targetType === 'side' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-200 text-slate-700'
                } font-medium text-sm shadow-sm hover:bg-primary-700 transition`}
                onClick={() => onChange('side')}
              >
                Side
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
