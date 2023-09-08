import { Bookmark, File } from 'lucide-react';
import NavigationLink from './NavigationLink';

const RecruitersNavigation = () => {
    return (
        <ul className='flex gap-2'>
            <li>
                <NavigationLink
                    href='/jobs/owned'
                    icon={<File className='h-4 w-4' />}
                >
                    My Jobs
                </NavigationLink>
            </li>
        </ul>
    );
};

export default RecruitersNavigation;
