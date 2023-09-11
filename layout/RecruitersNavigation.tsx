import { File, LineChart } from 'lucide-react';
import NavigationLink from './NavigationLink';

const RecruitersNavigation = () => {
    return (
        <ul className='flex gap-2'>
            <li>
                <NavigationLink
                    href='/analytics'
                    toolTip='Analytics'
                    icon={<LineChart className='h-4 w-4' />}
                >
                    Analytics
                </NavigationLink>
            </li>
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
