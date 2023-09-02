'use client';

import { useFetchOwnedJobPosts } from '@/hooks/useJobPosts';
import RecruitmentLists from '@/components/RecruitmentLists';
import Loading from '@/components/Loading';

const OwnedJobList = () => {
    const { data: ownedJobPosts, isLoading } = useFetchOwnedJobPosts();
    if (isLoading) return <Loading />;
    return (
        <RecruitmentLists jobListItems={ownedJobPosts} withSaveButton={false} />
    );
};

export default OwnedJobList;
