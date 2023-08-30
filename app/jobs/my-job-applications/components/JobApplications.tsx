'use client';

import { useFetchMyJobApplications } from '@/hooks/useJobApplication';
import JobApplicationListItem from './JobApplicationListItem';

const JobApplicationList = () => {
    const { data: myJobApplications } = useFetchMyJobApplications();

    return (
        <section className='space-y-4'>
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
