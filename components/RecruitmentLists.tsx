import { useSession } from 'next-auth/react';
import { FullJobPost } from '@/types/jobPost';

import { useSaveUnsavePost } from '@/hooks/useJobPosts';
import RecruitmentListItem from './RecruitmentListItem';
import EmptyState from '@/components/EmptyState';

type Props = {
    jobPosts?: FullJobPost[];
    withSaveButton?: boolean;
};

const RecruitmentLists = ({ jobPosts = [], withSaveButton }: Props) => {
    const { mutateAsync: saveUnsavePost } = useSaveUnsavePost();
    const { data: session } = useSession();

    const handleSaveUnsave = (
        action: 'save' | 'unsave',
        jobPost: FullJobPost
    ) => {
        saveUnsavePost({
            action,
            postId: jobPost.id,
        });
    };

    if (!jobPosts.length)
        return <EmptyState title='No Job Recruitments Found.' />;

    return (
        <section className='h-max rounded-lg border bg-white p-4 shadow-sm'>
            {jobPosts.map((jobPost, i) => (
                <RecruitmentListItem
                    key={jobPost.id}
                    withSeparator={jobPosts.length - 1 !== i}
                    jobPost={jobPost}
                    isSaved={jobPost.savedByUserIds.includes(session?.user.id)}
                    onSaveUnsave={handleSaveUnsave}
                    withSaveButton={withSaveButton}
                />
            ))}
        </section>
    );
};

export default RecruitmentLists;
