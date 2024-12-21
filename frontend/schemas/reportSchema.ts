import { z } from "zod";

export const ReportSchema = z.object({
  //<------- Required Fields ------->
  area: z
    .string({ required_error: "Area Name is required" })
    .min(1, { message: "Area Name is required" }),
  severity: z
    .string({ required_error: "Severity is required" })
    .min(1, { message: "Severity is required" }),
  //<------- Optional Fields ------->
  image: z.string().optional(),
  description: z.string().optional(),
});

export type TReport = z.infer<typeof ReportSchema>;
