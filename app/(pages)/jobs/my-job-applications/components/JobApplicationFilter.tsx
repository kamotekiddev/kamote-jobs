'use client';

import FilterSelector from '@/components/FilterSelector';
import useApplicationStatus from '@/hooks/useApplicationStatus';

const jobApplicationStatuses = [
    { label: 'All', value: 'all' },
    { label: 'Applied', value: 'applied' },
    { label: 'Interview', value: 'interview' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Hired', value: 'hired' },
];

const JobApplicationFilter = () => {
    const { applicationStatus, setApplicationStatus } = useApplicationStatus();

    return (
        <FilterSelector
            value={applicationStatus}
            onChange={setApplicationStatus}
            data={jobApplicationStatuses}
        />
    );
};

export default JobApplicationFilter;
