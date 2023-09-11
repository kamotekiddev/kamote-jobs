'use client';

import FilterSelector from '@/components/FilterSelector';
import useHiringStatus from '@/hooks/useHiringStatus';

const data = [
    { label: 'All', value: 'all' },
    { label: 'Hiring', value: 'hiring' },
    { label: 'Not Hiring', value: 'not-hiring' },
];

const HiringStatusFilter = () => {
    const { hiringStatus, setHiringStatus } = useHiringStatus();

    return (
        <FilterSelector
            placeholder='Select Status'
            data={data}
            value={hiringStatus}
            onChange={setHiringStatus}
        />
    );
};

export default HiringStatusFilter;
