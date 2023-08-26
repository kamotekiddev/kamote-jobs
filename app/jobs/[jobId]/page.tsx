import getJobPostById from '@/actions/getJobPostById';
import JobInfo from './components/JobInfo';
import AboutJob from './components/AboutJob';
import ApplyToJobModal from './components/ApplyToJobModal';

type Props = {
    params: {
        jobId: string;
    };
};
const JobId = async ({ params: { jobId } }: Props) => {
    const { jobPost } = await getJobPostById(jobId);

    return (
        <>
            <section className='space-y-4 overflow-auto scrollbar-hide'>
                <JobInfo jobPost={jobPost!} />
                <AboutJob />
            </section>
            <ApplyToJobModal />
        </>
    );
};

export default JobId;
