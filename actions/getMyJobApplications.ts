import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from './getCurrentUser';
import client from '@/lib/prismadb';

const getMyJobApplications = async () => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('Unauthorized');

        const jobApplications = await client.jobApplication.findMany({
            where: { userId: user.id },
            include: {
                jobPost: true,
                user: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return { jobApplications };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getMyJobApplications;
