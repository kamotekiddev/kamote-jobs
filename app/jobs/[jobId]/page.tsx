import getJobListById from '@/actions/getJobListById';
import EmptyState from '@/components/EmptyState';
import JobPost from './components/JobPost';

type Props = {
    params: {
        jobId: string;
    };
};
const JobId = async ({ params: { jobId } }: Props) => {
    const { jobPost } = await getJobListById(jobId);

    if (!jobPost) return <EmptyState title='No JobPost Found.' />;

    return (
        <section className='space-y-4 overflow-auto scrollbar-hide'>
            <JobPost initialJobPost={jobPost} />
        </section>
    );
};

export default JobId;
