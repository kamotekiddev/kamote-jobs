import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import getUserInitials from '@/lib/getUserInitials';
import { FullJobApplication } from '@/types/job-application';
import { Check, Link, Mail, Phone, XIcon } from 'lucide-react';

type Props = {
    jobApplication?: FullJobApplication;
};
const JobApplicationListItem = ({ jobApplication }: Props) => {
    const user = jobApplication?.user;
    const userInitials = getUserInitials(user?.name!);

    return (
        <article className='flex gap-6 rounded-lg border p-4 shadow-sm'>
            <Avatar>
                <AvatarImage src={user?.image!} />
                <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <h1 className='mb-4 font-bold'>{user?.name}</h1>
                <p className='mb-4 line-clamp-2 text-sm text-slate-500'>
                    {jobApplication?.caption}
                </p>
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <p className='flex items-center gap-4 text-sm'>
                            <Mail className='h-4 w-4' /> {jobApplication?.email}
                        </p>
                        <p className='flex items-center gap-4 text-sm'>
                            <Phone className='h-4 w-4' />
                            {jobApplication?.contactNo}
                        </p>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <Button variant='outline' className='flex gap-2'>
                            <Link className='h-4 w-4' />
                            View Resume
                        </Button>
                        <div className='space-x-2'>
                            <Button variant='outline' size='icon'>
                                <Check />
                            </Button>
                            <Button variant='outline' size='icon'>
                                <XIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default JobApplicationListItem;
