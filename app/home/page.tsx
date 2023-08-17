'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const Home = () => {
    return (
        <main className='p-6'>
            <Button onClick={() => signOut()}>Sign out</Button>
        </main>
    );
};

export default Home;
