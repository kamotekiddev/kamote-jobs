import { FullJobPosts } from '@/types/jobPost';

type Props = {
    jobPost: FullJobPosts;
};
const RecruitmentListItem = ({ jobPost }: Props) => {
    return (
        <article>
            <h1>{jobPost.heading}</h1>
            <p>{jobPost.jobTitle.name}</p>
            <p>{jobPost.companyName}</p>
            <p>{jobPost.employmentType.name}</p>
            <p>{jobPost.workplaceType.name}</p>
            <p>{jobPost.location}</p>
            <p>{new Date(jobPost.createdAt).toString()}</p>
        </article>
    );
};

export default RecruitmentListItem;
