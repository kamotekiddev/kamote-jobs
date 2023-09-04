import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import client from '@/lib/prismadb';
import { User } from '@prisma/client';

const authOptions: AuthOptions = {
    adapter: PrismaAdapter(client),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials?.email || !credentials?.password)
                        return null;

                    const user = await client.user.findUnique({
                        where: { email: credentials?.email },
                    });

                    if (!user || !user?.hashedPassword) return null;

                    const correctPassword = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword
                    );

                    if (!correctPassword) return null;
                    return user;
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.role = (user as User).role;
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    debug: true,
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: '/sign-in' },
};

export default authOptions;
