import * as z from 'zod';

const JobPostSchema = z.object({
    jobTitle: z.string().nonempty(),
    employmentType: z.string().nonempty(),
    workplaceType: z.string().nonempty(),
    companyName: z.string().nonempty(),
    location: z.string().nonempty(),
    aboutJob: z.string().nonempty(),
    responsibilities: z.array(
        z.object({ responsibility: z.string().nonempty() })
    ),
    skillsOrExperiences: z.array(
        z.object({ skillOrExperience: z.string().nonempty() })
    ),
    educations: z.array(z.object({ education: z.string().nonempty() })),
});

export type JobPostSchemaType = z.infer<typeof JobPostSchema>;

export default JobPostSchema;
