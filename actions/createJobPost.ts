'use server';
import { JobPost } from '@prisma/client';
import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from './getCurrentUser';
import client from '@/lib/prismadb';

type Params = Pick<JobPost, 'caption' | 'image'> & { roles: string[] };

const createJobPost = async ({ caption, image, roles }: Params) => {
    try {
        const roleIds: string[] = [];
        const currentUser = await getCurrentUser();
        if (!currentUser?.id) throw new Error('Unauthorized');
        if (!caption || roles.length <= 0) throw new Error('Invalid data');

        roles.forEach(async (currentRole) => {
            let role = await client.jobRole.findFirst({
                where: { role: currentRole },
            });

            if (!role) {
                role = await client?.jobRole.create({
                    data: { role: currentRole },
                });
            }
            roleIds.push(role?.id!);
        });

        const newJobPost = await client.jobPost.create({
            data: { caption, image, roleIds },
        });
        return { newJobPost };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};
export default createJobPost;
