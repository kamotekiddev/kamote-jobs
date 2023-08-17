import UserAvatar from '@/components/UserAvatar';
import Link from 'next/link';

const Header = () => {
    return (
        <header>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 p-4'>
                <h1>Kamote Jobs</h1>
                <nav className='flex gap-5'>
                    <Link href='/jobs'>Jobs</Link>
                    <Link href='/jobs'>Explore</Link>
                </nav>
                <UserAvatar />
            </div>
        </header>
    );
};

export default Header;
