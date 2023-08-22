import * as z from 'zod';

const JobPostSchema = z.object({
    jobTitle: z.string().nonempty(),
    employmentTypeId: z.string().nonempty(),
    workplaceTypeId: z.string().nonempty(),
    companyName: z.string().nonempty(),
    location: z.string().nonempty(),
});

export type JobPostSchemaType = z.infer<typeof JobPostSchema>;

export default JobPostSchema;
