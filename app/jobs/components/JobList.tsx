'use client';

import RecruitmentLists from '@/components/RecruitmentLists';
import useFetchJobPosts from '@/hooks/useFetchJobPosts';

const JobList = () => {
    const { data: jobPosts } = useFetchJobPosts();

    return (
        <>
            <RecruitmentLists jobPosts={jobPosts} />
        </>
    );
};

export default JobList;
