import { z } from "zod";
import { mongoIdSchema } from "./common.validator.js";

export const createPatientSchema = z.object({
  name: z.string().trim().min(2),
  age: z.number().int().min(0).max(130),
  weight: z.number().nonnegative().optional(),
  height: z.number().nonnegative().optional(),
  address: z.string().trim().max(500).optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  phoneNumber: z.string().trim().min(7).max(20),
  email: z.string().email().optional(),
});

export const patientIdParamSchema = z.object({
  id: mongoIdSchema,
});

export const patientSearchQuerySchema = z.object({
  search: z.string().trim().optional(),
});
