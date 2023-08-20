import client from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';

const getWorkplaceTypes = async () => {
    try {
        const user = await getCurrentUser();
        if (!user?.id) throw new Error('Unauthorized');
        const workplaceTypes = await client.workplaceType.findMany();
        return { workplaceTypes };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getWorkplaceTypes;
