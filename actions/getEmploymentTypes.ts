import client from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';

const getEmploymentTypes = async () => {
    try {
        const user = await getCurrentUser();
        if (!user?.id) throw new Error('Unauthorized');
        const employmentTypes = await client.employmentType.findMany();
        return { employmentTypes };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default getEmploymentTypes;
