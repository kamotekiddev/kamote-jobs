'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFetchMyJobApplications } from '@/hooks/useJobApplication';
import JobApplicationListItem from './JobApplicationListItem';
import Loading from '@/components/Loading';
import EmptyState from '@/components/EmptyState';
import { FullJobApplication } from '@/types/job-application';

const applicationStatuses = [
    'all',
    'applied',
    'interview',
    'rejected',
    'hired',
];

type Props = {
    initialJobApplications?: FullJobApplication[];
};

const JobApplicationList = ({ initialJobApplications }: Props) => {
    const [applicationStatus, setApplicationStatus] = useState('all');

    const { data: myJobApplications, isLoading } = useFetchMyJobApplications({
        status: applicationStatus,
        initialData: initialJobApplications!,
    });

    return (
        <section className='space-y-4'>
            <header className='sticky top-[72px] flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm'>
                <h1 className='text-xl font-black'>My Job Applications</h1>
                <div className='bg-slate-100'>
                    {applicationStatuses.map((status) => (
                        <Button
                            key={status}
                            size='sm'
                            onClick={() => setApplicationStatus(status)}
                            variant={
                                status == applicationStatus
                                    ? 'default'
                                    : 'outline'
                            }
                            className='capitalize'
                        >
                            {status}
                        </Button>
                    ))}
                </div>
            </header>
            {isLoading && <Loading />}
            {myJobApplications?.length === 0 && <EmptyState />}
            {myJobApplications?.map((jobApplication) => (
                <JobApplicationListItem
                    key={jobApplication.id}
                    jobApplication={jobApplication}
                />
            ))}
        </section>
    );
};

export default JobApplicationList;
