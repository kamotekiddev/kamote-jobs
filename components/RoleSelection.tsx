'use client';
import { useSession } from 'next-auth/react';

const RoleSelection = () => {
    const { data: session } = useSession();

    return (
        <section className='p-4'>
            <div className='rounded-lg border bg-white p-4 shadow-sm'>
                <h1>Role Selection</h1>
            </div>
        </section>
    );
};

export default RoleSelection;
