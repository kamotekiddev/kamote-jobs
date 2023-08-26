import * as z from 'zod';

const JobApplicationSchema = z.object({
    caption: z.string().optional(),
    resumeLink: z.string().optional(),
    contactNo: z.string().nonempty(),
    email: z.string().nonempty(),
});

export type JobApplicationSchemaType = z.infer<typeof JobApplicationSchema>;
export default JobApplicationSchema;
