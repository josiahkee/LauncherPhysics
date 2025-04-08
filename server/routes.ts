import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculateInputSchema, insertCalculationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all saved calculations
  app.get("/api/calculations", async (req, res) => {
    try {
      const calculations = await storage.getCalculations();
      res.json(calculations);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve calculations" });
    }
  });

  // Save a calculation
  app.post("/api/calculations", async (req, res) => {
    try {
      const calculation = insertCalculationSchema.parse(req.body);
      const savedCalculation = await storage.saveCalculation(calculation);
      res.status(201).json(savedCalculation);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to save calculation" });
      }
    }
  });

  // Calculate spring contraction distance
  app.post("/api/calculate", (req, res) => {
    try {
      const input = calculateInputSchema.parse(req.body);
      
      // Pre-defined target configurations and contraction distances based on user's requirements
      const contractionDistances: Record<string, Record<string, number>> = {
        'acute': {
          'start-line': 12.0,
          'front-left-corner': 13.0,
          'mid-line': 14.0,
          'far-side': 15.0
        },
        'obtuse': {
          'front-line': 9.5,
          'back-line': 15.0,
          'center': 14.0,
          'side': 15.0
        }
      };

      // Approximate coordinates for each target type in cm (on a 200x200 grid)
      const targetCoordinates: Record<string, Record<string, [number, number]>> = {
        'acute': {
          'start-line': [0, 100],         // Front-center
          'front-left-corner': [0, 0],    // Front-left corner
          'mid-line': [100, 100],         // Middle of grid
          'far-side': [100, 0]            // Mid-point on the left side
        },
        'obtuse': {
          'front-line': [0, 100],         // Front-center
          'back-line': [200, 100],        // Back-center
          'center': [100, 100],           // Center of grid
          'side': [100, 0]                // Mid-point on the left side
        }
      };

      let contractionDistance: number;
      let targetDistance: number;
      let targetType = input.targetType || '';
      let targetX: number | undefined;
      let targetY: number | undefined;

      if (input.customTargetX !== undefined && input.customTargetY !== undefined) {
        // Calculate distance from launcher to the target point
        // Launcher is 100cm away from the quadrant
        const distanceX = input.customTargetX + 100; // Add 100cm for launcher distance
        const distanceY = Math.abs(input.customTargetY - 100); // Distance from center line
        
        // Get the Euclidean distance and convert to meters
        const euclideanDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY) / 100;
        
        targetX = input.customTargetX;
        targetY = input.customTargetY;
        targetDistance = euclideanDistance;
        
        // Calculate contraction based on angle setting and position
        if (input.angleSetting === 'acute') {
          // For acute angle setting:
          // Base: 12cm for 0 distance
          // +1cm per 100cm of X distance
          // +0.5cm if at a side position
          
          contractionDistance = 12.0; // Base contraction
          
          if (distanceX > 0) {
            // Add 1cm for each 100cm in X direction (depth)
            contractionDistance += (distanceX / 100) * 1.0;
          }
          
          // If closer to edges, add additional contraction
          if (distanceY < 50 || distanceY > 150) {
            contractionDistance += 0.5;
          }
          
          // Cap at max distance
          contractionDistance = Math.min(contractionDistance, 15.0);
        } else {
          // For obtuse angle setting:
          // Base: 9.5cm for front position
          // +5.5cm for full 200cm in X direction
          // +1cm if at a side position
          
          contractionDistance = 9.5; // Base contraction
          
          if (distanceX > 0) {
            // Linear scale between 9.5 and 15cm based on X distance
            const depthFactor = distanceX / 200;
            contractionDistance += depthFactor * 5.5;
          }
          
          // If closer to sides, add additional contraction
          if (distanceY < 50 || distanceY > 150) {
            contractionDistance += 1.0;
          }
        }
        
        // Round to 1 decimal place
        contractionDistance = Math.round(contractionDistance * 10) / 10;
      } else {
        // Use predefined values when not using coordinates
        contractionDistance = contractionDistances[input.angleSetting]?.[targetType] || 0;
        
        // Set target coordinates if available
        const coordinates = targetCoordinates[input.angleSetting]?.[targetType];
        if (coordinates) {
          [targetX, targetY] = coordinates;
          
          // Calculate distance for display purposes
          const distanceX = targetX + 100; // Add 100cm for launcher distance
          const distanceY = Math.abs(targetY - 100); // Distance from center line
          targetDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY) / 100; // Convert to meters
        } else {
          targetDistance = 0;
        }
      }

      res.json({
        contractionDistance,
        targetDistance,
        angleSetting: input.angleSetting,
        targetType,
        targetX,
        targetY
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Calculation failed" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
