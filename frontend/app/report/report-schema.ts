import { number, z } from "zod";

export const reportSchema = z
  .object({
    locationDetails: z.boolean(),
    district: z.string().optional(),
    metropolitanCity: z.string().optional(),
    zipcode: z.string(),
    location: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.locationDetails ||
      (data.district && data.metropolitanCity && data.zipcode && data.location),
    {
      message:
        "All location fields are required when Location Details is checked",
      path: ["district"],
    }
  );

export type Report = z.infer<typeof reportSchema>;
