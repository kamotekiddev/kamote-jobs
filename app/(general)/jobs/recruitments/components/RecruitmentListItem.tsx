import { FullJobPosts } from '@/types/jobPost';

type Props = {
    jobPost: FullJobPosts;
};
const RecruitmentListItem = ({ jobPost }: Props) => {
    return <pre>{JSON.stringify(jobPost, null, 2)}</pre>;
};

export default RecruitmentListItem;
