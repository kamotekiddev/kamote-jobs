import Link from 'next/link';
import Image from 'next/image';

import getCurrentUser from '@/actions/getCurrentUser';
import UserAvatar from '@/components/UserAvatar';
import jobSeekLogo from '@/app/_assets/images/jobseek-logo.png';
import SearchBox from '@/components/SearchBox';
import JobSeekerNavigation from './JobSeekerNavigation';
import RecruitersNavigation from './RecruitersNavigation';

const UserNavigationMap: Record<string, any> = {
    jobseeker: JobSeekerNavigation,
    recruiter: RecruitersNavigation,
};

const Header = async () => {
    const user = await getCurrentUser();
    const UserNavigation = UserNavigationMap[user?.role!];
    const isJobSeeker = user?.role === 'jobseeker';

    return (
        <header className='sticky top-0 z-50 bg-white shadow-sm'>
            <div className='mx-auto flex max-w-4xl items-center justify-between gap-40 p-4'>
                <div className='flex flex-1 items-center gap-8'>
                    <Image
                        height={30}
                        src={jobSeekLogo}
                        alt='Job Seek Logo'
                        objectFit='cover'
                    />
                    {isJobSeeker && (
                        <div className='flex-1'>
                            <SearchBox />
                        </div>
                    )}
                </div>
                <div className='flex items-center gap-4'>
                    <UserNavigation />
                    <UserAvatar user={user!} />
                </div>
            </div>
        </header>
    );
};

export default Header;
