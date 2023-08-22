import client from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';

const getJobRecruitments = async () => {
    try {
        const user = await getCurrentUser();
        if (!user?.id) throw new Error('Unauthorized');

        const jobRecruitments = await client.jobPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                applications: true,
                employmentType: true,
                jobTitle: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        image: true,
                        name: true,
                        updatedAt: true,
                        createdAt: true,
                        emailVerified: true,
                    },
                },
                workplaceType: true,
            },
        });
        return { jobRecruitments };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getJobRecruitments;
