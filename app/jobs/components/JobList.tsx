'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

import Loading from '@/components/Loading';
import RecruitmentLists from '@/components/RecruitmentLists';
import { useFetchJobPosts } from '@/hooks/useJobPosts';
import useDebounce from '@/hooks/useDebounce';

const JobList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 100);

    const { data: jobPosts, isLoading } =
        useFetchJobPosts(debouncedSearchQuery);

    return (
        <section>
            <header className='sticky top-0 z-50 mb-4 rounded-lg border bg-white p-4 shadow-sm'>
                <Input
                    placeholder='Search Jobs...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </header>
            {isLoading ? <Loading /> : <RecruitmentLists jobPosts={jobPosts} />}
        </section>
    );
};

export default JobList;
