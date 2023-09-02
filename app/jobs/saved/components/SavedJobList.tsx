'use client';

import { useFetchSavedJobPosts } from '@/hooks/useJobPosts';
import Loading from '@/components/Loading';
import RecruitmentLists from '@/components/RecruitmentLists';

const SavedJobList = () => {
    const { data: savedJobListItems, isLoading } = useFetchSavedJobPosts();

    if (isLoading) return <Loading />;

    return <RecruitmentLists jobListItems={savedJobListItems} />;
};

export default SavedJobList;
