import { z } from "zod";
import { mongoIdSchema, paginationSchema } from "./common.validator.js";
import { PAYMENT_MODE } from "../constants/enums.js";

export const earningsQuerySchema = paginationSchema.extend({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const earningsMonthlyQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const earningIdParamSchema = z.object({
  id: mongoIdSchema,
});

export const updateEarningSchema = z.object({
  paymentMode: z.enum(Object.values(PAYMENT_MODE)).optional(),
  diagnosis: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  status: z.enum(["RECEIVED", "PENDING", "REFUNDED"]).optional(),
});
