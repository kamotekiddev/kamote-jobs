import { Bookmark, File } from 'lucide-react';
import NavigationLink from './NavigationLink';

const RecruitersNavigation = () => {
    return (
        <ul className='flex gap-2'>
            <li>
                <NavigationLink
                    href='/jobs/owned'
                    toolTip='My Job Posts'
                    icon={<File className='h-4 w-4' />}
                >
                    My Posts
                </NavigationLink>
            </li>
        </ul>
    );
};

export default RecruitersNavigation;
