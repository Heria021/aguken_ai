import { z } from "zod";

// Schema for room type and pricing
export const roomTypeSchema = z.object({
  roomType: z.string().min(1, "Room type is required"),
  roomPrice: z.string().min(1, "Room price is required"),
  currency: z.string().default("₹"),
});

export type RoomTypeEntry = z.infer<typeof roomTypeSchema>;
