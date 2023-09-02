import getErrorMessage from '@/lib/getErrorMessage';
import client from '@/lib/prismadb';

const getJobListById = async (id?: string) => {
    try {
        const jobPost = await client.jobPost.findUnique({
            where: { id },
            include: {
                user: true,
                jobApplications: {
                    include: {
                        user: true,
                        jobPost: true,
                    },
                },
                savedByUsers: true,
            },
        });
        return { jobPost };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getJobListById;
