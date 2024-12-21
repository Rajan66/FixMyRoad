import { number, z } from "zod";

export const reportSchema = z
    .object({
        district: z.string().optional(),
        metropolitanCity: z.string().optional(),
        zipcode: z.string(),
        location: z.string().optional(),
        severity: z.string(),
    })
    .refine(
        (data) =>
            (data.district && data.metropolitanCity && data.zipcode && data.location),
        {
            message:
                "All location fields are required when Location Details is checked",
            path: ["district"],
        }
    );

export type Report = z.infer<typeof reportSchema>;
