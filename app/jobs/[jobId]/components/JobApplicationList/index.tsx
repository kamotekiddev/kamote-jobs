'use client';
import { useSession } from 'next-auth/react';
import JobApplicationListItem from './JobApplication';
import { FullJobPost } from '@/types/jobPost';

type Props = { jobPost?: FullJobPost };
const JobApplicationList = ({ jobPost }: Props) => {
    const { data: session } = useSession();

    const isMyPost = jobPost?.userId === session?.user.id;

    if (!isMyPost) null;

    return (
        <section className='rounded-lg border bg-white p-4 shadow-sm'>
            <h1 className='mb-4 text-xl font-bold'>
                Job Applications ({jobPost?.applications?.length || 0})
            </h1>
            <div className='space-y-2'>
                {jobPost?.applications?.map((jobApplication) => (
                    <JobApplicationListItem
                        key={jobApplication.id}
                        jobApplication={jobApplication}
                    />
                ))}
            </div>
        </section>
    );
};

export default JobApplicationList;
