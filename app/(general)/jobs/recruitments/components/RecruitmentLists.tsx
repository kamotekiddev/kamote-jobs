import { FullJobPosts } from '@/types/jobPost';
import RecruitmentListItem from './RecruitmentListItem';

type Props = {
    jobPosts?: FullJobPosts[];
};

const RecruitmentLists = ({ jobPosts = [] }: Props) => {
    return (
        <section>
            {jobPosts.map((jobPost) => (
                <RecruitmentListItem key={jobPost.id} jobPost={jobPost} />
            ))}
        </section>
    );
};

export default RecruitmentLists;
