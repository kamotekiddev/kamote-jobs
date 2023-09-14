'use client';

import { FullJobApplication } from '@/types/job-application';
import { useFetchMyJobApplications } from '@/hooks/useJobApplication';
import JobApplicationListItem from './JobApplicationListItem';
import Loading from '@/components/Loading';
import EmptyState from '@/components/EmptyState';
import useApplicationStatus from '@/hooks/useApplicationStatus';

type Props = {
    initialJobApplications?: FullJobApplication[];
};

const JobApplicationList = ({ initialJobApplications = [] }: Props) => {
    const { applicationStatus } = useApplicationStatus();

    const { data: myJobApplications, isLoading } = useFetchMyJobApplications({
        status: applicationStatus,
        initialData: initialJobApplications!,
    });

    return (
        <>
            {isLoading && <Loading />}
            {myJobApplications?.length === 0 && <EmptyState />}
            {myJobApplications?.map((jobApplication) => (
                <JobApplicationListItem
                    key={jobApplication.id}
                    jobApplication={jobApplication}
                />
            ))}
        </>
    );
};

export default JobApplicationList;
