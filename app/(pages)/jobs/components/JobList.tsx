'use client';

import RecruitmentLists from '@/components/RecruitmentLists';
import { useFetchJobPosts } from '@/hooks/useJobPosts';
import { JobPostListItem } from '@/types/jobPost';
import Loading from '@/components/Loading';
import useSearchTextStore from '@/hooks/useSearchText';
import useDebounce from '@/hooks/useDebounce';

type Props = {
    initialJobListItems?: JobPostListItem[];
};

const JobList = ({ initialJobListItems = [] }: Props) => {
    const { searchQuery } = useSearchTextStore();
    const debouncedSearchText = useDebounce(searchQuery, 200);

    const { data: jobListItems, isLoading } = useFetchJobPosts({
        initialData: initialJobListItems!,
        searchQuery: debouncedSearchText,
    });

    return (
        <section>
            {isLoading ? (
                <Loading />
            ) : (
                <RecruitmentLists jobListItems={jobListItems} />
            )}
        </section>
    );
};

export default JobList;
