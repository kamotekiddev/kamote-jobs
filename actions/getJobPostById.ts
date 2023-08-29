import getErrorMessage from '@/lib/getErrorMessage';
import client from '@/lib/prismadb';

const getJobPostById = async (id?: string) => {
    try {
        const jobPost = await client.jobPost.findUnique({
            where: { id },
            include: {
                user: true,
                jobApplications: {
                    include: { user: true },
                },
                employmentType: true,
                jobTitle: true,
                savedByUsers: true,
                workplaceType: true,
            },
        });
        return { jobPost };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getJobPostById;
