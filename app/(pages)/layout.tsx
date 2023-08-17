import Link from 'next/link';
import React, { ReactNode } from 'react';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
    return (
        <div>
            <header>
                <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 p-4'>
                    <div>
                        <h1>Kamote Jobs</h1>
                    </div>
                    <nav className='space-x-6'>
                        <Link href='/jobs'>Jobs</Link>
                        <Link href='/jobs'>Create</Link>
                    </nav>
                    <div>Current User</div>
                </div>
            </header>
            {children}
        </div>
    );
};

export default Layout;
