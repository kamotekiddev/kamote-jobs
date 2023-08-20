import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from './getCurrentUser';
import client from '@/lib/prismadb';

const getUserRecruitmentPosts = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.id) throw new Error('Unauthorized');
        const jobposts = await client.jobPost.findMany({
            where: { userId: currentUser.id },
            orderBy: { createdAt: 'desc' },
            include: { roles: true, user: true },
        });
        return { jobposts };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getUserRecruitmentPosts;
