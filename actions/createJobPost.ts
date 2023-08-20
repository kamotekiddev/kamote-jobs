'use server';

import JobPostSchema, { JobPostSchemaType } from '@/schema/JobPostSchema';
import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from './getCurrentUser';
import client from '@/lib/prismadb';

const createJobPost = async (data: JobPostSchemaType) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.id) throw new Error('Unauthorized');

        const validationError = JobPostSchema.safeParse(data);
        if (!validationError.success) throw new Error('Invalid Data');

        let jobTitle = await client.jobTitle.findFirst({
            where: { name: data.jobTitle },
        });

        if (!jobTitle)
            jobTitle = await client.jobTitle.create({
                data: { name: data.jobTitle },
            });

        const newJobPost = await client.jobPost.create({
            data: {
                companyName: data.companyName,
                location: data.location,
                heading: data.heading,
                employmentTypeId: data.employmentTypeId,
                workplaceTypeId: data.workplaceTypeId,
                jobTitleId: jobTitle?.id!,
                userId: currentUser.id,
            },

            include: {
                employmentType: true,
                workplaceType: true,
                jobTitle: true,
                user: true,
                applications: true,
            },
        });
        return { newJobPost };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};
export default createJobPost;
