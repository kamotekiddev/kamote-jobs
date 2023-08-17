import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import client from '@/lib/prismadb';

const getCurrentUser = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return null;

        const currentUser = await client.user.findUnique({
            where: { email: session.user.email },
        });
        if (!currentUser) return null;
        return currentUser;
    } catch (error) {
        return null;
    }
};

export default getCurrentUser;
