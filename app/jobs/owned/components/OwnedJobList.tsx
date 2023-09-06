'use client';

import { useFetchOwnedJobPosts } from '@/hooks/useJobPosts';
import RecruitmentLists from '@/components/RecruitmentLists';
import Loading from '@/components/Loading';
import { JobPostListItem } from '@/types/jobPost';

type Props = { initialJobList?: JobPostListItem[] };

const OwnedJobList = ({ initialJobList }: Props) => {
    const { data: ownedJobPosts, isLoading } = useFetchOwnedJobPosts(
        initialJobList!
    );

    if (isLoading) return <Loading />;

    return (
        <RecruitmentLists jobListItems={ownedJobPosts} withSaveButton={false} />
    );
};

export default OwnedJobList;
