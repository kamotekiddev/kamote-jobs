import RoundedLink from '@/components/RoundedLink';
import UserAvatar from '@/components/UserAvatar';

const Header = () => {
    return (
        <header className='sticky top-0 backdrop-blur-md'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 p-4'>
                <h1 className='text-xl font-black'>Kamote Jobs</h1>
                <nav className='flex gap-2 rounded-full bg-gray-100 p-2'>
                    <RoundedLink href='/jobs'>Jobs</RoundedLink>
                    <RoundedLink href='/explore'>Explore</RoundedLink>
                </nav>
                <UserAvatar />
            </div>
        </header>
    );
};

export default Header;
