'use server';
import { JobPost } from '@prisma/client';
import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from './getCurrentUser';
import client from '@/lib/prismadb';

type Params = Pick<JobPost, 'caption' | 'image' | 'title'> & {
    roles: string[];
};

const createJobPost = async ({ caption, image, roles, title }: Params) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.id) throw new Error('Unauthorized');
        if (!caption || roles.length <= 0 || !title)
            throw new Error('Invalid data');

        const promises = roles.map(async (currentRole) => {
            let role = await client.jobRole.findFirst({
                where: { role: currentRole },
            });

            if (!role) {
                role = await client?.jobRole.create({
                    data: { role: currentRole },
                });
            }
            return role.id;
        });

        const roleIds = await Promise.all(promises);

        const newJobPost = await client.jobPost.create({
            data: {
                caption,
                image,
                roleIds,
                title,
                userId: currentUser.id,
                roles: {
                    connect: [...roleIds.map((rolId) => ({ id: rolId }))],
                },
            },

            include: { roles: true },
        });
        return { newJobPost };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};
export default createJobPost;
