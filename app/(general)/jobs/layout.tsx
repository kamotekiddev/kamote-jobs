import React, { ReactNode } from 'react';
import CreateJobWidget from './components/CreateJobWidget';
import JobsNavigation from './components/JobsNavigation';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
    return (
        <section className='mx-auto grid max-w-7xl grid-cols-[auto_1fr] p-4'>
            <div className='space-y-4'>
                <JobsNavigation />
                <CreateJobWidget />
            </div>
            {children}
        </section>
    );
};

export default Layout;
