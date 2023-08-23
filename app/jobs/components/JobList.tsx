'use client';

import Loading from '@/components/Loading';
import RecruitmentLists from '@/components/RecruitmentLists';
import { useFetchJobPosts } from '@/hooks/useJobPosts';

const JobList = () => {
    const { data: jobPosts, isLoading } = useFetchJobPosts();

    if (isLoading) return <Loading />;

    return <RecruitmentLists jobPosts={jobPosts} />;
};

export default JobList;
