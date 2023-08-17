'use server';

import bcrypt from 'bcrypt';
import client from '@/lib/prismadb';
import { User } from '@prisma/client';
import getErrorMessage from '@/lib/getErrorMessage';

type Params = Omit<
    Pick<User, 'name' | 'email' | 'hashedPassword'>,
    'hashedPassword'
> & { password: string };

const registerUser = async ({ name, email, password }: Params) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const existingUser = await client.user.findFirst({ where: { email } });
        if (existingUser) throw new Error('Email already taken');
        const user = await client.user.create({
            data: { name, email, hashedPassword },
        });
        return { user };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

export default registerUser;
