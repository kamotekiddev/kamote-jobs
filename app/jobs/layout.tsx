import React, { ReactNode } from 'react';
import CreateJobWidget from './components/CreateJobWidget';
import JobsNavigation from './components/JobsNavigation';
import RootLayout from '@/layout/RootLayout';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
    // TODO check if the user has no role and redirect to role selection if there is no role

    return (
        <RootLayout>
            <main>
                <section className='mx-auto grid h-full max-w-7xl grid-cols-[auto_1fr] items-start gap-4 p-4'>
                    <div className='sticky top-[88px] space-y-4'>
                        <JobsNavigation />
                        <CreateJobWidget />
                    </div>
                    {children}
                </section>
            </main>
        </RootLayout>
    );
};

export default Layout;
