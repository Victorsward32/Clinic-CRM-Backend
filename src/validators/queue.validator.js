import { z } from "zod";
import { QUEUE_PRIORITY, QUEUE_STATUS } from "../constants/enums.js";
import { mongoIdSchema } from "./common.validator.js";

const queuePriorityValues = Object.values(QUEUE_PRIORITY);
const queueStatusValues = Object.values(QUEUE_STATUS);

export const addToQueueSchema = z.object({
  patientId: mongoIdSchema,
  priority: z.enum(queuePriorityValues).optional().default(QUEUE_PRIORITY.NORMAL),
});

export const queueIdParamSchema = z.object({
  id: mongoIdSchema,
});

export const queueStatusUpdateSchema = z.object({
  status: z.enum(queueStatusValues),
});
