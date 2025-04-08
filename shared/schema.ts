import { pgTable, text, serial, integer, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (kept for reference from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Saved calculations table
export const calculations = pgTable("calculations", {
  id: serial("id").primaryKey(),
  projectileType: text("projectile_type").notNull(),
  targetType: text("target_type").notNull(),
  targetDistance: doublePrecision("target_distance").notNull(),
  contractionDistance: doublePrecision("contraction_distance").notNull(),
  springConstant: doublePrecision("spring_constant").notNull(),
  launchAngle: doublePrecision("launch_angle").notNull(),
  projectileWeight: doublePrecision("projectile_weight"),
  projectileDiameter: doublePrecision("projectile_diameter"),
  timestamp: doublePrecision("timestamp").notNull(),
});

export const insertCalculationSchema = createInsertSchema(calculations).omit({
  id: true,
});

export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type Calculation = typeof calculations.$inferSelect;

// Input schema for calculating spring contraction
export const calculateInputSchema = z.object({
  projectileType: z.string(),
  targetType: z.string().optional(),
  customDistance: z.number().optional(),
  springConstant: z.number().positive(),
  launchAngle: z.number().min(0).max(90),
  projectileWeight: z.number().positive().optional(),
  projectileDiameter: z.number().positive().optional(),
});

export type CalculateInput = z.infer<typeof calculateInputSchema>;

// Output schema for calculation result
export const calculationResultSchema = z.object({
  contractionDistance: z.number(),
  targetDistance: z.number(),
  projectileType: z.string(),
  targetType: z.string().optional(),
});

export type CalculationResult = z.infer<typeof calculationResultSchema>;
