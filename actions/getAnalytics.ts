import getCurrentUser from '@/actions/getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';
import client from '@/lib/prismadb';

const getAnalytics = async () => {
    try {
        const user = await getCurrentUser();

        if (!user) throw new Error('Unauthorized');

        const jobsCount = await client.jobPost.aggregate({
            where: { userId: user.id },
            _count: true,
        });

        const jobsHiringCount = await client.jobPost.aggregate({
            where: { userId: user.id, isHiring: true },
            _count: true,
        });

        const jobsNotHiringCount = await client.jobPost.aggregate({
            where: { userId: user.id, isHiring: false },
            _count: true,
        });

        const jobsApplicationsCount = await client.jobApplication.aggregate({
            where: { jobPost: { userId: user.id } },
            _count: true,
        });

        return {
            jobsCount: jobsCount._count,
            jobsHiringCount: jobsHiringCount._count,
            jobsNotHiringCount: jobsNotHiringCount._count,
            jobsApplicationsCount: jobsApplicationsCount._count,
        };
    } catch (error) {
        return { message: getErrorMessage(error), error };
    }
};

export default getAnalytics;
