'use client';

import { useFetchSavedJobPosts } from '@/hooks/useJobPosts';
import Loading from '@/components/Loading';
import RecruitmentLists from '@/components/RecruitmentLists';

const SavedJobList = () => {
    const { data: saveJobs, isLoading } = useFetchSavedJobPosts();

    if (isLoading) return <Loading />;

    return <RecruitmentLists jobPosts={saveJobs} />;
};

export default SavedJobList;
