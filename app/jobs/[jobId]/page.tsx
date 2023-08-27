import getJobPostById from '@/actions/getJobPostById';
import JobInfo from './components/JobInfo';
import AboutJob from './components/AboutJob';
import EmptyState from '@/components/EmptyState';

type Props = {
    params: {
        jobId: string;
    };
};
const JobId = async ({ params: { jobId } }: Props) => {
    const { jobPost } = await getJobPostById(jobId);

    if (!jobPost) return <EmptyState title='No JobPost Found.' />;

    return (
        <section className='space-y-4 overflow-auto scrollbar-hide'>
            <JobInfo initialJobPost={jobPost!} />
            <AboutJob />
        </section>
    );
};

export default JobId;
