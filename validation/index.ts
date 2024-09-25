import { z } from "zod";

export const createSessionSchema = z.object({
  topic: z.string().min(1, "Session topic is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  initialTime: z
    .number()
    .min(10, "Minimum goal is 10")
    .max(400, "Maximum goal is 400"),
});
