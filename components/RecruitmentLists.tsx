import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FullJobPosts } from '@/types/jobPost';

import { useSaveUnsavePost } from '@/hooks/useJobPosts';
import RecruitmentListItem from './RecruitmentListItem';
import EmptyState from '@/components/EmptyState';

type Props = {
    jobPosts?: FullJobPosts[];
};

const RecruitmentLists = ({ jobPosts = [] }: Props) => {
    const { mutateAsync: saveUnsavePost } = useSaveUnsavePost();
    const { data: session } = useSession();

    const handleSaveUnsave = (
        action: 'save' | 'unsave',
        jobPost: FullJobPosts
    ) => {
        // const appendedUserId = [
        //     ...jobPost.savedByUserIds,
        //     session?.user.id,
        // ];
        // const removedUserId = jobPost.savedByUserIds.filter(
        //     (userId) => userId !== session?.user.id
        // );
        // setInitialPosts((prevPosts) =>
        //     prevPosts.map((prevPost) =>
        //         prevPost.id === jobPost.id
        //             ? {
        //                   ...prevPost,
        //                   savedByUserIds:
        //                       action === 'save'
        //                           ? appendedUserId
        //                           : removedUserId,
        //               }
        //             : prevPost
        //     )
        // );
        saveUnsavePost({
            action,
            postId: jobPost.id,
            userId: session?.user.id,
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
                />
            ))}
        </section>
    );
};

export default RecruitmentLists;
