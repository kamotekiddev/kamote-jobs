import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FullJobPosts } from '@/types/jobPost';
import RecruitmentListItem from './RecruitmentListItem';
import EmptyState from '@/components/EmptyState';
import { useSaveUnsavePost } from '@/hooks/useJobPosts';

type Props = {
    jobPosts?: FullJobPosts[];
};

const RecruitmentLists = ({ jobPosts = [] }: Props) => {
    const { mutateAsync: saveUnsavePost } = useSaveUnsavePost();
    const [initialPosts, setInitialPosts] = useState<FullJobPosts[]>(jobPosts);
    const { data: session } = useSession();

    const handleSaveUnsave = async (
        action: 'save' | 'unsave',
        jobPost: FullJobPosts
    ) => {
        try {
            const appendedUserId = [
                ...jobPost.savedByUserIds,
                session?.user.id,
            ];
            const removedUserId = jobPost.savedByUserIds.filter(
                (userId) => userId !== session?.user.id
            );
            setInitialPosts((prevPosts) =>
                prevPosts.map((prevPost) =>
                    prevPost.id === jobPost.id
                        ? {
                              ...prevPost,
                              savedByUserIds:
                                  action === 'save'
                                      ? appendedUserId
                                      : removedUserId,
                          }
                        : prevPost
                )
            );
            await saveUnsavePost({
                action,
                postId: jobPost.id,
            });
        } catch (error) {
            setInitialPosts(jobPosts);
        }
    };

    if (!jobPosts.length)
        return <EmptyState title='No Job Recruitments Found.' />;

    return (
        <section className='h-max rounded-lg border bg-white p-4 shadow-sm'>
            {initialPosts.map((jobPost, i) => (
                <RecruitmentListItem
                    withSeparator={jobPosts.length - 1 !== i}
                    key={jobPost.id}
                    jobPost={jobPost}
                    isSaved={jobPost.savedByUserIds.includes(session?.user.id)}
                    onSaveUnsave={handleSaveUnsave}
                />
            ))}
        </section>
    );
};

export default RecruitmentLists;
