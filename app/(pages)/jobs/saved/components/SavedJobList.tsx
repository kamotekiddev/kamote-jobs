'use client';

import { useFetchSavedJobPosts } from '@/hooks/useJobPosts';
import RecruitmentLists from '@/components/RecruitmentLists';
import { JobPostListItem } from '@/types/jobPost';
import useHiringStatus from '@/hooks/useHiringStatus';
import Loading from '@/components/Loading';

type Props = {
    initialJobList?: JobPostListItem[];
};

const SavedJobList = ({ initialJobList = [] }: Props) => {
    const { hiringStatus } = useHiringStatus();

    const { data: savedJobListItems, isLoading } = useFetchSavedJobPosts({
        initialData: initialJobList!,
        hiringStatus: hiringStatus,
    });

    if (isLoading) return <Loading />;

    return <RecruitmentLists jobListItems={savedJobListItems} />;
};

export default SavedJobList;
