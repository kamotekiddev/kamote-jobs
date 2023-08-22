import UserAvatar from '@/components/UserAvatar';

const Header = () => {
    return (
        <header className='sticky top-0 bg-white'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 p-4'>
                <h1 className='text-xl font-black'>Kamote Jobs</h1>
                <UserAvatar />
            </div>
        </header>
    );
};

export default Header;
