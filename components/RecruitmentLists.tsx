import { useSession } from 'next-auth/react';

import { useSaveUnsavePost } from '@/hooks/useJobPosts';
import RecruitmentListItem from './RecruitmentListItem';
import EmptyState from '@/components/EmptyState';
import { JobPostListItem } from '@/types/jobPost';

type Props = {
    jobListItems?: JobPostListItem[];
    withSaveButton?: boolean;
};

const RecruitmentLists = ({ jobListItems = [], withSaveButton }: Props) => {
    const { mutateAsync: saveUnsavePost } = useSaveUnsavePost();
    const { data: session } = useSession();

    const handleSaveUnsave = (
        action: 'save' | 'unsave',
        jobPost: JobPostListItem
    ) => {
        saveUnsavePost({
            action,
            postId: jobPost.id,
        });
    };

    if (!jobListItems.length)
        return <EmptyState title='No Job Recruitments Found.' />;

    return (
        <section className='h-max rounded-lg border bg-white p-4 shadow-sm'>
            {jobListItems.map((jobListItem, i) => (
                <RecruitmentListItem
                    key={jobListItem.id}
                    withSeparator={jobListItems.length - 1 !== i}
                    jobPost={jobListItem}
                    isSaved={jobListItem.savedByUserIds.includes(
                        session?.user.id
                    )}
                    onSaveUnsave={handleSaveUnsave}
                    withSaveButton={withSaveButton}
                />
            ))}
        </section>
    );
};

export default RecruitmentLists;
