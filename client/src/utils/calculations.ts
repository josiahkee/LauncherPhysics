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
  mass: number
): TrajectoryPoint[] {
  // Convert angle to radians
  const angleRad = (angle * Math.PI) / 180;
  
  // Constants
  const g = 9.81; // gravity in m/s^2
  const massKg = mass / 1000; // convert from grams to kg
  
  // Calculate initial velocity from spring contraction
  // This is just an approximation for visualization
  const initialVelocity = 5; // in m/s
  
  // Calculate initial velocity components
  const vx = initialVelocity * Math.cos(angleRad);
  const vy = initialVelocity * Math.sin(angleRad);
  
  // Calculate time of flight
  const timeOfFlight = (2 * vy) / g;
  
  // Generate trajectory points
  const points: TrajectoryPoint[] = [];
  const numPoints = 50;
  
  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * timeOfFlight;
    const x = vx * t;
    const y = vy * t - 0.5 * g * t * t;
    
    // Only add points with positive y values
    if (y >= 0) {
      points.push({ x, y });
    }
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
  mass: number
): number {
  // This is a placeholder function that would normally 
  // perform physics calculations based on the input parameters.
  // Since our app uses predefined experimental values, this function 
  // is included only for reference but is not used.
  
  // A simplified formula for demonstration purposes:
  return 10 + (distance * 2.5);
}