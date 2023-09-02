'use client';

import { useFetchSavedJobPosts } from '@/hooks/useJobPosts';
import RecruitmentLists from '@/components/RecruitmentLists';
import { JobPostListItem } from '@/types/jobPost';

type Props = {
    initialJobList?: JobPostListItem[];
};

const SavedJobList = ({ initialJobList }: Props) => {
    const { data: savedJobListItems } = useFetchSavedJobPosts(initialJobList!);

    return <RecruitmentLists jobListItems={savedJobListItems} />;
};

export default SavedJobList;
