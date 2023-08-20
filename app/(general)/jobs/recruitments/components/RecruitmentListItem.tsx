import { Badge } from '@/components/ui/badge';
import { FullJobPosts } from '@/types/jobPost';
import Image from 'next/image';

type Props = {
    jobPost: FullJobPosts;
};
const RecruitmentListItem = ({ jobPost }: Props) => {
    return (
        <article>
            <Image src={jobPost.image!} alt='User Jobpost' />
            <h1>{jobPost.title}</h1>
            <p>{jobPost.caption}</p>
            <section>
                {jobPost.roles.map((r) => (
                    <Badge key={r.id}>{r.role}</Badge>
                ))}
            </section>
        </article>
    );
};

export default RecruitmentListItem;
