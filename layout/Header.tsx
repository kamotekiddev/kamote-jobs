import Image from 'next/image';
import { Button, ButtonProps } from '@/components/ui/button';
import getCurrentUser from '@/actions/getCurrentUser';
import UserAvatar from '@/components/UserAvatar';
import jobSeekLogo from '@/app/_assets/images/jobseek-logo.png';

const RoleVariantMap: Record<string, ButtonProps['variant']> = {
    recruiter: 'outline',
    jobseeker: 'default',
};

const Header = async () => {
    const user = await getCurrentUser();

    return (
        <header className='sticky top-0 z-50 bg-white shadow-sm'>
            <div className='mx-auto flex max-w-4xl items-center justify-between gap-4 p-4'>
                <Image
                    height={30}
                    src={jobSeekLogo}
                    alt='Job Seek Logo'
                    objectFit='cover'
                />
                <div className='flex items-center gap-2'>
                    <Button
                        variant={RoleVariantMap[user?.role!]}
                        className='pointer-events-none rounded-full capitalize'
                    >
                        {user?.role}
                    </Button>
                    <UserAvatar user={user!} />
                </div>
            </div>
        </header>
    );
};

export default Header;
