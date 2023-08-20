import React, { ReactNode } from 'react';
import CreateJobWidget from './components/CreateJobWidget';
import JobsNavigation from './components/JobsNavigation';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
    return (
        <main className='overflow-hidden'>
            <section className='mx-auto grid h-full max-w-7xl grid-cols-[auto_1fr] gap-4 p-4'>
                <div className='space-y-4'>
                    <JobsNavigation />
                    <CreateJobWidget />
                </div>
                {children}
            </section>
        </main>
    );
};

export default Layout;
