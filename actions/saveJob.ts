'use server';

import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from './getCurrentUser';
import client from '@/lib/prismadb';

const saveJob = async (postId?: string) => {
    try {
        const user = await getCurrentUser();
        if (!user?.id) throw new Error('Unauthorized');
        if (!postId) throw new Error('No ID found.');

        const bookedMarkedPost = await client.jobPost.update({
            where: { id: postId },
            data: {
                savedByUserIds: [user.id],
                savedByUsers: { connect: [{ id: user.id }] },
            },
            include: { savedByUsers: true },
        });

        return { bookedMarkedPost };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default saveJob;
