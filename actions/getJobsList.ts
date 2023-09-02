import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from './getCurrentUser';
import client from '@/lib/prismadb';

const getJobList = async () => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('Unauthorized');

        const jobPosts = await client.jobPost.findMany({
            where: { NOT: { userId: user.id }, isHiring: true },
            include: {
                user: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return { jobPosts };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getJobList;
