import { FullJobPosts } from '@/types/jobPost';
import RecruitmentListItem from './RecruitmentListItem';
import EmptyState from '@/components/EmptyState';

type Props = {
    jobPosts?: FullJobPosts[];
};

const RecruitmentLists = ({ jobPosts = [] }: Props) => {
    if (!jobPosts.length)
        return <EmptyState title='No Job Recruitments Found.' />;

    return (
        <section className='h-max rounded-lg border bg-white p-4 shadow-sm'>
            {jobPosts.map((jobPost, i) => (
                <RecruitmentListItem
                    withSeparator={jobPosts.length - 1 !== i}
                    key={jobPost.id}
                    jobPost={jobPost}
                />
            ))}
        </section>
    );
};

export default RecruitmentLists;
