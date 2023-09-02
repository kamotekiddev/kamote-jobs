import * as z from 'zod';

const JobPostSchema = z.object({
    jobTitle: z.string().nonempty(),
    employmentType: z.string().nonempty(),
    workplaceType: z.string().nonempty(),
    companyName: z.string().nonempty(),
    location: z.string().nonempty(),
});

export type JobPostSchemaType = z.infer<typeof JobPostSchema>;

export default JobPostSchema;
