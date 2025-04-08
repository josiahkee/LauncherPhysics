export interface TrajectoryPoint {
  x: number;
  y: number;
}

/**
 * Calculate trajectory points for a projectile
 * 
 * @param distance - Target distance in meters
 * @param angle - Launch angle in degrees
 * @param springConstant - Spring constant in N/m
 * @param mass - Mass of projectile in grams
 * @returns Array of points representing the trajectory
 */
export function calculateTrajectory(
  distance: number,
  angle: number,
  springConstant: number,
  mass: number = 50
): TrajectoryPoint[] {
  // Convert angle to radians
  const angleRad = angle * (Math.PI / 180);
  
  // Gravitational acceleration in m/s²
  const g = 9.81;
  
  // Calculate required initial velocity to reach target
  // Using the range formula: R = (v₀² * sin(2θ)) / g
  // Solving for v₀: v₀ = sqrt((R*g) / sin(2θ))
  let v0: number;
  
  // Handle edge cases
  if (angle === 0 || angle === 90) {
    // These angles cannot reach a horizontal distance
    v0 = 10; // Default reasonable value
  } else {
    v0 = Math.sqrt((distance * g) / Math.sin(2 * angleRad));
  }
  
  // Calculate time of flight
  // t = (2 * v₀ * sin(θ)) / g
  const timeOfFlight = (2 * v0 * Math.sin(angleRad)) / g;
  
  // Generate points along the trajectory
  const points: TrajectoryPoint[] = [];
  const numPoints = 50;
  
  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * timeOfFlight;
    
    // x = v₀ * cos(θ) * t
    const x = v0 * Math.cos(angleRad) * t;
    
    // y = v₀ * sin(θ) * t - 0.5 * g * t²
    const y = v0 * Math.sin(angleRad) * t - 0.5 * g * t * t;
    
    points.push({ x, y });
  }
  
  return points;
}

/**
 * Calculate spring contraction distance for a projectile
 * 
 * @param distance - Target distance in meters
 * @param angle - Launch angle in degrees
 * @param springConstant - Spring constant in N/m
 * @param mass - Mass of projectile in grams
 * @returns Spring contraction distance in centimeters
 */
export function calculateSpringContraction(
  distance: number,
  angle: number,
  springConstant: number,
  mass: number = 50
): number {
  // Convert mass from g to kg
  const massKg = mass / 1000;
  
  // Convert angle to radians
  const angleRad = angle * (Math.PI / 180);
  
  // Gravitational acceleration in m/s²
  const g = 9.81;
  
  // Calculate the required initial velocity using the range formula
  // R = (v₀² * sin(2θ)) / g
  // Solving for v₀: v₀ = sqrt((R*g) / sin(2θ))
  
  let v0: number;
  if (Math.sin(2 * angleRad) === 0) {
    // Handle edge case where angle is 0 or 90 degrees
    v0 = Math.sqrt(distance * g); // Approximate
  } else {
    v0 = Math.sqrt((distance * g) / Math.sin(2 * angleRad));
  }
  
  // Calculate the energy needed: E = 0.5 * m * v₀²
  const energy = 0.5 * massKg * v0 * v0;
  
  // Spring potential energy: E = 0.5 * k * x²
  // Solving for x: x = sqrt(2 * E / k)
  const springDisplacement = Math.sqrt(2 * energy / springConstant);
  
  // Convert to centimeters for display
  return springDisplacement * 100;
}
