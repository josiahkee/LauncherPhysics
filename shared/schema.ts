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
  angleSetting: text("angle_setting").notNull(),
  targetType: text("target_type").notNull(),
  targetDistance: doublePrecision("target_distance").notNull(),
  targetX: doublePrecision("target_x"),
  targetY: doublePrecision("target_y"),
  contractionDistance: doublePrecision("contraction_distance").notNull(),
  launchAngle: doublePrecision("launch_angle").notNull(),
  timestamp: doublePrecision("timestamp").notNull(),
});

export const insertCalculationSchema = createInsertSchema(calculations).omit({
  id: true,
});

export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type Calculation = typeof calculations.$inferSelect;

// Input schema for calculating spring contraction
export const calculateInputSchema = z.object({
  angleSetting: z.string(),
  customTargetX: z.number().min(0).max(200),
  customTargetY: z.number().min(0).max(200),
  launchAngle: z.number().min(0).max(90),
});

export type CalculateInput = z.infer<typeof calculateInputSchema>;

// Output schema for calculation result
export const calculationResultSchema = z.object({
  contractionDistance: z.number(),
  targetDistance: z.number(),
  angleSetting: z.string(),
  targetType: z.string(),
  targetX: z.number(),
  targetY: z.number(),
});

export type CalculationResult = z.infer<typeof calculationResultSchema>;
