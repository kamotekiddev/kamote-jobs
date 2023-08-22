import client from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';

const getSavedJobPosts = async () => {
    try {
        const user = await getCurrentUser();
        if (!user?.id) throw new Error('Unauthorized');

        const savedPosts = await client.jobPost.findMany({
            where: { savedByUserIds: { hasSome: [user.id] } },
            orderBy: { createdAt: 'desc' },
            include: {
                applications: true,
                user: true,
                employmentType: true,
                jobTitle: true,
                savedByUsers: true,
                workplaceType: true,
            },
        });

        return { savedPosts };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getSavedJobPosts;
