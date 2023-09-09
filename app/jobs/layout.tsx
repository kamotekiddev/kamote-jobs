import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';
import RootLayout from '@/layout/RootLayout';
import getCurrentUser from '@/actions/getCurrentUser';

type Props = { children: ReactNode };

const Layout = async ({ children }: Props) => {
    const user = await getCurrentUser();

    if (!user) redirect('/sign-in');
    if (user && !user.role) redirect('/role-selection');

    return (
        <RootLayout>
            <main className='mx-auto grid h-full w-full max-w-4xl items-start gap-4 p-4'>
                {children}
            </main>
        </RootLayout>
    );
};

export default Layout;
