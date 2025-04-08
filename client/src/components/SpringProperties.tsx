export default function SpringProperties() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-slate-800 mb-3">Launcher Details</h3>
      <div className="bg-slate-100 p-4 rounded-md border border-slate-200">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="text-sm font-medium text-slate-700">Spring Launcher Information</div>
        </div>
        <div className="text-sm text-slate-600 pl-11">
          <p>• The launcher is positioned 100cm away from the target area</p>
          <p>• Launch angle is fixed based on your selected angle setting (Acute/Obtuse)</p>
          <p>• The target area is a 200x200 cm quadrant grid</p>
        </div>
      </div>
    </div>
  );
}
