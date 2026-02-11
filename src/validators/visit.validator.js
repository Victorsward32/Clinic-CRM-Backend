import { z } from "zod";
import { mongoIdSchema } from "./common.validator.js";

const medicineSchema = z.object({
  name: z.string().trim().min(1),
  dosage: z.string().trim().min(1),
  frequency: z.string().trim().min(1),
  duration: z.string().trim().min(1),
  instructions: z.string().trim().optional().default(""),
});

export const startVisitSchema = z.object({
  queueId: mongoIdSchema,
  symptoms: z.string().trim().optional(),
  diagnosis: z.string().trim().optional(),
  followUpDate: z.string().datetime().optional(),
});

export const visitIdParamSchema = z.object({
  id: mongoIdSchema,
});

export const completeVisitSchema = z.object({
  diagnosis: z.string().trim().optional(),
  followUpDate: z.string().datetime().optional(),
  prescription: z.object({
    medicines: z.array(medicineSchema).default([]),
    advice: z.string().trim().optional().default(""),
  }),
  consultationFee: z.number().int().nonnegative().optional(),
  paymentMode: z.enum(["CASH", "UPI", "CARD", "CHEQUE", "BANK_TRANSFER"]).optional(),
});
