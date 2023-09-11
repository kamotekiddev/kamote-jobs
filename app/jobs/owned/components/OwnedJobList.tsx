'use client';

import { JobPostListItem } from '@/types/jobPost';
import { useFetchOwnedJobPosts } from '@/hooks/useJobPosts';
import RecruitmentLists from '@/components/RecruitmentLists';
import Loading from '@/components/Loading';
import useHiringStatus from '@/hooks/useHiringStatus';

type Props = { initialJobList?: JobPostListItem[] };

const OwnedJobList = ({ initialJobList }: Props) => {
    const { hiringStatus } = useHiringStatus();

    const { data: ownedJobPosts, isLoading } = useFetchOwnedJobPosts({
        initialData: initialJobList!,
        hiringStatus,
    });

    if (isLoading) return <Loading />;

    return (
        <RecruitmentLists jobListItems={ownedJobPosts} withSaveButton={false} />
    );
};

export default OwnedJobList;
