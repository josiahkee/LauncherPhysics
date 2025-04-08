import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import AngleSettingSelector from "@/components/ProjectileSelector";
import CustomTargetInput from "@/components/CustomTargetInput";
import SpringProperties from "@/components/SpringProperties";
import ResultDisplay from "@/components/ResultDisplay";
import SavedResults from "@/components/SavedResults";
import TrajectoryVisualization from "@/components/TrajectoryVisualization";
import { CalculateInput, CalculationResult, InsertCalculation, Calculation } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  
  // Basic states
  const [angleSetting, setAngleSetting] = useState<string>("acute");
  
  // Target states
  const [targetX, setTargetX] = useState<number>(100);
  const [targetY, setTargetY] = useState<number>(100);
  
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  
  // Fetch saved calculations
  const { data: savedCalculations = [], refetch: refetchCalculations } = useQuery<Calculation[]>({
    queryKey: ['/api/calculations'],
    select: (data) => data as Calculation[]
  });
  
  // Calculate spring contraction
  const calculateMutation = useMutation({
    mutationFn: async (data: CalculateInput) => {
      const response = await apiRequest('POST', '/api/calculate', data);
      return response.json() as Promise<CalculationResult>;
    },
    onSuccess: (data) => {
      setCalculationResult(data);
    },
    onError: (error) => {
      toast({
        title: "Calculation Error",
        description: error instanceof Error ? error.message : "Failed to calculate",
        variant: "destructive",
      });
    },
  });
  
  // Save calculation
  const saveMutation = useMutation({
    mutationFn: async (data: InsertCalculation) => {
      const response = await apiRequest('POST', '/api/calculations', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Calculation saved successfully",
      });
      refetchCalculations();
    },
    onError: (error) => {
      toast({
        title: "Error Saving",
        description: error instanceof Error ? error.message : "Failed to save calculation",
        variant: "destructive",
      });
    },
  });
  
  const handleCalculate = () => {
    // Set default launch angle based on angle setting
    const defaultLaunchAngle = angleSetting === 'acute' ? 65 : 35;
    
    const input: CalculateInput = {
      angleSetting,
      launchAngle: defaultLaunchAngle,
      customTargetX: targetX,
      customTargetY: targetY
    };
    
    calculateMutation.mutate(input);
  };
  
  const handleSaveCalculation = () => {
    if (!calculationResult) return;
    
    const calculation: InsertCalculation = {
      angleSetting,
      targetType: 'custom',
      targetDistance: calculationResult.targetDistance,
      contractionDistance: calculationResult.contractionDistance,
      launchAngle: angleSetting === 'acute' ? 65 : 35,
      targetX,
      targetY,
      timestamp: Date.now(),
    };
    
    saveMutation.mutate(calculation);
  };
  
  // Use the first result as initial calculation
  if (!calculationResult && !calculateMutation.isPending) {
    handleCalculate();
  }
  
  // Calculate estimated target distance for trajectory visualization
  const distanceX = targetX + 100; // Add 100cm for launcher distance
  const distanceY = Math.abs(targetY - 100); // Distance from center line
  const estimatedTargetDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY) / 100;
  
  // Default launch angle based on setting - for visualization
  const defaultLaunchAngle = angleSetting === 'acute' ? 65 : 35;
  
  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary-700 mb-2">Spring Launch Calculator</h1>
          <p className="text-slate-600">Calculate the spring contraction distance needed to hit targets accurately</p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Launch Parameters</h2>
              
              <AngleSettingSelector 
                angleSetting={angleSetting}
                onChange={setAngleSetting}
              />
              
              <CustomTargetInput 
                visible={true}
                targetX={targetX}
                targetY={targetY}
                onChangeX={setTargetX}
                onChangeY={setTargetY}
              />
              
              <SpringProperties />
              
              <div className="mt-6">
                <button 
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition flex items-center justify-center space-x-2"
                  onClick={handleCalculate}
                  disabled={calculateMutation.isPending}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {calculateMutation.isPending ? 'Calculating...' : 'Calculate Spring Contraction'}
                  </span>
                </button>
              </div>
            </div>
            
            <TrajectoryVisualization 
              targetDistance={estimatedTargetDistance}
              launchAngle={defaultLaunchAngle}
            />
          </div>
          
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              <ResultDisplay 
                result={calculationResult}
                isLoading={calculateMutation.isPending}
              />
              
              <button 
                className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm transition"
                onClick={handleSaveCalculation}
                disabled={!calculationResult || saveMutation.isPending}
              >
                {saveMutation.isPending ? 'Saving...' : 'Save This Calculation'}
              </button>
            </div>
            
            <SavedResults 
              calculations={savedCalculations}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
