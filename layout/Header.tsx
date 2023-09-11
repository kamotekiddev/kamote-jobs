import Image from 'next/image';

import getCurrentUser from '@/actions/getCurrentUser';
import UserAvatar from '@/components/UserAvatar';
import jobSeekLogo from '@/app/_assets/images/jobseek-logo.png';
import jobSeekLogMobile from '@/app/_assets/images/jobseek-logo-mobile.png';
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
            <div className='mx-auto flex max-w-4xl items-center justify-between gap-10 p-4 lg:gap-40'>
                <div className='flex flex-1 items-center gap-8'>
                    <Image
                        height={30}
                        src={jobSeekLogo}
                        alt='Job Seek Logo'
                        objectFit='cover'
                        className='hidden lg:block'
                    />
                    <h1 className='text-lg font-black lg:hidden'>JS</h1>
                    {isJobSeeker && (
                        <div className='hidden flex-1 lg:block'>
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
