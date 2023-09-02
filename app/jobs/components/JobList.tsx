'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

import RecruitmentLists from '@/components/RecruitmentLists';
import { useFetchJobPosts } from '@/hooks/useJobPosts';
import useDebounce from '@/hooks/useDebounce';
import { JobPostListItem } from '@/types/jobPost';

type Props = {
    initialJobListItems?: JobPostListItem[];
};

const JobList = ({ initialJobListItems }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 100);

    const { data: jobListItems } = useFetchJobPosts({
        searchQuery: debouncedSearchQuery,
        initialData: initialJobListItems!,
    });

    return (
        <section>
            <header className='sticky top-0 z-50 mb-4 rounded-lg border bg-white p-4 shadow-sm'>
                <Input
                    placeholder='Search Jobs...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </header>
            <RecruitmentLists jobListItems={jobListItems} />
        </section>
    );
};

export default JobList;
