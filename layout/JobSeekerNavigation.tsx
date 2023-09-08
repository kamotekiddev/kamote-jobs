import { Bookmark, File } from 'lucide-react';
import NavigationLink from './NavigationLink';

const JobSeekerNavigation = () => {
    return (
        <ul className='flex gap-2'>
            <li>
                <NavigationLink
                    href='/jobs/saved'
                    icon={<Bookmark className='h-4 w-4' />}
                >
                    Saved
                </NavigationLink>
            </li>
            <li>
                <NavigationLink
                    href='/jobs/my-job-applications'
                    icon={<File className='h-4 w-4' />}
                >
                    Applications
                </NavigationLink>
            </li>
        </ul>
    );
};

export default JobSeekerNavigation;
