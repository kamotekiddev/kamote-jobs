import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from './getCurrentUser';
import client from '@/lib/prismadb';

const getMyJobList = async () => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('Unauthorized');

        const jobList = await client.jobPost.findMany({
            where: { userId: user.id },
            include: {
                user: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return { jobList };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getMyJobList;
