'use server';

import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from './getCurrentUser';
import client from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';

const unSaveJob = async (postId?: string) => {
    try {
        const user = await getCurrentUser();
        if (!user?.id) throw new Error('Unauthorized');
        if (!postId) throw new Error('No ID found.');

        let existingBookedMarkedPosts = await client.jobPost.findFirst({
            where: { id: postId, savedByUserIds: { hasSome: [user.id] } },
        });

        const bookedMarkedPost = await client.jobPost.update({
            where: { id: postId },
            data: {
                savedByUserIds:
                    existingBookedMarkedPosts?.savedByUserIds.filter(
                        (userId) => userId !== user.id
                    ),
                savedByUsers: { disconnect: [{ id: user.id }] },
            },
        });

        revalidatePath('/saved');
        return { bookedMarkedPost };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default unSaveJob;
