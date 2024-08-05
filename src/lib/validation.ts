import {z} from "zod"

export const JobValidationSchema = z.object({
    jobtype: z.string().optional(),
    jobcategory: z.string().optional(),
    Salary: z.number().optional(),
    experience: z.number().optional()
})

export type JobFilterType = z.infer<typeof JobValidationSchema>;