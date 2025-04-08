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
      
      // Predefined target distances
      const targetDistances: Record<string, Record<string, number>> = {
        'first-yellow': {
          'front': 12.0,
          'frontcorner': 13.0
        },
        'second-yellow': {
          'middleline': 9.5,
          'lastline': 15.0,
          'backcorner': 15.5
        }
      };

      // Predefined distances mapping
      const distanceMapping: Record<string, Record<string, number>> = {
        'first-yellow': {
          'front': 4.5,
          'frontcorner': 5.2
        },
        'second-yellow': {
          'middleline': 3.2,
          'lastline': 5.8,
          'backcorner': 6.0
        }
      };

      let contractionDistance: number;
      let targetDistance: number;
      let targetType = input.targetType || '';

      if (input.projectileType === 'custom' && input.customDistance !== undefined) {
        // Custom calculation formula based on physics principles
        // For custom projectiles, we use a simplified model based on the provided inputs
        const mass = input.projectileWeight || 50; // in grams
        const springConstant = input.springConstant; // N/m
        const angle = input.launchAngle * (Math.PI / 180); // convert to radians
        const g = 9.81; // gravity in m/s^2

        // Simplified calculation (this would be more complex in a real physics simulation)
        targetDistance = input.customDistance;
        
        // Using the projectile motion formula and Hooke's law (F = kx)
        // v² = springConstant * x² / mass
        // Range = (v² * sin(2θ)) / g
        // Solving for x (spring contraction)
        contractionDistance = Math.sqrt((mass * g * targetDistance) / 
                                       (springConstant * Math.sin(2 * angle))) * 100; // convert to cm
        
        // Round to 1 decimal place
        contractionDistance = Math.round(contractionDistance * 10) / 10;
      } else {
        // Use predefined values for known projectiles
        contractionDistance = targetDistances[input.projectileType]?.[targetType] || 0;
        targetDistance = distanceMapping[input.projectileType]?.[targetType] || 0;
      }

      const projectileTypeDisplay = 
        input.projectileType === 'first-yellow' ? 'First Yellow' :
        input.projectileType === 'second-yellow' ? 'Second Yellow' : 
        'Custom';

      res.json({
        contractionDistance,
        targetDistance,
        projectileType: projectileTypeDisplay,
        targetType
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
