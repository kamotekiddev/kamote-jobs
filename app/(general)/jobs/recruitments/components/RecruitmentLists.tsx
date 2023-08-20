import { FullJobPosts } from '@/types/jobPost';
import RecruitmentListItem from './RecruitmentListItem';

type Props = {
    jobPosts?: FullJobPosts[];
};

const RecruitmentLists = ({ jobPosts = [] }: Props) => {
    return (
        <section className='rounded-lg border bg-white p-4 shadow-sm'>
            {jobPosts.map((jobPost) => (
                <RecruitmentListItem key={jobPost.id} jobPost={jobPost} />
            ))}
        </section>
    );
};

export default RecruitmentLists;
