'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

import Loading from '@/components/Loading';
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

    const { data: jobListItems, isLoading } = useFetchJobPosts({
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
            {isLoading ? (
                <Loading />
            ) : (
                <RecruitmentLists jobListItems={jobListItems} />
            )}
        </section>
    );
};

export default JobList;
