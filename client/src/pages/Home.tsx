import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ProjectileSelector from "@/components/ProjectileSelector";
import TargetSelector from "@/components/TargetSelector";
import CustomProjectileInputs from "@/components/CustomProjectileInputs";
import CustomTargetInput from "@/components/CustomTargetInput";
import SpringProperties from "@/components/SpringProperties";
import ResultDisplay from "@/components/ResultDisplay";
import SavedResults from "@/components/SavedResults";
import TrajectoryVisualization from "@/components/TrajectoryVisualization";
import { CalculateInput, CalculationResult, InsertCalculation } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  
  const [projectileType, setProjectileType] = useState<string>("first-yellow");
  const [targetType, setTargetType] = useState<string>("front");
  const [customDistance, setCustomDistance] = useState<number>(5.0);
  const [springConstant, setSpringConstant] = useState<number>(100);
  const [launchAngle, setLaunchAngle] = useState<number>(45);
  const [projectileWeight, setProjectileWeight] = useState<number>(50);
  const [projectileDiameter, setProjectileDiameter] = useState<number>(30);
  
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  
  // Fetch saved calculations
  const { data: savedCalculations = [], refetch: refetchCalculations } = useQuery({
    queryKey: ['/api/calculations'],
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
    const input: CalculateInput = {
      projectileType,
      targetType,
      springConstant,
      launchAngle,
      ...(projectileType === 'custom' && {
        customDistance,
        projectileWeight,
        projectileDiameter,
      }),
    };
    
    calculateMutation.mutate(input);
  };
  
  const handleSaveCalculation = () => {
    if (!calculationResult) return;
    
    const calculation: InsertCalculation = {
      projectileType,
      targetType,
      targetDistance: calculationResult.targetDistance,
      contractionDistance: calculationResult.contractionDistance,
      springConstant,
      launchAngle,
      ...(projectileType === 'custom' && {
        projectileWeight,
        projectileDiameter,
      }),
      timestamp: Date.now(),
    };
    
    saveMutation.mutate(calculation);
  };
  
  // Use the first result as initial calculation
  if (!calculationResult && projectileType === 'first-yellow') {
    setCalculationResult({
      contractionDistance: 12.0,
      targetDistance: 4.5,
      projectileType: 'First Yellow',
      targetType: 'front'
    });
  }
  
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
              
              <ProjectileSelector 
                projectileType={projectileType}
                onChange={setProjectileType}
              />
              
              <CustomProjectileInputs 
                visible={projectileType === 'custom'}
                projectileWeight={projectileWeight}
                projectileDiameter={projectileDiameter}
                onWeightChange={setProjectileWeight}
                onDiameterChange={setProjectileDiameter}
              />
              
              <TargetSelector 
                projectileType={projectileType}
                targetType={targetType}
                onChange={setTargetType}
              />
              
              <CustomTargetInput 
                visible={projectileType === 'custom'}
                value={customDistance}
                onChange={setCustomDistance}
              />
              
              <SpringProperties 
                springConstant={springConstant}
                launchAngle={launchAngle}
                onSpringConstantChange={setSpringConstant}
                onLaunchAngleChange={setLaunchAngle}
              />
              
              <div className="mt-6">
                <button 
                  className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-md transition flex items-center justify-center space-x-2"
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
          </div>
          
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              <ResultDisplay 
                result={calculationResult}
                isLoading={calculateMutation.isPending}
              />
              
              <SavedResults 
                calculations={savedCalculations}
              />
              
              <button 
                className="mt-4 w-full py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-md shadow-sm transition"
                onClick={handleSaveCalculation}
                disabled={!calculationResult || saveMutation.isPending}
              >
                {saveMutation.isPending ? 'Saving...' : 'Save This Calculation'}
              </button>
            </div>
            
            <TrajectoryVisualization 
              targetDistance={calculationResult?.targetDistance || 0}
              launchAngle={launchAngle}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
